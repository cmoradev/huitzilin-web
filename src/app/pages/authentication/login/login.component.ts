import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatCard, MatCardContent, MatFormField, MatInput, MatButton],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {}
