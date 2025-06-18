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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EnrollmentPartsFragment } from '@graphql';
import { FlatNode } from '@models';
import { EnrollmentStatePipe } from '@pipes';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-enrollment-item',
  imports: [
    NgClass,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    MatProgressBarModule,
    EnrollmentStatePipe,
  ],
  templateUrl: './enrollment-item.component.html',
  styleUrl: './enrollment-item.component.scss',
})
export class EnrollmentItemComponent {
  @Input({ required: true }) node!: EnrollmentPartsFragment;
  @Input() menuTrigger!: MatMenuTrigger;

  @Output() update = new EventEmitter<EnrollmentPartsFragment>();
  @Output() remove = new EventEmitter<EnrollmentPartsFragment>();

  private readonly _globalStateService = inject(GlobalStateService);

  public isActive = computed(() => {
    return this._globalStateService.enrollment?.id === this.node.id;
  });

  public selectEnrollment() {
    this._globalStateService.enrollment = this.node;
  }

  public openMenu(event: MouseEvent) {
    event.stopPropagation();
    if (this.menuTrigger) {
      this.menuTrigger.openMenu();
    }
  }
}
