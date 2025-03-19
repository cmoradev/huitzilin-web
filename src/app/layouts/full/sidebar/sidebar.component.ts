import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconButton, MatIcon, MatToolbar, MatRipple],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

}
