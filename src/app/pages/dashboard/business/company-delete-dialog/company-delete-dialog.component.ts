import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { CompanyPartsFragment, DeleteOneCompanyGQL } from '@graphql';

@Component({
  selector: 'app-company-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    AvatarComponent,
  ],
  templateUrl: './company-delete-dialog.component.html',
  styles: ``,
})
export class CompanyDeleteDialogComponent {
  public loading = signal(false);

  public data: CompanyPartsFragment = inject(MAT_DIALOG_DATA);

  private readonly _deleteOneCompany = inject(DeleteOneCompanyGQL);
  private readonly _dialogRef = inject(
    MatDialogRef<CompanyDeleteDialogComponent>
  );

  public delete() {
    if (!!this.data.id) {
      this.loading.set(true);

      this._deleteOneCompany.mutate({ id: this.data.id }).subscribe({
        next: (company) => {
          this._dialogRef.close(company.data?.deleteOneCompany);
        },
        error: (err) => {
          console.error('DELETE COMPANY ERROR: ', err);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    }
  }
}
