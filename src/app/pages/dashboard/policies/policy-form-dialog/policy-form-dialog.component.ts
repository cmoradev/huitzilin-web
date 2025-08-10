import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateOnePolicyGQL, PolicyPartsFragment, UpdateOnePolicyGQL } from '@graphql';
import { BranchToolsService, FormToolsService } from '@services';

@Component({
  selector: 'app-policy-form-dialog',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './policy-form-dialog.component.html',
  styles: ``
})
export class PolicyFormDialogComponent {
  public formTools = inject(FormToolsService);
  public loading = signal<boolean>(false);
  public data = inject<PolicyPartsFragment | null>(MAT_DIALOG_DATA);

  private readonly _dialogRef = inject(MatDialogRef<PolicyFormDialogComponent>);
  private readonly createOnePolicyGQL = inject(CreateOnePolicyGQL);
  private readonly updateOnePolicyGQL = inject(UpdateOnePolicyGQL);

  public branchTools = inject(BranchToolsService);

  public formGroup = this.formTools.builder.group({
    username: this.formTools.builder.control<string>(
      this.data?.username ?? '',
      {
        validators: [Validators.required, Validators.minLength(4)],
        asyncValidators: [this.formTools.isUsernameValid],
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
      this.data?.cycleId ?? null,
      {
        validators: [],
        nonNullable: false,
      }
    ),
  });

  ngOnInit(): void {
    this.branchTools.fetchAll();
    this.cycleTools.fetchAll();

    if (this.data?.id) {
      this.formGroup.get('password')?.clearValidators();
      this.formGroup.get('password')?.updateValueAndValidity();

      this.formGroup
        .get('username')
        ?.valueChanges.pipe(startWith(this.data.username))
        .subscribe((value) => {
          const usernameControl = this.formGroup.get('username');

          if (value === this.data?.username) {
            usernameControl?.clearAsyncValidators();
          } else {
            usernameControl?.setAsyncValidators([this.formTools.isUsernameValid]);
          }
          usernameControl?.updateValueAndValidity({
            onlySelf: true,
            emitEvent: false,
          });
        });
    }
  }

  public submit() {
    if (this.formGroup.valid) {
      this.loading.set(true);
      const values = this.formGroup.getRawValue();

      if (!!this.data?.id) {
        this.updateOneUserGQL
          .mutate({
            id: this.data?.id,
            update: {
              email: values.email,
              username: values.username,
              branchId: values.branchId,
              cycleId: values.cycleId,
            },
          })
          .subscribe({
            next: ({ data }) => {
              this.loading.set(false);
              this._dialogRef.close(data?.updateOneUser);
            },
            error: (error) => {
              this.loading.set(false);
              console.error('Error creating user:', error);
            },
          });
      } else {
        this.createOneUserGQL
          .mutate({
            input: {
              email: values.email,
              username: values.username,
              password: values.password,
              branchId: values.branchId,
              cycleId: values.cycleId,
            },
          })
          .subscribe({
            next: ({ data }) => {
              this.loading.set(false);
              this._dialogRef.close(data?.signUp);
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
