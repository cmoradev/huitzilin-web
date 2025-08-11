import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CreateAction,
  CreateOnePolicyGQL,
  PolicyPartsFragment,
  UpdateOnePolicyGQL,
} from '@graphql';
import { FormToolsService } from '@services';
import { ActionFormComponent } from '../action-form/action-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JsonPipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-policy-form-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    ActionFormComponent,
    MatTooltipModule,
    MatIconModule,
    MatChipsModule,

  ],
  templateUrl: './policy-form-dialog.component.html',
  styles: ``,
})
export class PolicyFormDialogComponent {
  public formTools = inject(FormToolsService);
  public loading = signal<boolean>(false);
  public data = inject<PolicyPartsFragment | null>(MAT_DIALOG_DATA);

  private readonly _dialogRef = inject(MatDialogRef<PolicyFormDialogComponent>);
  private readonly createOnePolicyGQL = inject(CreateOnePolicyGQL);
  private readonly updateOnePolicyGQL = inject(UpdateOnePolicyGQL);

  public actions = signal<CreateAction[]>([]);

  public formGroup = this.formTools.builder.group({
    name: this.formTools.builder.control<string>(this.data?.name ?? '', {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
    }),
  });

  public sutmitPermission(value: CreateAction[]) {
    console.log(value);
  }

  public submit() {
    if (this.formGroup.valid) {
      this.loading.set(true);
      const values = this.formGroup.getRawValue();

      if (!!this.data?.id) {
        this.updateOnePolicyGQL
          .mutate({
            id: this.data?.id,
            update: {
              name: values.name,
              actions: this.actions(),
            },
          })
          .subscribe({
            next: ({ data }) => {
              this.loading.set(false);
              this._dialogRef.close(data?.updateOnePolicy);
            },
            error: (error) => {
              this.loading.set(false);
              console.error('Error creating user:', error);
            },
          });
      } else {
        this.createOnePolicyGQL
          .mutate({
            policy: {
              name: values.name,
              actions: this.actions(),
            },
          })
          .subscribe({
            next: ({ data }) => {
              this.loading.set(false);
              this._dialogRef.close(data?.createOnePolicy);
            },
            error: (error) => {
              this.loading.set(false);
              console.error('Error creating user:', error);
            },
          });
      }
    }
  }

  public addActionForm(initialValues: CreateAction): void {
    const { actions, resources, route, id = null } = initialValues;

    const resourcesValue = resources.split(',');
  }
}
