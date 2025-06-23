import { Component, input, output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { SchedulePartsFragment } from '@graphql';

@Component({
  selector: 'app-schedule-item',
  imports: [MatChipsModule],
  templateUrl: './schedule-item.component.html',
  styles: ``,
})
export class ScheduleItemComponent {
  public schedule = input.required<SchedulePartsFragment>();

  public selected = output<SchedulePartsFragment>();

  public selectedSchedule(event: MouseEvent) {
    event.stopPropagation();

    this.selected.emit(this.schedule());
  }
}
