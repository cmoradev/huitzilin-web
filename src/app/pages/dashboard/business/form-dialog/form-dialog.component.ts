import { Component, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ImagePickerComponent } from '@components/image-picker/image-picker.component';
import { CreateOneCompanyGQL } from '@graphql';
import { FormToolsService, StorageService } from '@services';
import { from, tap } from 'rxjs';

@Component({
  selector: 'app-form-dialog',
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
    ImagePickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './form-dialog.component.html',
  styles: ``,
})
export class FormDialogComponent {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public readonly _storage = inject(StorageService);

  private readonly _createOneCompany = inject(CreateOneCompanyGQL);
  private readonly _dialogRef = inject(MatDialogRef<FormDialogComponent>);

  public formGroup = this.formTools.builder.group({
    picture: [null, [Validators.required]],
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });

  public submit(): void {
    if (this.formGroup.valid) {
      this.loading.set(true);
      const values = this.formGroup.getRawValue() as any;

      this._storage.upload(values.picture).subscribe({
        next: (picture) => {
          this._createOneCompany.mutate({ company: { ...values, picture } }).subscribe({
            next: (value) => {
              this._dialogRef.close(value.data?.createOneCompany);
            },
            complete: () => {
              this.loading.set(false);
            },
          })
        }
      })
    }
  }
}
