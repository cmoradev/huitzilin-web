import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatButton,
    MatCheckbox,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  private readonly router = inject(Router)
  
  public submit() {
    this.router.navigate(['/'])
  }
}
