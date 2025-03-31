import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatHint,
  MatError,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {
  ClassroomPartsFragment,
  CoursePartsFragment,
  CreateOneEnrollmentGQL,
  EnrollmentPartsFragment,
  EnrollmentState,
  GetClassroomsPageGQL,
  GetCoursePageGQL,
  UpdateOneEnrollmentGQL,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { enrollmentStates } from '@utils/contains';
import { debounceTime, filter, map, merge, startWith } from 'rxjs';

@Component({
  selector: 'app-enrollment-form-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatFormField,
    MatInput,
    MatHint,
    MatError,
    MatLabel,
    MatOption,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatIconButton,
    MatIcon,
    MatSelect,
    ReactiveFormsModule,
  ],
  templateUrl: './enrollment-form-dialog.component.html',
  styles: ``,
})
export class EnrollmentFormDialogComponent implements AfterViewInit {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: EnrollmentPartsFragment | null = inject(MAT_DIALOG_DATA);

  public formGroup = this.formTools.builder.group({
    details: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
    ],
    state: [EnrollmentState.Active, [Validators.required]],
    course: ['' as any, [Validators.required]],
    classroom: ['' as any, [Validators.required]],
  });

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneEnrollment = inject(CreateOneEnrollmentGQL);
  private readonly _updateOneEnrollment = inject(UpdateOneEnrollmentGQL);

  public loadingCourses = signal<boolean>(false);
  public courses = signal<CoursePartsFragment[]>([]);
  private readonly _coursesPageGQL = inject(GetCoursePageGQL);
  public loadingClassrooms = signal<boolean>(false);
  public classrooms = signal<ClassroomPartsFragment[]>([]);
  private readonly _classroomsPageGQL = inject(GetClassroomsPageGQL);

  public enrollmentStates = enrollmentStates;

  private readonly _dialogRef = inject(
    MatDialogRef<EnrollmentFormDialogComponent>
  );

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.patchValue({
        details: this.data.details,
        course: this.data.course,
        classroom: this.data.classroom,
      });
    }

    merge(
      this.formGroup.get('course')!.valueChanges,
      this.formGroup.get('classroom')!.valueChanges
    )
      .pipe(filter((value) => typeof value === 'object'))
      .subscribe(() => {
        const courseName = this.formGroup.get('course')?.value.name ?? '';
        const classroomName = this.formGroup.get('classroom')?.value.name ?? '';

        this.formGroup
          .get('details')
          ?.setValue(`${courseName} - ${classroomName}`);
      });
  }

  ngAfterViewInit(): void {
    this.formGroup
      .get('course')
      ?.valueChanges.pipe(debounceTime(300), startWith(''))
      .subscribe({
        next: (value) => {
          if (typeof value === 'string') {
            this._fetchCourses(value);
          }
        },
      });

    this.formGroup
      .get('classroom')
      ?.valueChanges.pipe(debounceTime(300), startWith(''))
      .subscribe({
        next: (value) => {
          if (typeof value === 'string') {
            this._fetchClassroom(value);
          }
        },
      });
  }

  public async submit(): Promise<void> {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue() as any;

      if (!!this.data?.id) {
        this._update(values).subscribe({
          next: (branch) => {
            this._dialogRef.close(branch);
          },
          error: (err) => {
            console.error('UPDATE ENROLLMENT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      } else if (
        this._globalStateService.student!.id &&
        this._globalStateService.branch!.id &&
        this._globalStateService.cycle!.id
      ) {
        this._save(values).subscribe({
          next: (branch) => {
            this._dialogRef.close(branch);
          },
          error: (err) => {
            console.error('CREATE ENROLLMENT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  public displayFn(
    value: CoursePartsFragment | ClassroomPartsFragment
  ): string {
    return value?.name ?? '';
  }

  private _update(values: FormValues) {
    return this._updateOneEnrollment
      .mutate({
        id: this.data!.id,
        update: {
          courseId: values.course.id,
          classroomId: values.classroom.id,
          details: values.details,
          state: values.state,
        },
      })
      .pipe(map((value) => value.data?.updateOneEnrollment));
  }

  private _save(values: FormValues) {
    return this._createOneEnrollment
      .mutate({
        enrollment: {
          studentId: this._globalStateService.student!.id,
          branchId: this._globalStateService.branch!.id,
          cycleId: this._globalStateService.cycle!.id,
          courseId: values.course.id,
          classroomId: values.classroom.id,
          details: values.details,
          state: values.state,
        },
      })
      .pipe(map((value) => value.data?.createOneEnrollment));
  }

  private _fetchCourses(value: string): void {
    if (this._globalStateService.branch!.id) {
      this.loadingCourses.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._coursesPageGQL
        .watch(
          {
            limit: 100,
            offset: 0,
            filter: {
              name: { iLike: `%${value}%` },
              branchId: { eq: this._globalStateService.branch!.id },
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
            this.loadingCourses.set(loading);

            this.courses.set(data?.courses.nodes ?? []);
          },
        });
    } else {
      this.loadingCourses.set(false);
      this.courses.set([]);
    }
  }

  private _fetchClassroom(value: string): void {
    if (this._globalStateService.branch!.id) {
      this.loadingClassrooms.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._classroomsPageGQL
        .watch(
          {
            limit: 100,
            offset: 0,
            filter: {
              name: { iLike: `%${value}%` },
              branchId: { eq: this._globalStateService.branch!.id },
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
            this.loadingClassrooms.set(loading);

            this.classrooms.set(data?.classrooms.nodes ?? []);
          },
        });
    } else {
      this.loadingClassrooms.set(false);
      this.classrooms.set([]);
    }
  }
}

type FormValues = {
  details: string;
  state: EnrollmentState;
  course: CoursePartsFragment;
  classroom: ClassroomPartsFragment;
};
