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
  BranchPartsFragment,
  CreateOneBranchGQL,
  UpdateOneBranchGQL,
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
  templateUrl: './branch-form-dialog.component.html',
  styles: ``,
})
export class BranchFormDialogComponent implements OnInit {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: BranchPartsFragment | null = inject(MAT_DIALOG_DATA);
  public readonly _storage = inject(StorageService);

  private readonly _createOneBranch = inject(CreateOneBranchGQL);
  private readonly _updateOneBranch = inject(UpdateOneBranchGQL);

  private readonly _dialogRef = inject(
    MatDialogRef<BranchFormDialogComponent>
  );

  private previusPicture = '';

  public formGroup = this.formTools.builder.group({
    picture: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.get('picture')?.clearValidators();
      this.formGroup.patchValue({
        name: this.data.name,
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
    if (values.picture instanceof File) {
      return this._storage.delete(this.previusPicture).pipe(
        switchMap(() => this._storage.upload(values.picture)),
        switchMap((picture) =>
          this._updateOneBranch.mutate({
            id: this.data!.id,
            update: { ...values, picture },
          })
        ),
        map((value) => value.data?.updateOneBranch)
      );
    }

    return this._updateOneBranch
      .mutate({
        id: this.data!.id,
        update: { ...values } as any,
      })
      .pipe(map((value) => value.data?.updateOneBranch));
  }

  private _save(values: FormValues) {
    return this._storage.upload(values.picture).pipe(
      switchMap((picture) =>
        this._createOneBranch.mutate({ branch: { ...values, picture } })
      ),
      map((value) => value.data?.createOneBranch)
    );
  }
}

type FormValues = {
  picture: File;
  name: string;
  address: string;
};
