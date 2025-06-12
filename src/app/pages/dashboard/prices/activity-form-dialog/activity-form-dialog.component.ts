import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ActivityPartsFragment,
  CreateOneActivityGQL,
  UpdateOneActivityGQL,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-activity-form-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormField,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './activity-form-dialog.component.html',
  styles: ``,
})
export class ActivityFormDialogComponent implements OnInit {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: ActivityPartsFragment | null = inject(MAT_DIALOG_DATA);

  public formGroup = this.formTools.builder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
    ],
    quantity: [0, [Validators.required]],
    isPackage: [false],
    withTax: [true]
  });

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneActivity = inject(CreateOneActivityGQL);
  private readonly _updateOneActivity = inject(UpdateOneActivityGQL);

  private readonly _dialogRef = inject(
    MatDialogRef<ActivityFormDialogComponent>
  );

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.patchValue({
        name: this.data.name,
        quantity: this.data.quantity,
        isPackage: this.data.isPackage,
        withTax: this.data.withTax,
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
            console.error('CREATE ACTIVITY ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  private _update(values: FormValues) {
    return this._updateOneActivity
      .mutate({
        id: this.data!.id,
        update: { ...values } as any,
      })
      .pipe(map((value) => value.data?.updateOneActivity));
  }

  private _save(values: FormValues) {
    return this._createOneActivity
      .mutate({
        activity: {
          ...values,
          branchId: this._globalStateService.branch!.id,
          order: 1,
        },
      })
      .pipe(map((value) => value.data?.createOneActivity));
  }
}

type FormValues = {
  name: string;
  quantity: number;
  isPackage: boolean;
  withTax: boolean;
};
