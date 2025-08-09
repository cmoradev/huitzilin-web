import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateOneUserGQL, UserPartsFragment } from '@graphql';
import { BranchToolsService, CycleToolsService, FormToolsService } from '@services';

@Component({
  selector: 'app-user-form-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form-dialog.component.html',
  styles: ``,
})
export class UserFormDialogComponent implements OnInit {
  public formTools = inject(FormToolsService);
  public loading = signal<boolean>(false);
  public data = inject<UserPartsFragment | null>(MAT_DIALOG_DATA);

  private readonly _dialogRef = inject(MatDialogRef<UserFormDialogComponent>);
  private readonly createOneUserGQL = inject(CreateOneUserGQL);

  public branchTools = inject(BranchToolsService);
  public cycleTools = inject(CycleToolsService);

  public formGroup = this.formTools.builder.group({
    username: this.formTools.builder.control<string>(
      this.data?.username ?? '',
      {
        validators: [Validators.required, Validators.minLength(4)],
        nonNullable: true,
      }
    ),
    password: this.formTools.builder.control<string>('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
    email: this.formTools.builder.control<string>(this.data?.email ?? '', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    branchId: this.formTools.builder.control<string | null>(
      this.data?.branchId ?? null,
      {
        validators: [],
        nonNullable: false,
      }
    ),
    cycleId: this.formTools.builder.control<string | null>(
      this.data?.branchId ?? null,
      {
        validators: [],
        nonNullable: false,
      }
    ),
  });

  ngOnInit(): void {
    this.branchTools.fetchAll();
    this.cycleTools.fetchAll();
  }

  public submit() {
    if (this.formGroup.valid) {
      const values = this.formGroup.getRawValue();

      if (!!this.data?.id) {

      } else {
        this.createOneUserGQL.mutate({
          input: {
            email: values.email,
            username: values.username,
            password: values.password,
            branchId: values.branchId,
            cycleId: values.cycleId,
          }
        }).subscribe({
          next: ({ data }) => {
            console.log('User created successfully:', response);
            this._dialogRef.close(data?.signUp)
          },
          error: (error) => {
            console.error('Error creating user:', error);
          }
        })
      }
    }
  }
}
