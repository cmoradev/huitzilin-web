import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormToolsService } from '@services';

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
  public formTools = inject(FormToolsService);

  public form = input.required<FormGroup>();
}
