import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ClassroomPartsFragment,
  CreateOneClassroomGQL,
  UpdateOneClassroomGQL,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { map } from 'rxjs';

@Component({
  selector: 'app-classroom-form-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatInputModule,
    MatFormFieldModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './classroom-form-dialog.component.html',
  styles: ``,
})
export class ClassroomFormDialogComponent {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: ClassroomPartsFragment | null = inject(MAT_DIALOG_DATA);

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneClassroom = inject(CreateOneClassroomGQL);
  private readonly _updateOneClassroom = inject(UpdateOneClassroomGQL);

  private readonly _dialogRef = inject(
    MatDialogRef<ClassroomFormDialogComponent>
  );

  public formGroup = this.formTools.builder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
    ],
    color: ['#9660b8', [Validators.required, Validators.maxLength(10)]],
  });

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.patchValue({
        name: this.data.name,
        color: this.data.color,
      });
    }
  }

  public async submit(): Promise<void> {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue() as any;

      if (!!this.data?.id) {
        this._update(values).subscribe({
          next: (classroom) => {
            this._dialogRef.close(classroom);
          },
          error: (err) => {
            console.error('UPDATE CLASSROOM ERROR: ', err);
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
            console.error('CREATE BRANCH ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  private _update(values: FormValues) {
    return this._updateOneClassroom
      .mutate({
        id: this.data!.id,
        update: {
          ...values,
        },
      })
      .pipe(map((value) => value.data?.updateOneClassroom));
  }

  private _save(values: FormValues) {
    return this._createOneClassroom
      .mutate({
        classroom: {
          ...values,
          branchId: this._globalStateService.branch!.id,
        },
      })
      .pipe(map((value) => value.data?.createOneClassroom));
  }
}

type FormValues = {
  color: string;
  name: string;
};
