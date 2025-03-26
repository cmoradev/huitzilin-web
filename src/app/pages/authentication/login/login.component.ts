import { Component, inject, signal } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { AuthService, FormToolsService } from '@services';
import { ReactiveFormsModule, Validators } from '@angular/forms';

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
    MatError,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  private readonly router = inject(Router);

  private readonly _authService = inject(AuthService);

  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);

  public formGroup = this.formTools.builder.group({
    password: ['', [Validators.required]],
    username: [this._authService.username, [Validators.required]],
    rememberMe: [false],
  });

  public submit() {
    this.loading.set(true);

    if (this.formGroup.valid) {
      const values = this.formGroup.getRawValue() as any;

      const { username, password, rememberMe } = values;

      if (rememberMe) {
        this._authService.username = username;
      }

      this._authService.signIn({ username, password }).subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/']);
        },
        error: () => {
          this.loading.set(false);
        },
      });
    }
  }
}
