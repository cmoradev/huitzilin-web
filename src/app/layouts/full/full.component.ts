import { Component, inject, signal, ViewChild } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HeaderComponent } from './header/header.component';
import { filter } from 'rxjs';
import { SidebarComponent } from './sidebar/sidebar.component';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';

@Component({
  selector: 'app-full',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent {
  @ViewChild('leftsidenav') public sidenav!: MatSidenav;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);

  public isMobileScreen = signal(false);

  constructor() {
    this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW])
      .subscribe((state) => {
        this.isMobileScreen.set(state.breakpoints[MOBILE_VIEW]);
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.content.scrollTo({ top: 0 });
      });
  }

  public get isOver(): boolean {
    return this.isMobileScreen();
  }
}
