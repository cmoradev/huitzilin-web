import { Component, inject, signal } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';

@Component({
  selector: 'app-full',
  imports: [RouterOutlet, MatSidenavContainer, MatSidenav, MatSidenavContent],
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private isMobileScreen = signal(false);

  constructor() {
    this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW])
      .subscribe((state) => {
        console.log('Hello WOrld')
        this.isMobileScreen.set(state.breakpoints[MOBILE_VIEW]);
      });
  }

  public get isOver(): boolean {
    return this.isMobileScreen();
  }
}
