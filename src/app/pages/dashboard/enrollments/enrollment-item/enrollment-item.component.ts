import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { EnrollmentPartsFragment } from '@graphql';
import { EnrollmentStatePipe } from '@pipes';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-enrollment-item',
  imports: [
    NgClass,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    EnrollmentStatePipe,
    DragDropModule,
  ],
  templateUrl: './enrollment-item.component.html',
  styleUrl: './enrollment-item.component.scss',
})
export class EnrollmentItemComponent {
  @Input({ required: true }) enrollment!: EnrollmentPartsFragment;
  @Input() menuTrigger!: MatMenuTrigger;

  @Output() create = new EventEmitter<EnrollmentPartsFragment>();
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
