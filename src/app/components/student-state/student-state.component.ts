import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatRipple } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { GetStudentsPageGQL, StudentPartsFragment } from '@graphql';
import { GlobalStateService } from '@services';
import { debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'app-student-state',
  imports: [
    MatLabel,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatInput,
    MatOption,
    MatFormField,
    ReactiveFormsModule,
    MatIcon,
    MatRipple,
    AvatarComponent
  ],
  templateUrl: './student-state.component.html',
  styles: ``,
})
export class StudentStateComponent implements AfterViewInit, OnInit {
  public searching = signal<boolean>(true);
  public studentControl = new FormControl<StudentPartsFragment | string>('');
  public loadingStudents = signal<boolean>(false);
  public students = signal<StudentPartsFragment[]>([]);
  private readonly _studentsPageGQL = inject(GetStudentsPageGQL);

  private readonly _globalStateService = inject(GlobalStateService);

  public student = computed(() => this._globalStateService.student);

  ngOnInit(): void {
    this.searching.set(this._globalStateService.student === null);
  }

  ngAfterViewInit(): void {
    this.studentControl.valueChanges
      .pipe(debounceTime(300), startWith(''))
      .subscribe({
        next: (value) => {
          if (value && typeof value === 'object') {
            this._globalStateService.student = value;
            this._globalStateService.enrollment = null;
            this.toggleStudent();
          } else if (typeof value === 'string') {
            this._fetchStudents(value);
          }
        },
      });
  }

  public toggleStudent(): void {
    this.searching.update((prev) => !prev);
  }

  public displayFn(value: StudentPartsFragment): string {
    return value?.fullname ?? '';
  }

  private _fetchStudents(value: string): void {
    if (this._globalStateService.branch!.id) {
      this.loadingStudents.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._studentsPageGQL
        .watch(
          {
            limit: 100,
            offset: 0,
            filter: {
              fullname: { iLike: `%${value}%` },
              branchs: { id: { eq: this._globalStateService.branch!.id } },
            },
          },
          {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
          }
        )
        .valueChanges.subscribe({
          next: ({ loading, data }) => {
            this.loadingStudents.set(loading);

            this.students.set(data?.students.nodes ?? []);
          },
        });
    } else {
      this.loadingStudents.set(false);
      this.students.set([]);
    }
  }
}
