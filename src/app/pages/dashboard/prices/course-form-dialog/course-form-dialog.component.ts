import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
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
import {
  CoursePartsFragment,
  CreateOneCourseGQL,
  UpdateOneCourseGQL,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { map } from 'rxjs';

@Component({
  selector: 'app-course-form-dialog',
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
    ReactiveFormsModule,
  ],
  templateUrl: './course-form-dialog.component.html',
  styles: ``,
})
export class CourseFormDialogComponent implements OnInit {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: CoursePartsFragment | null = inject(MAT_DIALOG_DATA);

  public formGroup = this.formTools.builder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
    ],
  });

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneCourse = inject(CreateOneCourseGQL);
  private readonly _updateOneCourse = inject(UpdateOneCourseGQL);

  private readonly _dialogRef = inject(MatDialogRef<CourseFormDialogComponent>);

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.patchValue({
        name: this.data.name,
      });
    }
  }

  public async submit(): Promise<void> {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue() as any;

      if (!!this.data?.id) {
        this._update(values).subscribe({
          next: (branch) => {
            this._dialogRef.close(branch);
          },
          error: (err) => {
            console.error('UPDATE BRANCH ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      } else if (this._globalStateService.branch!.id) {
        this._save(values).subscribe({
          next: (branch) => {
            this._dialogRef.close(branch);
          },
          error: (err) => {
            console.error('CREATE COURSE ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  private _update(values: FormValues) {
    return this._updateOneCourse
      .mutate({
        id: this.data!.id,
        update: { ...values } as any,
      })
      .pipe(map((value) => value.data?.updateOneCourse));
  }

  private _save(values: FormValues) {
    return this._createOneCourse
      .mutate({
        course: {
          ...values,
          branchId: this._globalStateService.branch!.id,
        },
      })
      .pipe(map((value) => value.data?.createOneCourse));
  }
}

type FormValues = {
  name: string;
};
