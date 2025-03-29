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
import { AvatarComponent } from '@components/avatar/avatar.component';
import {
  DeleteOneStudentGQL,
  RemoveBranchsFromStudentGQL,
  StudentPartsFragment,
} from '@graphql';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-student-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    AvatarComponent,
  ],
  templateUrl: './student-delete-dialog.component.html',
  styles: ``,
})
export class StudentDeleteDialogComponent {
  public loading = signal(false);

  public data: StudentPartsFragment = inject(MAT_DIALOG_DATA);

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _removeBranchsFromStudent = inject(
    RemoveBranchsFromStudentGQL
  );
  private readonly _dialogRef = inject(
    MatDialogRef<StudentDeleteDialogComponent>
  );

  public delete() {
    if (!!this.data.id && this._globalStateService.branch?.id) {
      this.loading.set(true);

      this._removeBranchsFromStudent
        .mutate({
          branchIds: [this._globalStateService.branch?.id],
          studentId: this.data.id,
        })
        .subscribe({
          next: (student) => {
            this._dialogRef.close(student.data?.removeBranchsFromStudent);
          },
          error: (err) => {
            console.error('DELETE STUDENT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
    }
  }
}
