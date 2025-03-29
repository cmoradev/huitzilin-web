import { Injectable, signal } from '@angular/core';
import {
  BranchPartsFragment,
  CoursePartsFragment,
  CyclePartsFragment,
  EnrollmentPartsFragment,
  SessionPartsFragment,
} from '@graphql';
import { toObservable } from '@angular/core/rxjs-interop';

export const SESSION_KEY = 'session';
export const BRANCH_KEY = 'branch';
export const CYCLE_KEY = 'cycle';
export const COURSE_KEY = 'course';
export const ENROLLMENT_KEY = 'enrollment';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private readonly _session = signal<SessionPartsFragment | null>(null);
  private readonly _branch = signal<BranchPartsFragment | null>(null);
  private readonly _cycle = signal<CyclePartsFragment | null>(null);
  private readonly _course = signal<CoursePartsFragment | null>(null);
  private readonly _enrollment = signal<EnrollmentPartsFragment | null>(null);

  public session$ = toObservable(this._session);
  public branch$ = toObservable(this._branch);
  public cycle$ = toObservable(this._cycle);
  public course$ = toObservable(this._course);
  public enrollment$ = toObservable(this._enrollment);

  get session(): SessionPartsFragment | null {
    return this._session();
  }

  set session(value: SessionPartsFragment | null) {
    this._session.set(value);
    if (!!value) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }

  get branch(): BranchPartsFragment | null {
    return this._branch();
  }

  set branch(value: BranchPartsFragment | null) {
    this._branch.set(value);
    if (!!value) {
      sessionStorage.setItem(BRANCH_KEY, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(BRANCH_KEY);
    }
    this._cycle.set(null);
    this._course.set(null);
    this._enrollment.set(null);
  }

  get course(): CoursePartsFragment | null {
    return this._course();
  }

  set course(value: CoursePartsFragment | null) {
    this._course.set(value);
    if (!!value) {
      localStorage.setItem(COURSE_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(COURSE_KEY);
    }
  }

  get enrollment(): EnrollmentPartsFragment | null {
    return this._enrollment();
  }

  set enrollment(value: EnrollmentPartsFragment | null) {
    this._enrollment.set(value);
    if (!!value) {
      localStorage.setItem(ENROLLMENT_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(ENROLLMENT_KEY);
    }
  }

  get cycle(): CyclePartsFragment | null {
    return this._cycle();
  }

  set cycle(value: CyclePartsFragment | null) {
    this._cycle.set(value);
    if (!!value) {
      sessionStorage.setItem(CYCLE_KEY, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(CYCLE_KEY);
    }
  }
}
