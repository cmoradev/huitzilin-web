import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ClassroomPartsFragment, DeleteOneClassroomGQL } from '@graphql';

@Component({
  selector: 'app-classroom-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon
  ],
  templateUrl: './classroom-delete-dialog.component.html',
  styles: ``,
})
export class ClassroomDeleteDialogComponent {
  public loading = signal(false);

  public data: ClassroomPartsFragment = inject(MAT_DIALOG_DATA);

  private readonly _deleteOneBranch = inject(DeleteOneClassroomGQL);
  private readonly _dialogRef = inject(
    MatDialogRef<ClassroomDeleteDialogComponent>
  );

  public delete() {
    if (!!this.data.id) {
      this.loading.set(true);

      this._deleteOneBranch.mutate({ id: this.data.id }).subscribe({
        next: (branch) => {
          this._dialogRef.close(branch.data?.deleteOneClassroom);
        },
        error: (err) => {
          console.error('DELETE CLASSROOM ERROR: ', err);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    }
  }
}
