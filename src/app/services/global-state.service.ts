import { Injectable, signal } from '@angular/core';
import {
  BranchPartsFragment,
  CoursePartsFragment,
  SessionPartsFragment,
} from '@graphql';
import { toObservable } from '@angular/core/rxjs-interop';

export const SESSION_KEY = 'session';
export const BRANCH_KEY = 'branch';
export const COURSE_KEY = 'course';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private readonly _session = signal<SessionPartsFragment | null>(null);
  private readonly _branch = signal<BranchPartsFragment | null>(null);
  private readonly _course = signal<CoursePartsFragment | null>(null);

  public session$ = toObservable(this._session);
  public branch$ = toObservable(this._branch);

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
    this._course.set(null);
  }

  get course(): CoursePartsFragment | null {
    return this._course();
  }

  set course(value: CoursePartsFragment | null) {
    this._course.set(value);
    if (!!value) {
      sessionStorage.setItem(COURSE_KEY, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(COURSE_KEY);
    }
  }
}
