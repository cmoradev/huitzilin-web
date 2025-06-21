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
import { MatSelectModule } from '@angular/material/select';
import {
  PackagePartsFragment,
  CreateOnePackageGQL,
  UpdateOnePackageGQL,
  PackageKind,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { packageKinds } from '@utils/contains';
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
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './activity-form-dialog.component.html',
  styles: ``,
})
export class ActivityFormDialogComponent implements OnInit {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: PackagePartsFragment | null = inject(MAT_DIALOG_DATA);

  public formGroup = this.formTools.builder.group({
    name: this.formTools.builder.control('', {
      validators: [Validators.required,Validators.minLength(3),Validators.maxLength(32)],
      nonNullable: true,
    }),
    quantity: this.formTools.builder.control(0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    kind: this.formTools.builder.control(PackageKind.Hours, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    withTax: this.formTools.builder.control(true, {
      validators: [],
      nonNullable: true,
    }),
  });

  public kinds = packageKinds;

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOnePackage = inject(CreateOnePackageGQL);
  private readonly _updateOnePackage = inject(UpdateOnePackageGQL);

  private readonly _dialogRef = inject(
    MatDialogRef<ActivityFormDialogComponent>
  );

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.patchValue({
        name: this.data.name,
        quantity: this.data.quantity,
        kind: this.data.kind,
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
            console.error('UPDATE PACKAGE ERROR: ', err);
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
            console.error('CREATE PACKAGE ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  private _update(values: FormValues) {
    return this._updateOnePackage
      .mutate({
        id: this.data!.id,
        update: { ...values } as any,
      })
      .pipe(map((value) => value.data?.updateOnePackage));
  }

  private _save(values: FormValues) {
    return this._createOnePackage
      .mutate({
        package: {
          ...values,
          branchId: this._globalStateService.branch!.id,
          order: 1,
        },
      })
      .pipe(map((value) => value.data?.createOnePackage));
  }
}

type FormValues = {
  name: string;
  kind: PackageKind;
  quantity: number;
  withTax: boolean;
};
