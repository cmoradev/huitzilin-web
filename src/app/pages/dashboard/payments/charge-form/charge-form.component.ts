import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-charge-form',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTimepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './charge-form.component.html',
  styles: ``,
})
export class ChargeFormComponent {
  public formGroup = input.required<FormGroup>();

  public submit() {
    
  }
}
