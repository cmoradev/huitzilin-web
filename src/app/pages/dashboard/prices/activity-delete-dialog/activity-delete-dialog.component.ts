import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ActivityPartsFragment, DeleteOneActivityGQL } from '@graphql';

@Component({
  selector: 'app-activity-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './activity-delete-dialog.component.html',
  styles: ``,
})
export class ActivityDeleteDialogComponent {
  public loading = signal(false);

  public data: ActivityPartsFragment = inject(MAT_DIALOG_DATA);

  private readonly _deleteOneActivity = inject(DeleteOneActivityGQL);
  private readonly _dialogRef = inject(
    MatDialogRef<ActivityDeleteDialogComponent>
  );

  public delete() {
    if (!!this.data.id) {
      this.loading.set(true);

      this._deleteOneActivity.mutate({ id: this.data.id }).subscribe({
        next: (branch) => {
          this._dialogRef.close(branch.data?.deleteOneActivity);
        },
        error: (err) => {
          console.error('DELETE BRANCH ERROR: ', err);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    }
  }
}
