import { Component, input, OnChanges, output, signal } from '@angular/core';
import { SchedulePartsFragment } from '@graphql';
import { DayOfWeekPipe } from '@pipes';
import { addHours, isAfter } from 'date-fns';
import { filter } from 'rxjs';

export type CalendarSlot = {
  day: string;
  hour: string;
};

@Component({
  selector: 'app-calendar',
  imports: [DayOfWeekPipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnChanges {
  public days = input.required<string[], string>({ transform: transformDays });
  public firstHour = input.required<string>();
  public lastHour = input.required<string>();
  public schedules = input.required<SchedulePartsFragment[]>();

  public hours = signal<string[]>([]);

  public select = output<CalendarSlot>();

  ngOnChanges(): void {
    this._generateHours(
      new Date(`2025-06-15T${this.firstHour()}`),
      new Date(`2025-06-15T${this.lastHour()}`)
    );

    console.log('CalendarComponent inputs changed:', {
      schedules: this.schedules(),
    });
  }

  public filteredSchedules(day: string, hour: string): SchedulePartsFragment[] {
    return this.schedules().filter((schedule) => {
      const isDay = schedule.day === parseInt(day, 10);

      const isStart = schedule.start.slice(0, 5) === hour;
      const isEnd = schedule.end.slice(0, 5) === hour;

      return isDay && isStart;
    });
  }

  private _generateHours(first: Date, last: Date) {
    const hours: string[] = [];

    let current = new Date(first);

    while (!isAfter(current, last)) {
      hours.push(current.toTimeString().slice(0, 5));
      current = addHours(current, 1);
    }

    this.hours = signal(hours);
  }

  public selectSlot(day: string, hour: string) {
    this.select.emit({ day, hour });
  }
}

function transformDays(value: string | undefined): string[] {
  return value?.split(',').map((day) => day.trim()) ?? [];
}
