import {
  booleanAttribute,
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import {
  MatButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService, GlobalStateService } from '@services';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIconButton,
    MatButton,
    MatIcon,
    MatBadge,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggleSidenavLeft = new EventEmitter<void>();
  @Output() toggleSidenavRight = new EventEmitter<void>();

  @Input({ required: false, transform: booleanAttribute }) isMobileScreen =
    false;

  private readonly _authService = inject(AuthService);
  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _router = inject(Router);

  public username = computed(
    () => this._globalStateService.session?.username ?? `root`
  );

  public signOut() {
    this._authService.signOut();
    this._router.navigate(['/authentication/login']);
  }
}
