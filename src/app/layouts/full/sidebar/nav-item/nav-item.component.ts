import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
} from '@angular/material/list';
import { Router } from '@angular/router';
import { RouteItem } from '@routes';

@Component({
  selector: 'app-nav-item',
  imports: [MatListItem, MatListItemTitle, MatListItemIcon, MatIcon],
  templateUrl: './nav-item.component.html',
  styles: ``,
})
export class NavItemComponent {
  @Input({ required: true }) route!: RouteItem;

  public readonly router = inject(Router);

  public navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
