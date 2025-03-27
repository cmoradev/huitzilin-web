import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { CoursePartsFragment } from '@graphql';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-course-item',
  imports: [
    MatIcon,
    MatIconButton,
    MatListItem,
    MatListItemTitle,
    MatListItemMeta,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './course-item.component.html',
  styles: ``,
})
export class CourseItemComponent {
  @Input({ required: true }) course!: CoursePartsFragment;
  @Input() menuTrigger!: MatMenuTrigger;

  @Output() update = new EventEmitter<CoursePartsFragment>();
  @Output() delete = new EventEmitter<CoursePartsFragment>();

  private readonly _globalStateService = inject(GlobalStateService);

  public isActive = computed(() => {
    return this._globalStateService.course?.id === this.course.id;
  });

  public selectCourse() {
    this._globalStateService.course = this.course;
  }

  public openMenu(event: MouseEvent) {
    event.stopPropagation();
    if (this.menuTrigger) {
      console.log('openMenu', event);
      this.menuTrigger.openMenu();
    }
  }
}
