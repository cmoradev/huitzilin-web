import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styles: ``,
})
export class AppComponent {
  private readonly _iconRegistry = inject(MatIconRegistry);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _authService = inject(AuthService);

  constructor() {
    this._iconRegistry.addSvgIconSet(
      this._sanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );

    this._authService.restoreSession();
  }
}
