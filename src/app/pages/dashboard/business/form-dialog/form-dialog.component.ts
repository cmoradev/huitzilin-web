import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ImagePickerComponent } from '@components/image-picker/image-picker.component';
import { FormToolsService } from '@services';

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
  templateUrl: './form-dialog.component.html',
  styles: ``,
})
export class FormDialogComponent {
  public readonly formTools = inject(FormToolsService);

  public formGroup = this.formTools.builder.group({
    picture: ['', [Validators.required]],
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });

  public submit(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }
}
