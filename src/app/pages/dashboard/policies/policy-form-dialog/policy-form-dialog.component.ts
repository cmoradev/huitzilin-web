import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CreateOnePolicyGQL,
  PolicyPartsFragment,
  UpdateOnePolicyGQL,
} from '@graphql';
import { FormToolsService } from '@services';

@Component({
  selector: 'app-policy-form-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './policy-form-dialog.component.html',
  styles: ``,
})
export class PolicyFormDialogComponent {
  public formTools = inject(FormToolsService);
  public loading = signal<boolean>(false);
  public data = inject<PolicyPartsFragment | null>(MAT_DIALOG_DATA);

  private readonly _dialogRef = inject(MatDialogRef<PolicyFormDialogComponent>);
  private readonly createOnePolicyGQL = inject(CreateOnePolicyGQL);
  private readonly updateOnePolicyGQL = inject(UpdateOnePolicyGQL);

  public formGroup = this.formTools.builder.group({
    name: this.formTools.builder.control<string>(this.data?.name ?? '', {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
    }),
  });

  public submit() {
    if (this.formGroup.valid) {
      this.loading.set(true);
      const values = this.formGroup.getRawValue();

      if (!!this.data?.id) {
        this.updateOnePolicyGQL
          .mutate({
            id: this.data?.id,
            update: {
              name: values.name,
            },
          })
          .subscribe({
            next: ({ data }) => {
              this.loading.set(false);
              this._dialogRef.close(data?.updateOnePolicy);
            },
            error: (error) => {
              this.loading.set(false);
              console.error('Error creating user:', error);
            },
          });
      } else {
        this.createOnePolicyGQL
          .mutate({
            policy: {
              name: values.name,
            },
          })
          .subscribe({
            next: ({ data }) => {
              this.loading.set(false);
              this._dialogRef.close(data?.createOnePolicy);
            },
            error: (error) => {
              this.loading.set(false);
              console.error('Error creating user:', error);
            },
          });
      }
    }
  }
}
