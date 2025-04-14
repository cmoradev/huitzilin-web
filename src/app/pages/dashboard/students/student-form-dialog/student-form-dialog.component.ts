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
import { Observable } from '@apollo/client/utilities';
import { ImagePickerComponent } from '@components/image-picker/image-picker.component';
import {
  AddBranchsToStudentGQL,
  AddLevelsToStudentGQL,
  CreateOneStudentGQL,
  FetchStudentGQL,
  GetLevelsPageGQL,
  LevelPartsFragment,
  RemoveLevelsFromStudentGQL,
  StudentPartsFragment,
  UpdateOneStudentGQL,
} from '@graphql';
import {
  FormToolsService,
  GlobalStateService,
  StorageService,
} from '@services';
import { debounceTime, filter, map, of, startWith, switchMap, tap } from 'rxjs';

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
  public data: StudentParts | null = inject(MAT_DIALOG_DATA);
  public readonly _storage = inject(StorageService);

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneStudent = inject(CreateOneStudentGQL);
  private readonly _addBranchsToStudent = inject(AddBranchsToStudentGQL);
  private readonly _addLevelsToStudent = inject(AddLevelsToStudentGQL);
  private readonly _removeLevelsFromStudent = inject(
    RemoveLevelsFromStudentGQL
  );
  private readonly _fetchStudentPage = inject(FetchStudentGQL);

  private readonly _updateOneStudent = inject(UpdateOneStudentGQL);

  public levels = signal<LevelPartsFragment[]>([]);
  public loadingLevels = signal<boolean>(false);
  private readonly _levelsPageGQL = inject(GetLevelsPageGQL);

  private previusLevelId: string | null = null;

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
    level: ['' as any],
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
        this.formGroup.get('level')?.setValidators([Validators.required]);

        this.formGroup.get('code')?.updateValueAndValidity();
        this.formGroup.get('firstname')?.updateValueAndValidity();
        this.formGroup.get('lastname')?.updateValueAndValidity();
        this.formGroup.get('dateBirth')?.updateValueAndValidity();
        this.formGroup.get('dni')?.updateValueAndValidity();
        this.formGroup.get('level')?.updateValueAndValidity();
      });

    this.formGroup
      .get('level')
      ?.valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        filter((value) => typeof value === 'string')
      )
      .subscribe({
        next: (value) => {
          this._fetchLevel(value);
        },
      });

    if (!!this.data?.id) {
      this.formGroup.get('picture')?.clearValidators();
      this.formGroup.patchValue({
        picture: this.data.picture,
        firstname: this.data.firstname,
        lastname: this.data.lastname,
        dateBirth: this.data.dateBirth,
        dni: this.data.dni,
        level: this.data?.level || '',
      });
      this.previusLevelId = this.data.level?.id || null;
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

  public displayFn(value: LevelPartsFragment): string {
    return value?.name ?? '';
  }

  private _update(values: FormValues) {
    const uploadPicture$ =
      values.picture instanceof File
        ? this._storage
            .delete(this.previusPicture)
            .pipe(switchMap(() => this._storage.upload(values.picture)))
        : of(this.previusPicture);

    const removeAndAddLevel$ =
      this.previusLevelId !== values.level.id
        ? this._removeLevelsFromStudent
            .mutate({
              studentId: this.data!.id,
              levelId: this!.previusLevelId as string,
            })
            .pipe(
              switchMap(() => {
                console.log('removeAndAddLevel$');
                return this._addLevelsToStudent.mutate({
                  studentId: this.data!.id,
                  levelId: values.level.id,
                });
              }),
              map(() => null)
            )
        : of(null);

    return uploadPicture$.pipe(
      switchMap((picture) => removeAndAddLevel$.pipe(map(() => picture))),
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
        this._addLevelsToStudent
          .mutate({
            studentId: resp.data!.createOneStudent.id,
            levelId: values.level.id,
          })
          .pipe(map(() => resp))
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

  private _setLevelToStudent() {}

  private _addStudentInCurrentBranch(values: FormValues) {
    const branchId = this._globalStateService.branch!.id;

    return this._fetchStudentPage
      .fetch(
        {
          filter: {
            or: [{ code: { eq: values.code } }, { dni: { eq: values.code } }],
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
              switchMap(() =>
                this._addLevelsToStudent.mutate({
                  studentId: student!.id,
                  levelId: values.level.id,
                })
              ),
              map(() => student)
            );
        })
      );
  }

  private _fetchLevel(text: string): void {
    if (this._globalStateService.branch!.id) {
      this.loadingLevels.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._levelsPageGQL
        .watch(
          {
            limit: 100,
            offset: 0,
            filter: {
              branchId: { eq: this._globalStateService.branch!.id },
              or: [
                { name: { iLike: `%${text}%` } },
                { abbreviation: { iLike: `%${text}%` } },
              ],
            },
          },
          {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
          }
        )
        .valueChanges.subscribe({
          next: ({ loading, data }) => {
            this.loadingLevels.set(loading);

            this.levels.set(data?.levels.nodes ?? []);
          },
        });
    }
  }
}

type StudentParts = StudentPartsFragment & {
  level: LevelPartsFragment;
};

type FormValues = {
  picture: File;
  firstname: string;
  lastname: string;
  dateBirth: string;
  dni: string;
  withCode: boolean;
  code: string;
  level: LevelPartsFragment;
};
