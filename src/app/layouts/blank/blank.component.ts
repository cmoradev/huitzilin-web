import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, MatSidenavContainer, MatSidenavContent],
  templateUrl: './blank.component.html',
  styles: ``,
})
export class BlankComponent {}
