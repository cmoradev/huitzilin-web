import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-sidebar',
  imports: [MatToolbarModule, MatRippleModule, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  @Output() toggleSidenavRight = new EventEmitter<void>();

  private readonly _globalStateService = inject(GlobalStateService);

  public currentBranch = computed(() => this._globalStateService.branch);
}
