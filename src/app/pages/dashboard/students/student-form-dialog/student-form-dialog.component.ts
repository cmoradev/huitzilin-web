import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ImagePickerComponent } from '@components/image-picker/image-picker.component';
import {
  AddBranchsToStudentGQL,
  CreateOneStudentGQL,
  GetStudentsPageGQL,
  StudentPartsFragment,
  UpdateOneStudentGQL,
} from '@graphql';
import {
  FormToolsService,
  GlobalStateService,
  StorageService,
} from '@services';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-student-form-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatFormField,
    MatInput,
    MatHint,
    MatError,
    MatLabel,
    MatCheckbox,
    ImagePickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './student-form-dialog.component.html',
  styles: ``,
})
export class StudentFormDialogComponent {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: StudentPartsFragment | null = inject(MAT_DIALOG_DATA);
  public readonly _storage = inject(StorageService);

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneStudent = inject(CreateOneStudentGQL);
  private readonly _addBranchsToStudent = inject(AddBranchsToStudentGQL);
  private readonly _getStudentsPage = inject(GetStudentsPageGQL);

  private readonly _updateOneStudent = inject(UpdateOneStudentGQL);

  private readonly _dialogRef = inject(
    MatDialogRef<StudentFormDialogComponent>
  );

  private previusPicture = '';

  public formGroup = this.formTools.builder.group({
    picture: [''],
    firstname: ['', [Validators.required, Validators.maxLength(32)]],
    lastname: ['', [Validators.required, Validators.maxLength(32)]],
    withCode: [false, []],
    code: ['', [], []],
  });

  constructor() {
    this.formGroup.get('withCode')?.valueChanges.subscribe((withCode) => {
      if (withCode) {
        this.formGroup
          .get('code')
          ?.setValidators([Validators.required, Validators.maxLength(8)]);
        this.formGroup
          .get('code')
          ?.setAsyncValidators([this.formTools.isStudentCodeValid]);
        this.formGroup.get('firstname')?.clearValidators();
        this.formGroup.get('lastname')?.clearValidators();
      } else {
        this.formGroup.get('code')?.clearValidators();
        this.formGroup.get('code')?.clearAsyncValidators();
        this.formGroup
          .get('firstname')
          ?.setValidators([Validators.required, Validators.maxLength(32)]);
        this.formGroup
          .get('lastname')
          ?.setValidators([Validators.required, Validators.maxLength(32)]);
      }
      this.formGroup.get('code')?.updateValueAndValidity();
      this.formGroup.get('firstname')?.updateValueAndValidity();
      this.formGroup.get('lastname')?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.get('picture')?.clearValidators();
      this.formGroup.patchValue({
        picture: this.data.picture,
        firstname: this.data.firstname,
        lastname: this.data.lastname,
      });
      this.previusPicture = this.data.picture;
      this.formGroup.get('picture')?.updateValueAndValidity();
    }
  }

  public async submit(): Promise<void> {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue() as any;

      if (!!this.data?.id) {
        this._update(values).subscribe({
          next: (student) => {
            this._dialogRef.close(student);
          },
          error: (err) => {
            console.error('UPDATE STUDENT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
      if (values.withCode) {
        this._addStudentInCurrentBranch(values).subscribe({
          next: (branch) => {
            this._dialogRef.close(branch);
          },
          error: (err) => {
            console.error('CREATE STUDENT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      } else {
        this._save(values).subscribe({
          next: (branch) => {
            this._dialogRef.close(branch);
          },
          error: (err) => {
            console.error('CREATE STUDENT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  private _update(values: FormValues) {
    if (values.picture instanceof File) {
      return this._storage.delete(this.previusPicture).pipe(
        switchMap(() => this._storage.upload(values.picture)),
        switchMap((picture) =>
          this._updateOneStudent.mutate({
            id: this.data!.id,
            update: { ...values, picture },
          })
        ),
        map((value) => value.data?.updateOneStudent)
      );
    }

    return this._updateOneStudent
      .mutate({
        id: this.data!.id,
        update: { ...values } as any,
      })
      .pipe(map((value) => value.data?.updateOneStudent));
  }

  private _save(values: FormValues) {
    const branchId = this._globalStateService.branch!.id;

    if (values.picture instanceof File) {
      return this._storage.upload(values.picture).pipe(
        switchMap((picture) =>
          this._createOneStudent.mutate({
            student: {
              firstname: values.firstname,
              lastname: values.lastname,
              picture,
            },
          })
        ),
        switchMap((resp) =>
          this._addBranchsToStudent
            .mutate({
              branchIds: [branchId],
              studentId: resp.data!.createOneStudent.id,
            })
            .pipe(map(() => resp))
        ),
        map((value) => value.data?.createOneStudent)
      );
    }

    return this._createOneStudent
      .mutate({
        student: {
          firstname: values.firstname,
          lastname: values.lastname,
          picture: 'images/image-default.png',
        },
      })
      .pipe(
        switchMap((resp) =>
          this._addBranchsToStudent
            .mutate({
              branchIds: [branchId],
              studentId: resp.data!.createOneStudent.id,
            })
            .pipe(map(() => resp))
        ),
        map((value) => value.data?.createOneStudent)
      );
  }

  private _addStudentInCurrentBranch(values: FormValues) {
    const branchId = this._globalStateService.branch!.id;

    return this._getStudentsPage
      .fetch(
        {
          filter: {
            code: { eq: values.code },
          },
        },
        {
          fetchPolicy: 'network-only',
        }
      )
      .pipe(
        switchMap((resp) => {
          const [student] = resp.data.students.nodes;

          return this._addBranchsToStudent
            .mutate({
              branchIds: [branchId],
              studentId: student!.id,
            })
            .pipe(map((resp) => resp.data?.addBranchsToStudent));
        })
      );
  }
}

type FormValues = {
  picture: File;
  firstname: string;
  lastname: string;
  withCode: boolean;
  code: string;
};
