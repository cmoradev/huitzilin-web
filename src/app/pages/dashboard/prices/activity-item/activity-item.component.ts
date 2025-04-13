import { NgClass } from '@angular/common';
import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ActivityPartsFragment } from '@graphql';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-activity-item',
  imports: [
    NgClass,
    MatIcon,
    MatIconButton,
    MatMenuModule,
  ],
  templateUrl: './activity-item.component.html',
  styleUrl: `./activity-item.component.scss`,
})
export class ActivityItemComponent {
  @Input({ required: true }) activity!: ActivityPartsFragment;
  @Input() menuTrigger!: MatMenuTrigger;

  @Output() update = new EventEmitter<ActivityPartsFragment>();
  @Output() delete = new EventEmitter<ActivityPartsFragment>();

  private readonly _globalStateService = inject(GlobalStateService);

  public isActive = computed(() => {
    return this._globalStateService.activity?.id === this.activity.id;
  });

  public selectActivity() {
    this._globalStateService.activity = this.activity;
  }

  public openMenu(event: MouseEvent) {
    event.stopPropagation();
    if (this.menuTrigger) {
      this.menuTrigger.openMenu();
    }
  }
}
