import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  Component,
  ContentChild,
  input,
  OnChanges,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { SchedulePartsFragment } from '@graphql';
import { DayOfWeekPipe } from '@pipes';
import { defaultDate } from '@utils/contains';
import { addHours, isAfter, isEqual } from 'date-fns';

export type CalendarSlot = {
  day: string;
  hour: string;
};

@Component({
  selector: 'app-calendar',
  imports: [DayOfWeekPipe, DatePipe, NgClass, NgTemplateOutlet],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnChanges {
  @ContentChild('schedule') scheduleTemplate!: TemplateRef<any>;

  public selectable = input(false, { transform: booleanAttribute });
  public days = input.required<string[], string>({ transform: transformDays });
  public firstHour = input.required<string>();
  public lastHour = input.required<string>();
  public schedules = input.required<SchedulePartsFragment[]>();

  public hours = signal<Date[]>([]);

  public select = output<CalendarSlot>();

  ngOnChanges(): void {
    this._generateHours(
      new Date(`${defaultDate}T${this.firstHour()}`),
      new Date(`${defaultDate}T${this.lastHour()}`)
    );
  }

  public filteredSchedules(day: string, hour: Date): SchedulePartsFragment[] {
    const schedules = this.schedules().sort((a, b) => {
      return a.discipline.name.localeCompare(b.discipline.name);
    });

    return schedules.filter((schedule) => {
      const isDay = schedule.day === parseInt(day, 10);

      const scheduleStart = new Date(`${defaultDate}T${schedule.start}`);
      const isStart = isEqual(scheduleStart, hour);

      const scheduleEnd = new Date(`${defaultDate}T${schedule.end}`);
      const isEnd = isEqual(scheduleEnd, addHours(hour, 1));

      return isDay && (isStart || isEnd);
    });
  }

  public getContextSchedule(schedule: SchedulePartsFragment) {
    return {
      $implicit: schedule,
    };
  }

  private _generateHours(first: Date, last: Date) {
    const hours: Date[] = [];

    let current = new Date(first);

    while (!isAfter(current, last)) {
      hours.push(current);
      current = addHours(current, 1);
    }

    this.hours = signal(hours);
  }

  public selectSlot(day: string, hour: Date) {
    if (this.selectable()) {
      this.select.emit({ day, hour: hour.toTimeString().slice(0, 5) });
    }
  }
}

function transformDays(value: string | undefined): string[] {
  return value?.split(',').map((day) => day.trim()) ?? [];
}
