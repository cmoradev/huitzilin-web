import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-students',
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  templateUrl: './students.component.html',
  styles: ``,
})
export class StudentsComponent {}
