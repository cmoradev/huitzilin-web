import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImagePickerComponent } from '@components/image-picker/image-picker.component';
import {
  AddBranchsToStudentGQL,
  CreateOneStudentGQL,
  FetchStudentGQL,
  StudentPartsFragment,
  UpdateOneStudentGQL,
} from '@graphql';
import {
  FormToolsService,
  GlobalStateService,
  StorageService,
} from '@services';
import { filter, map, of, startWith, switchMap, catchError } from 'rxjs';

@Component({
  selector: 'app-student-form-dialog',
  imports: [
    MatDialogModule,
    MatButton,
    MatCheckbox,
    ImagePickerComponent,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
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
  private readonly _fetchStudentPage = inject(FetchStudentGQL);

  private readonly _updateOneStudent = inject(UpdateOneStudentGQL);

  private readonly _dialogRef = inject(
    MatDialogRef<StudentFormDialogComponent>
  );

  private previusPicture = '';

  public formGroup = this.formTools.builder.group({
    withCode: [false],
    picture: [''],
    firstname: [''],
    lastname: [''],
    code: [''],
    dni: [''],
    dateBirth: [''],
  });

  ngOnInit(): void {
    this.formGroup
      .get('withCode')
      ?.valueChanges.pipe(startWith(''))
      .subscribe((withCode) => {
        if (withCode) {
          this.formGroup.get('code')?.setValidators([Validators.required]);
          this.formGroup
            .get('code')
            ?.setAsyncValidators([this.formTools.isStudentCodeValid]);

          this.formGroup.get('dni')?.clearValidators();
          this.formGroup.get('dni')?.clearAsyncValidators();

          this.formGroup.get('firstname')?.clearValidators();
          this.formGroup.get('lastname')?.clearValidators();
          this.formGroup.get('dateBirth')?.clearValidators();
        } else {
          this.formGroup.get('code')?.clearValidators();
          this.formGroup.get('code')?.clearAsyncValidators();

          if (!this.data) {
            this.formGroup
              .get('dni')
              ?.setValidators([Validators.required, Validators.maxLength(32)]);
            this.formGroup
              .get('dni')
              ?.setAsyncValidators([this.formTools.isDniStudentValid]);
          }

          this.formGroup
            .get('firstname')
            ?.setValidators([Validators.required, Validators.maxLength(32)]);
          this.formGroup
            .get('lastname')
            ?.setValidators([Validators.required, Validators.maxLength(32)]);
          this.formGroup.get('dateBirth')?.setValidators([Validators.required]);
        }

        this.formGroup.get('code')?.updateValueAndValidity();
        this.formGroup.get('firstname')?.updateValueAndValidity();
        this.formGroup.get('lastname')?.updateValueAndValidity();
        this.formGroup.get('dateBirth')?.updateValueAndValidity();
        this.formGroup.get('dni')?.updateValueAndValidity();
      });

    if (!!this.data?.id) {
      this.formGroup.get('picture')?.clearValidators();
      this.formGroup.patchValue({
        picture: this.data.picture,
        firstname: this.data.firstname,
        lastname: this.data.lastname,
        dateBirth: this.data.dateBirth,
        dni: this.data.dni,
      });
      this.previusPicture = this.data.picture;
      this.formGroup.get('picture')?.updateValueAndValidity();

      this.formGroup
        .get('dni')
        ?.valueChanges.pipe(
          startWith(null),
          filter((value, index) => index === 1) // Only execute on the first change
        )
        .subscribe({
          next: () => {
            this.formGroup
              .get('dni')
              ?.setValidators([Validators.required, Validators.maxLength(32)]);
            this.formGroup
              .get('dni')
              ?.setAsyncValidators([this.formTools.isDniStudentValid]);

            this.formGroup.get('dni')?.updateValueAndValidity();
          },
        });
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
      } else if (values.withCode) {
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
    const uploadPicture$ =
      values.picture instanceof File
        ? this._storage
            .delete(this.previusPicture)
            .pipe(catchError(() => of(null)), switchMap(() => this._storage.upload(values.picture)))
        : of(this.previusPicture);

    return uploadPicture$.pipe(
      switchMap((picture) =>
        this._updateOneStudent.mutate({
          id: this.data!.id,
          update: {
            picture,
            firstname: values.firstname,
            lastname: values.lastname,
            dateBirth: values.dateBirth,
            dni: values.dni,
          } as any,
        })
      )
    );
  }

  private _save(values: FormValues) {
    const branchId = this._globalStateService.branch!.id;

    const uploadPicture$ =
      values.picture instanceof File
        ? this._storage.upload(values.picture)
        : of('images/image-default.png');

    return uploadPicture$.pipe(
      switchMap((picture) =>
        this._createOneStudent.mutate({
          student: {
            picture,
            firstname: values.firstname,
            lastname: values.lastname,
            dateBirth: values.dateBirth,
            dni: values.dni,
          },
        })
      ),
      switchMap((resp) =>
        this._addBranchsToStudent
          .mutate({
            branchIds: [branchId],
            studentId: resp.data!.createOneStudent.id,
          })
          .pipe(map(() => resp.data?.createOneStudent))
      )
    );
  }

  /**
   * @todo - Revisar el error de llaves duplicadas cuando el estudiante ya existe en sucursal actual.
   * @todo - Revisar con el  filtro branchs: { id: { neq: branchId } }.
   */
  private _addStudentInCurrentBranch(values: FormValues) {
    const branchId = this._globalStateService.branch!.id;

    return this._fetchStudentPage
      .fetch(
        {
          filter: {
            or: [
              { code: { eq: values.code } },
              { dni: { eq: values.code } },
            ],
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
            .pipe(
              map(() => student),
              catchError(() => of(student))
            );
        })
      );
  }
}

type FormValues = {
  picture: File;
  firstname: string;
  lastname: string;
  dateBirth: string;
  dni: string;
  withCode: boolean;
  code: string;
};
