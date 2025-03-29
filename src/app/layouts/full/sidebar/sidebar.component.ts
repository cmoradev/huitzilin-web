import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbar } from '@angular/material/toolbar';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-sidebar',
  imports: [MatToolbar, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  private readonly _globalStateService = inject(GlobalStateService);

  public currentBranch = computed(() => this._globalStateService.branch);
}
