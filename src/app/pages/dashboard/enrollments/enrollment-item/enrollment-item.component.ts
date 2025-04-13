import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { EnrollmentPartsFragment } from '@graphql';
import { EnrollmentStatePipe } from '@pipes';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-enrollment-item',
  imports: [
    NgClass,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatListItemTitle,
    MatListItemMeta,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    EnrollmentStatePipe,
  ],
  templateUrl: './enrollment-item.component.html',
  styles: ``,
})
export class EnrollmentItemComponent {
  @Input({ required: true }) enrollment!: EnrollmentPartsFragment;
  @Input() menuTrigger!: MatMenuTrigger;

  @Output() update = new EventEmitter<EnrollmentPartsFragment>();
  @Output() delete = new EventEmitter<EnrollmentPartsFragment>();

  private readonly _globalStateService = inject(GlobalStateService);

  public isActive = computed(() => {
    return this._globalStateService.enrollment?.id === this.enrollment.id;
  });

  public selectEnrollment() {
    this._globalStateService.enrollment = this.enrollment;
  }

  public openMenu(event: MouseEvent) {
    event.stopPropagation();
    if (this.menuTrigger) {
      this.menuTrigger.openMenu();
    }
  }
}
