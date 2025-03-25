import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

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
}
