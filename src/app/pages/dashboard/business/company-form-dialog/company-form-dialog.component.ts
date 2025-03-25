import { ContentObserver } from '@angular/cdk/observers';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA,
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
  CompanyPartsFragment,
  CreateOneCompanyGQL,
  UpdateOneCompanyGQL,
} from '@graphql';
import { FormToolsService, StorageService } from '@services';
import { map, switchMap } from 'rxjs';

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
  templateUrl: './company-form-dialog.component.html',
  styles: ``,
})
export class CompanyFormDialogComponent implements OnInit {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: CompanyPartsFragment | null = inject(MAT_DIALOG_DATA);
  public readonly _storage = inject(StorageService);

  private readonly _createOneCompany = inject(CreateOneCompanyGQL);
  private readonly _updateOneCompany = inject(UpdateOneCompanyGQL);

  private readonly _dialogRef = inject(
    MatDialogRef<CompanyFormDialogComponent>
  );

  private previusPicture = '';

  public formGroup = this.formTools.builder.group({
    picture: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.get('picture')?.clearValidators();
      this.formGroup.patchValue({
        name: this.data.name,
        address: this.data.address,
        picture: this.data.picture,
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
          next: (company) => {
            this._dialogRef.close(company);
          },
          error: (err) => {
            console.error('UPDATE COMPANY ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      } else {
        this._save(values).subscribe({
          next: (company) => {
            this._dialogRef.close(company);
          },
          error: (err) => {
            console.error('CREATE COMPANY ERROR: ', err);
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
          this._updateOneCompany.mutate({
            id: this.data!.id,
            update: { ...values, picture },
          })
        ),
        map((value) => value.data?.updateOneCompany)
      );
    }

    return this._updateOneCompany
      .mutate({
        id: this.data!.id,
        update: { ...values } as any,
      })
      .pipe(map((value) => value.data?.updateOneCompany));
  }

  private _save(values: FormValues) {
    return this._storage.upload(values.picture).pipe(
      switchMap((picture) =>
        this._createOneCompany.mutate({ company: { ...values, picture } })
      ),
      map((value) => value.data?.createOneCompany)
    );
  }
}

type FormValues = {
  picture: File;
  name: string;
  address: string;
};
