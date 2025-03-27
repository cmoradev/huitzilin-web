import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CoursePartsFragment, DeleteOneCourseGQL } from '@graphql';

@Component({
  selector: 'app-course-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './course-delete-dialog.component.html',
  styles: ``,
})
export class CourseDeleteDialogComponent {
  public loading = signal(false);

  public data: CoursePartsFragment = inject(MAT_DIALOG_DATA);

  private readonly _deleteOneBranch = inject(DeleteOneCourseGQL);
  private readonly _dialogRef = inject(
    MatDialogRef<CourseDeleteDialogComponent>
  );

  public delete() {
    if (!!this.data.id) {
      this.loading.set(true);

      this._deleteOneBranch.mutate({ id: this.data.id }).subscribe({
        next: (branch) => {
          this._dialogRef.close(branch.data?.deleteOneCourse);
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
