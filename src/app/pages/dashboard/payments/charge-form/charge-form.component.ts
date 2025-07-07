import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-charge-form',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTimepickerModule],
  templateUrl: './charge-form.component.html',
  styles: ``
})
export class ChargeFormComponent {

}
