import {
  booleanAttribute,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatBadge,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    RouterLink,
    MatMiniFabButton,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  @Input({ required: false, transform: booleanAttribute }) isMobileScreen =
    false;

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router); 

  public signOut() {
    this._authService.signOut();
    this._router.navigate(['/authentication/login']);
  }
}
