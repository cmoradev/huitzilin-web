import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SchedulePartsFragment } from '@graphql';

@Component({
  selector: 'app-schedule-item',
  imports: [MatButtonModule, MatIconModule],
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
