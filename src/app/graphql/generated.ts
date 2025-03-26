import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Action = {
  __typename?: 'Action';
  action: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  effect: ActionEffect;
  id: Scalars['ID']['output'];
  policyId: Scalars['String']['output'];
  route: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type ActionConnection = {
  __typename?: 'ActionConnection';
  /** Array of nodes. */
  nodes: Array<Action>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ActionDeleteFilter = {
  action?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<ActionDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ActionDeleteFilter>>;
  policyId?: InputMaybe<StringFieldComparison>;
  route?: InputMaybe<StringFieldComparison>;
};

export type ActionDeleteResponse = {
  __typename?: 'ActionDeleteResponse';
  action?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  effect?: Maybe<ActionEffect>;
  id?: Maybe<Scalars['ID']['output']>;
  policyId?: Maybe<Scalars['String']['output']>;
  route?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export enum ActionEffect {
  Allow = 'ALLOW',
  Deny = 'DENY'
}

export type ActionFilter = {
  action?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<ActionFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ActionFilter>>;
  policyId?: InputMaybe<StringFieldComparison>;
  route?: InputMaybe<StringFieldComparison>;
};

export type ActionSort = {
  direction: SortDirection;
  field: ActionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ActionSortFields {
  Action = 'action',
  Id = 'id',
  PolicyId = 'policyId',
  Route = 'route'
}

export type ActionUpdateFilter = {
  action?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<ActionUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ActionUpdateFilter>>;
  policyId?: InputMaybe<StringFieldComparison>;
  route?: InputMaybe<StringFieldComparison>;
};

export type Branch = {
  __typename?: 'Branch';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type BranchConnection = {
  __typename?: 'BranchConnection';
  /** Array of nodes. */
  nodes: Array<Branch>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type BranchDeleteFilter = {
  and?: InputMaybe<Array<BranchDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BranchDeleteFilter>>;
};

export type BranchDeleteResponse = {
  __typename?: 'BranchDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type BranchFilter = {
  and?: InputMaybe<Array<BranchFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BranchFilter>>;
};

export type BranchSort = {
  direction: SortDirection;
  field: BranchSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum BranchSortFields {
  Id = 'id',
  Name = 'name'
}

export type BranchUpdateFilter = {
  and?: InputMaybe<Array<BranchUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BranchUpdateFilter>>;
};

export type Classroom = {
  __typename?: 'Classroom';
  branchId: Scalars['String']['output'];
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type ClassroomConnection = {
  __typename?: 'ClassroomConnection';
  /** Array of nodes. */
  nodes: Array<Classroom>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ClassroomDeleteFilter = {
  and?: InputMaybe<Array<ClassroomDeleteFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ClassroomDeleteFilter>>;
};

export type ClassroomDeleteResponse = {
  __typename?: 'ClassroomDeleteResponse';
  branchId?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type ClassroomFilter = {
  and?: InputMaybe<Array<ClassroomFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ClassroomFilter>>;
};

export type ClassroomSort = {
  direction: SortDirection;
  field: ClassroomSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ClassroomSortFields {
  BranchId = 'branchId',
  Id = 'id',
  Name = 'name'
}

export type ClassroomUpdateFilter = {
  and?: InputMaybe<Array<ClassroomUpdateFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ClassroomUpdateFilter>>;
};

export type Course = {
  __typename?: 'Course';
  branchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type CourseConnection = {
  __typename?: 'CourseConnection';
  /** Array of nodes. */
  nodes: Array<Course>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type CourseDeleteFilter = {
  and?: InputMaybe<Array<CourseDeleteFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CourseDeleteFilter>>;
};

export type CourseDeleteResponse = {
  __typename?: 'CourseDeleteResponse';
  branchId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type CourseFilter = {
  and?: InputMaybe<Array<CourseFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CourseFilter>>;
};

export type CourseSort = {
  direction: SortDirection;
  field: CourseSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CourseSortFields {
  BranchId = 'branchId',
  Id = 'id',
  Name = 'name'
}

export type CourseUpdateFilter = {
  and?: InputMaybe<Array<CourseUpdateFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CourseUpdateFilter>>;
};

export type CreateAction = {
  action: Scalars['String']['input'];
  effect: ActionEffect;
  policyId: Scalars['String']['input'];
  route: Scalars['String']['input'];
};

export type CreateBranch = {
  name: Scalars['String']['input'];
  picture: Scalars['String']['input'];
};

export type CreateClassroom = {
  branchId: Scalars['String']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCourse = {
  branchId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCycle = {
  branchId: Scalars['String']['input'];
  end: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  start: Scalars['DateTime']['input'];
};

export type CreateDebit = {
  description: Scalars['String']['input'];
  dueDate: Scalars['DateTime']['input'];
  enrollmentId: Scalars['String']['input'];
  frequency: Frequency;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  state: DebitState;
  value: Scalars['Float']['input'];
};

export type CreateEnrollment = {
  branchId: Scalars['String']['input'];
  classroomId: Scalars['String']['input'];
  courseId: Scalars['String']['input'];
  cycleId: Scalars['String']['input'];
  details: Scalars['String']['input'];
  state: EnrollmentState;
  studentId: Scalars['String']['input'];
};

export type CreateFee = {
  courseId: Scalars['String']['input'];
  frequency: Frequency;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type CreateManyActionsInput = {
  /** Array of records to create */
  actions: Array<CreateAction>;
};

export type CreateManyBranchesInput = {
  /** Array of records to create */
  branches: Array<CreateBranch>;
};

export type CreateManyClassroomsInput = {
  /** Array of records to create */
  classrooms: Array<CreateClassroom>;
};

export type CreateManyCoursesInput = {
  /** Array of records to create */
  courses: Array<CreateCourse>;
};

export type CreateManyCyclesInput = {
  /** Array of records to create */
  cycles: Array<CreateCycle>;
};

export type CreateManyDebitsInput = {
  /** Array of records to create */
  debits: Array<CreateDebit>;
};

export type CreateManyEnrollmentsInput = {
  /** Array of records to create */
  enrollments: Array<CreateEnrollment>;
};

export type CreateManyFeesInput = {
  /** Array of records to create */
  fees: Array<CreateFee>;
};

export type CreateManyPoliciesInput = {
  /** Array of records to create */
  policies: Array<CreatePolicy>;
};

export type CreateManyStudentsInput = {
  /** Array of records to create */
  students: Array<CreateStudent>;
};

export type CreateManyTeachersInput = {
  /** Array of records to create */
  teachers: Array<CreateTeacher>;
};

export type CreateManyTutorsInput = {
  /** Array of records to create */
  tutors: Array<CreateTutor>;
};

export type CreateOneActionInput = {
  /** The record to create */
  action: CreateAction;
};

export type CreateOneBranchInput = {
  /** The record to create */
  branch: CreateBranch;
};

export type CreateOneClassroomInput = {
  /** The record to create */
  classroom: CreateClassroom;
};

export type CreateOneCourseInput = {
  /** The record to create */
  course: CreateCourse;
};

export type CreateOneCycleInput = {
  /** The record to create */
  cycle: CreateCycle;
};

export type CreateOneDebitInput = {
  /** The record to create */
  debit: CreateDebit;
};

export type CreateOneEnrollmentInput = {
  /** The record to create */
  enrollment: CreateEnrollment;
};

export type CreateOneFeeInput = {
  /** The record to create */
  fee: CreateFee;
};

export type CreateOnePolicyInput = {
  /** The record to create */
  policy: CreatePolicy;
};

export type CreateOneStudentInput = {
  /** The record to create */
  student: CreateStudent;
};

export type CreateOneTeacherInput = {
  /** The record to create */
  teacher: CreateTeacher;
};

export type CreateOneTutorInput = {
  /** The record to create */
  tutor: CreateTutor;
};

export type CreatePolicy = {
  branchId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateStudent = {
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  picture: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTeacher = {
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  picture: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTutor = {
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  picture: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Cycle = {
  __typename?: 'Cycle';
  branchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  end: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  start: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type CycleConnection = {
  __typename?: 'CycleConnection';
  /** Array of nodes. */
  nodes: Array<Cycle>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type CycleDeleteFilter = {
  and?: InputMaybe<Array<CycleDeleteFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CycleDeleteFilter>>;
};

export type CycleDeleteResponse = {
  __typename?: 'CycleDeleteResponse';
  branchId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  end?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type CycleFilter = {
  and?: InputMaybe<Array<CycleFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CycleFilter>>;
};

export type CycleSort = {
  direction: SortDirection;
  field: CycleSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CycleSortFields {
  BranchId = 'branchId',
  Id = 'id',
  Name = 'name'
}

export type CycleUpdateFilter = {
  and?: InputMaybe<Array<CycleUpdateFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CycleUpdateFilter>>;
};

export type Debit = {
  __typename?: 'Debit';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  dueDate: Scalars['DateTime']['output'];
  enrollmentId: Scalars['String']['output'];
  frequency: Frequency;
  id: Scalars['ID']['output'];
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  state: DebitState;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
  version: Scalars['Int']['output'];
};

export type DebitConnection = {
  __typename?: 'DebitConnection';
  /** Array of nodes. */
  nodes: Array<Debit>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DebitDeleteFilter = {
  and?: InputMaybe<Array<DebitDeleteFilter>>;
  description?: InputMaybe<StringFieldComparison>;
  enrollmentId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DebitDeleteFilter>>;
};

export type DebitDeleteResponse = {
  __typename?: 'DebitDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  enrollmentId?: Maybe<Scalars['String']['output']>;
  frequency?: Maybe<Frequency>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<DebitState>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type DebitFilter = {
  and?: InputMaybe<Array<DebitFilter>>;
  description?: InputMaybe<StringFieldComparison>;
  enrollmentId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DebitFilter>>;
};

export type DebitSort = {
  direction: SortDirection;
  field: DebitSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DebitSortFields {
  Description = 'description',
  EnrollmentId = 'enrollmentId',
  Id = 'id'
}

export enum DebitState {
  Canceled = 'CANCELED',
  Condoned = 'CONDONED',
  Debt = 'DEBT',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID'
}

export type DebitUpdateFilter = {
  and?: InputMaybe<Array<DebitUpdateFilter>>;
  description?: InputMaybe<StringFieldComparison>;
  enrollmentId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DebitUpdateFilter>>;
};

export type DeleteManyActionsInput = {
  /** Filter to find records to delete */
  filter: ActionDeleteFilter;
};

export type DeleteManyBranchesInput = {
  /** Filter to find records to delete */
  filter: BranchDeleteFilter;
};

export type DeleteManyClassroomsInput = {
  /** Filter to find records to delete */
  filter: ClassroomDeleteFilter;
};

export type DeleteManyCoursesInput = {
  /** Filter to find records to delete */
  filter: CourseDeleteFilter;
};

export type DeleteManyCyclesInput = {
  /** Filter to find records to delete */
  filter: CycleDeleteFilter;
};

export type DeleteManyDebitsInput = {
  /** Filter to find records to delete */
  filter: DebitDeleteFilter;
};

export type DeleteManyEnrollmentsInput = {
  /** Filter to find records to delete */
  filter: EnrollmentDeleteFilter;
};

export type DeleteManyFeesInput = {
  /** Filter to find records to delete */
  filter: FeeDeleteFilter;
};

export type DeleteManyPoliciesInput = {
  /** Filter to find records to delete */
  filter: PolicyDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteManyStudentsInput = {
  /** Filter to find records to delete */
  filter: StudentDeleteFilter;
};

export type DeleteManyTeachersInput = {
  /** Filter to find records to delete */
  filter: TeacherDeleteFilter;
};

export type DeleteManyTutorsInput = {
  /** Filter to find records to delete */
  filter: TutorDeleteFilter;
};

export type DeleteOneActionInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneBranchInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneClassroomInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneCourseInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneCycleInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDebitInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneEnrollmentInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneFeeInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOnePolicyInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneStudentInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneTeacherInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneTutorInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type Enrollment = {
  __typename?: 'Enrollment';
  branchId: Scalars['String']['output'];
  classroomId: Scalars['String']['output'];
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  cycleId: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  details: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  state: EnrollmentState;
  studentId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type EnrollmentConnection = {
  __typename?: 'EnrollmentConnection';
  /** Array of nodes. */
  nodes: Array<Enrollment>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type EnrollmentDeleteFilter = {
  and?: InputMaybe<Array<EnrollmentDeleteFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  classroomId?: InputMaybe<StringFieldComparison>;
  courseId?: InputMaybe<StringFieldComparison>;
  cycleId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<EnrollmentDeleteFilter>>;
  studentId?: InputMaybe<StringFieldComparison>;
};

export type EnrollmentDeleteResponse = {
  __typename?: 'EnrollmentDeleteResponse';
  branchId?: Maybe<Scalars['String']['output']>;
  classroomId?: Maybe<Scalars['String']['output']>;
  courseId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  cycleId?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  state?: Maybe<EnrollmentState>;
  studentId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type EnrollmentFilter = {
  and?: InputMaybe<Array<EnrollmentFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  classroomId?: InputMaybe<StringFieldComparison>;
  courseId?: InputMaybe<StringFieldComparison>;
  cycleId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<EnrollmentFilter>>;
  studentId?: InputMaybe<StringFieldComparison>;
};

export type EnrollmentSort = {
  direction: SortDirection;
  field: EnrollmentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum EnrollmentSortFields {
  BranchId = 'branchId',
  ClassroomId = 'classroomId',
  CourseId = 'courseId',
  CycleId = 'cycleId',
  Id = 'id',
  StudentId = 'studentId'
}

export enum EnrollmentState {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Paused = 'PAUSED'
}

export type EnrollmentUpdateFilter = {
  and?: InputMaybe<Array<EnrollmentUpdateFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  classroomId?: InputMaybe<StringFieldComparison>;
  courseId?: InputMaybe<StringFieldComparison>;
  cycleId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<EnrollmentUpdateFilter>>;
  studentId?: InputMaybe<StringFieldComparison>;
};

export type Fee = {
  __typename?: 'Fee';
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  frequency: Frequency;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type FeeConnection = {
  __typename?: 'FeeConnection';
  /** Array of nodes. */
  nodes: Array<Fee>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type FeeDeleteFilter = {
  and?: InputMaybe<Array<FeeDeleteFilter>>;
  courseId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<FeeDeleteFilter>>;
};

export type FeeDeleteResponse = {
  __typename?: 'FeeDeleteResponse';
  courseId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  frequency?: Maybe<Frequency>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type FeeFilter = {
  and?: InputMaybe<Array<FeeFilter>>;
  courseId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<FeeFilter>>;
};

export type FeeSort = {
  direction: SortDirection;
  field: FeeSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FeeSortFields {
  CourseId = 'courseId',
  Id = 'id',
  Name = 'name'
}

export type FeeUpdateFilter = {
  and?: InputMaybe<Array<FeeUpdateFilter>>;
  courseId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<FeeUpdateFilter>>;
};

export enum Frequency {
  Daily = 'DAILY',
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  Single = 'SINGLE',
  Weekly = 'WEEKLY'
}

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  iLike?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  notILike?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  notLike?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyActions: Array<Action>;
  createManyBranches: Array<Branch>;
  createManyClassrooms: Array<Classroom>;
  createManyCourses: Array<Course>;
  createManyCycles: Array<Cycle>;
  createManyDebits: Array<Debit>;
  createManyEnrollments: Array<Enrollment>;
  createManyFees: Array<Fee>;
  createManyPolicies: Array<Policy>;
  createManyStudents: Array<Student>;
  createManyTeachers: Array<Teacher>;
  createManyTutors: Array<Tutor>;
  createOneAction: Action;
  createOneBranch: Branch;
  createOneClassroom: Classroom;
  createOneCourse: Course;
  createOneCycle: Cycle;
  createOneDebit: Debit;
  createOneEnrollment: Enrollment;
  createOneFee: Fee;
  createOnePolicy: Policy;
  createOneStudent: Student;
  createOneTeacher: Teacher;
  createOneTutor: Tutor;
  deleteManyActions: DeleteManyResponse;
  deleteManyBranches: DeleteManyResponse;
  deleteManyClassrooms: DeleteManyResponse;
  deleteManyCourses: DeleteManyResponse;
  deleteManyCycles: DeleteManyResponse;
  deleteManyDebits: DeleteManyResponse;
  deleteManyEnrollments: DeleteManyResponse;
  deleteManyFees: DeleteManyResponse;
  deleteManyPolicies: DeleteManyResponse;
  deleteManyStudents: DeleteManyResponse;
  deleteManyTeachers: DeleteManyResponse;
  deleteManyTutors: DeleteManyResponse;
  deleteOneAction: ActionDeleteResponse;
  deleteOneBranch: BranchDeleteResponse;
  deleteOneClassroom: ClassroomDeleteResponse;
  deleteOneCourse: CourseDeleteResponse;
  deleteOneCycle: CycleDeleteResponse;
  deleteOneDebit: DebitDeleteResponse;
  deleteOneEnrollment: EnrollmentDeleteResponse;
  deleteOneFee: FeeDeleteResponse;
  deleteOnePolicy: PolicyDeleteResponse;
  deleteOneStudent: StudentDeleteResponse;
  deleteOneTeacher: TeacherDeleteResponse;
  deleteOneTutor: TutorDeleteResponse;
  removeUser: User;
  restoreManyVideos: UpdateManyResponse;
  restoreOneVideo: Tutor;
  signIn: Session;
  signUp: Session;
  updateManyActions: UpdateManyResponse;
  updateManyBranches: UpdateManyResponse;
  updateManyClassrooms: UpdateManyResponse;
  updateManyCourses: UpdateManyResponse;
  updateManyCycles: UpdateManyResponse;
  updateManyDebits: UpdateManyResponse;
  updateManyEnrollments: UpdateManyResponse;
  updateManyFees: UpdateManyResponse;
  updateManyPolicies: UpdateManyResponse;
  updateManyStudents: UpdateManyResponse;
  updateManyTeachers: UpdateManyResponse;
  updateManyTutors: UpdateManyResponse;
  updateOneAction: Action;
  updateOneBranch: Branch;
  updateOneClassroom: Classroom;
  updateOneCourse: Course;
  updateOneCycle: Cycle;
  updateOneDebit: Debit;
  updateOneEnrollment: Enrollment;
  updateOneFee: Fee;
  updateOnePolicy: Policy;
  updateOneStudent: Student;
  updateOneTeacher: Teacher;
  updateOneTutor: Tutor;
  updateUser: User;
};


export type MutationCreateManyActionsArgs = {
  input: CreateManyActionsInput;
};


export type MutationCreateManyBranchesArgs = {
  input: CreateManyBranchesInput;
};


export type MutationCreateManyClassroomsArgs = {
  input: CreateManyClassroomsInput;
};


export type MutationCreateManyCoursesArgs = {
  input: CreateManyCoursesInput;
};


export type MutationCreateManyCyclesArgs = {
  input: CreateManyCyclesInput;
};


export type MutationCreateManyDebitsArgs = {
  input: CreateManyDebitsInput;
};


export type MutationCreateManyEnrollmentsArgs = {
  input: CreateManyEnrollmentsInput;
};


export type MutationCreateManyFeesArgs = {
  input: CreateManyFeesInput;
};


export type MutationCreateManyPoliciesArgs = {
  input: CreateManyPoliciesInput;
};


export type MutationCreateManyStudentsArgs = {
  input: CreateManyStudentsInput;
};


export type MutationCreateManyTeachersArgs = {
  input: CreateManyTeachersInput;
};


export type MutationCreateManyTutorsArgs = {
  input: CreateManyTutorsInput;
};


export type MutationCreateOneActionArgs = {
  input: CreateOneActionInput;
};


export type MutationCreateOneBranchArgs = {
  input: CreateOneBranchInput;
};


export type MutationCreateOneClassroomArgs = {
  input: CreateOneClassroomInput;
};


export type MutationCreateOneCourseArgs = {
  input: CreateOneCourseInput;
};


export type MutationCreateOneCycleArgs = {
  input: CreateOneCycleInput;
};


export type MutationCreateOneDebitArgs = {
  input: CreateOneDebitInput;
};


export type MutationCreateOneEnrollmentArgs = {
  input: CreateOneEnrollmentInput;
};


export type MutationCreateOneFeeArgs = {
  input: CreateOneFeeInput;
};


export type MutationCreateOnePolicyArgs = {
  input: CreateOnePolicyInput;
};


export type MutationCreateOneStudentArgs = {
  input: CreateOneStudentInput;
};


export type MutationCreateOneTeacherArgs = {
  input: CreateOneTeacherInput;
};


export type MutationCreateOneTutorArgs = {
  input: CreateOneTutorInput;
};


export type MutationDeleteManyActionsArgs = {
  input: DeleteManyActionsInput;
};


export type MutationDeleteManyBranchesArgs = {
  input: DeleteManyBranchesInput;
};


export type MutationDeleteManyClassroomsArgs = {
  input: DeleteManyClassroomsInput;
};


export type MutationDeleteManyCoursesArgs = {
  input: DeleteManyCoursesInput;
};


export type MutationDeleteManyCyclesArgs = {
  input: DeleteManyCyclesInput;
};


export type MutationDeleteManyDebitsArgs = {
  input: DeleteManyDebitsInput;
};


export type MutationDeleteManyEnrollmentsArgs = {
  input: DeleteManyEnrollmentsInput;
};


export type MutationDeleteManyFeesArgs = {
  input: DeleteManyFeesInput;
};


export type MutationDeleteManyPoliciesArgs = {
  input: DeleteManyPoliciesInput;
};


export type MutationDeleteManyStudentsArgs = {
  input: DeleteManyStudentsInput;
};


export type MutationDeleteManyTeachersArgs = {
  input: DeleteManyTeachersInput;
};


export type MutationDeleteManyTutorsArgs = {
  input: DeleteManyTutorsInput;
};


export type MutationDeleteOneActionArgs = {
  input: DeleteOneActionInput;
};


export type MutationDeleteOneBranchArgs = {
  input: DeleteOneBranchInput;
};


export type MutationDeleteOneClassroomArgs = {
  input: DeleteOneClassroomInput;
};


export type MutationDeleteOneCourseArgs = {
  input: DeleteOneCourseInput;
};


export type MutationDeleteOneCycleArgs = {
  input: DeleteOneCycleInput;
};


export type MutationDeleteOneDebitArgs = {
  input: DeleteOneDebitInput;
};


export type MutationDeleteOneEnrollmentArgs = {
  input: DeleteOneEnrollmentInput;
};


export type MutationDeleteOneFeeArgs = {
  input: DeleteOneFeeInput;
};


export type MutationDeleteOnePolicyArgs = {
  input: DeleteOnePolicyInput;
};


export type MutationDeleteOneStudentArgs = {
  input: DeleteOneStudentInput;
};


export type MutationDeleteOneTeacherArgs = {
  input: DeleteOneTeacherInput;
};


export type MutationDeleteOneTutorArgs = {
  input: DeleteOneTutorInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreManyVideosArgs = {
  input: TutorFilter;
};


export type MutationRestoreOneVideoArgs = {
  input: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateManyActionsArgs = {
  input: UpdateManyActionsInput;
};


export type MutationUpdateManyBranchesArgs = {
  input: UpdateManyBranchesInput;
};


export type MutationUpdateManyClassroomsArgs = {
  input: UpdateManyClassroomsInput;
};


export type MutationUpdateManyCoursesArgs = {
  input: UpdateManyCoursesInput;
};


export type MutationUpdateManyCyclesArgs = {
  input: UpdateManyCyclesInput;
};


export type MutationUpdateManyDebitsArgs = {
  input: UpdateManyDebitsInput;
};


export type MutationUpdateManyEnrollmentsArgs = {
  input: UpdateManyEnrollmentsInput;
};


export type MutationUpdateManyFeesArgs = {
  input: UpdateManyFeesInput;
};


export type MutationUpdateManyPoliciesArgs = {
  input: UpdateManyPoliciesInput;
};


export type MutationUpdateManyStudentsArgs = {
  input: UpdateManyStudentsInput;
};


export type MutationUpdateManyTeachersArgs = {
  input: UpdateManyTeachersInput;
};


export type MutationUpdateManyTutorsArgs = {
  input: UpdateManyTutorsInput;
};


export type MutationUpdateOneActionArgs = {
  input: UpdateOneActionInput;
};


export type MutationUpdateOneBranchArgs = {
  input: UpdateOneBranchInput;
};


export type MutationUpdateOneClassroomArgs = {
  input: UpdateOneClassroomInput;
};


export type MutationUpdateOneCourseArgs = {
  input: UpdateOneCourseInput;
};


export type MutationUpdateOneCycleArgs = {
  input: UpdateOneCycleInput;
};


export type MutationUpdateOneDebitArgs = {
  input: UpdateOneDebitInput;
};


export type MutationUpdateOneEnrollmentArgs = {
  input: UpdateOneEnrollmentInput;
};


export type MutationUpdateOneFeeArgs = {
  input: UpdateOneFeeInput;
};


export type MutationUpdateOnePolicyArgs = {
  input: UpdateOnePolicyInput;
};


export type MutationUpdateOneStudentArgs = {
  input: UpdateOneStudentInput;
};


export type MutationUpdateOneTeacherArgs = {
  input: UpdateOneTeacherInput;
};


export type MutationUpdateOneTutorArgs = {
  input: UpdateOneTutorInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUser;
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
};

export type OffsetPaging = {
  /** Limit the number of records returned */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Offset to start returning records from */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Policy = {
  __typename?: 'Policy';
  branchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type PolicyConnection = {
  __typename?: 'PolicyConnection';
  /** Array of nodes. */
  nodes: Array<Policy>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type PolicyDeleteFilter = {
  and?: InputMaybe<Array<PolicyDeleteFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PolicyDeleteFilter>>;
};

export type PolicyDeleteResponse = {
  __typename?: 'PolicyDeleteResponse';
  branchId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type PolicyFilter = {
  and?: InputMaybe<Array<PolicyFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PolicyFilter>>;
};

export type PolicySort = {
  direction: SortDirection;
  field: PolicySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum PolicySortFields {
  BranchId = 'branchId',
  Id = 'id',
  Name = 'name'
}

export type PolicyUpdateFilter = {
  and?: InputMaybe<Array<PolicyUpdateFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PolicyUpdateFilter>>;
};

export type Query = {
  __typename?: 'Query';
  action: Action;
  actions: ActionConnection;
  branch: Branch;
  branches: BranchConnection;
  classroom: Classroom;
  classrooms: ClassroomConnection;
  course: Course;
  courses: CourseConnection;
  cycle: Cycle;
  cycles: CycleConnection;
  debit: Debit;
  debits: DebitConnection;
  enrollment: Enrollment;
  enrollments: EnrollmentConnection;
  fee: Fee;
  fees: FeeConnection;
  policies: PolicyConnection;
  policy: Policy;
  student: Student;
  students: StudentConnection;
  teacher: Teacher;
  teachers: TeacherConnection;
  tutor: Tutor;
  tutors: TutorConnection;
};


export type QueryActionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryActionsArgs = {
  filter?: ActionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ActionSort>;
};


export type QueryBranchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBranchesArgs = {
  filter?: BranchFilter;
  paging?: OffsetPaging;
  sorting?: Array<BranchSort>;
};


export type QueryClassroomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClassroomsArgs = {
  filter?: ClassroomFilter;
  paging?: OffsetPaging;
  sorting?: Array<ClassroomSort>;
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCoursesArgs = {
  filter?: CourseFilter;
  paging?: OffsetPaging;
  sorting?: Array<CourseSort>;
};


export type QueryCycleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCyclesArgs = {
  filter?: CycleFilter;
  paging?: OffsetPaging;
  sorting?: Array<CycleSort>;
};


export type QueryDebitArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDebitsArgs = {
  filter?: DebitFilter;
  paging?: OffsetPaging;
  sorting?: Array<DebitSort>;
};


export type QueryEnrollmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEnrollmentsArgs = {
  filter?: EnrollmentFilter;
  paging?: OffsetPaging;
  sorting?: Array<EnrollmentSort>;
};


export type QueryFeeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeesArgs = {
  filter?: FeeFilter;
  paging?: OffsetPaging;
  sorting?: Array<FeeSort>;
};


export type QueryPoliciesArgs = {
  filter?: PolicyFilter;
  paging?: OffsetPaging;
  sorting?: Array<PolicySort>;
};


export type QueryPolicyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStudentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStudentsArgs = {
  filter?: StudentFilter;
  paging?: OffsetPaging;
  sorting?: Array<StudentSort>;
};


export type QueryTeacherArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTeachersArgs = {
  filter?: TeacherFilter;
  paging?: OffsetPaging;
  sorting?: Array<TeacherSort>;
};


export type QueryTutorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorsArgs = {
  filter?: TutorFilter;
  paging?: OffsetPaging;
  sorting?: Array<TutorSort>;
};

export type Session = {
  __typename?: 'Session';
  exp: Scalars['DateTime']['output'];
  iat: Scalars['DateTime']['output'];
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type SignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignUpInput = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notILike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type Student = {
  __typename?: 'Student';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  firstname: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type StudentConnection = {
  __typename?: 'StudentConnection';
  /** Array of nodes. */
  nodes: Array<Student>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type StudentDeleteFilter = {
  and?: InputMaybe<Array<StudentDeleteFilter>>;
  code?: InputMaybe<StringFieldComparison>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<StudentDeleteFilter>>;
};

export type StudentDeleteResponse = {
  __typename?: 'StudentDeleteResponse';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type StudentFilter = {
  and?: InputMaybe<Array<StudentFilter>>;
  code?: InputMaybe<StringFieldComparison>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<StudentFilter>>;
};

export type StudentSort = {
  direction: SortDirection;
  field: StudentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum StudentSortFields {
  Code = 'code',
  Fullname = 'fullname',
  Id = 'id'
}

export type StudentUpdateFilter = {
  and?: InputMaybe<Array<StudentUpdateFilter>>;
  code?: InputMaybe<StringFieldComparison>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<StudentUpdateFilter>>;
};

export type Teacher = {
  __typename?: 'Teacher';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  firstname: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
};

export type TeacherConnection = {
  __typename?: 'TeacherConnection';
  /** Array of nodes. */
  nodes: Array<Teacher>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TeacherDeleteFilter = {
  and?: InputMaybe<Array<TeacherDeleteFilter>>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TeacherDeleteFilter>>;
};

export type TeacherDeleteResponse = {
  __typename?: 'TeacherDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type TeacherFilter = {
  and?: InputMaybe<Array<TeacherFilter>>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TeacherFilter>>;
};

export type TeacherSort = {
  direction: SortDirection;
  field: TeacherSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TeacherSortFields {
  Fullname = 'fullname',
  Id = 'id'
}

export type TeacherUpdateFilter = {
  and?: InputMaybe<Array<TeacherUpdateFilter>>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TeacherUpdateFilter>>;
};

export type Tutor = {
  __typename?: 'Tutor';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  firstname: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type TutorConnection = {
  __typename?: 'TutorConnection';
  /** Array of nodes. */
  nodes: Array<Tutor>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TutorDeleteFilter = {
  and?: InputMaybe<Array<TutorDeleteFilter>>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TutorDeleteFilter>>;
};

export type TutorDeleteResponse = {
  __typename?: 'TutorDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type TutorFilter = {
  and?: InputMaybe<Array<TutorFilter>>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TutorFilter>>;
};

export type TutorSort = {
  direction: SortDirection;
  field: TutorSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TutorSortFields {
  Fullname = 'fullname',
  Id = 'id'
}

export type TutorUpdateFilter = {
  and?: InputMaybe<Array<TutorUpdateFilter>>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TutorUpdateFilter>>;
};

export type UpdateAction = {
  action?: InputMaybe<Scalars['String']['input']>;
  effect?: InputMaybe<ActionEffect>;
  policyId?: InputMaybe<Scalars['String']['input']>;
  route?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBranch = {
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClassroom = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourse = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCycle = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateDebit = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  enrollmentId?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Frequency>;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<DebitState>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateEnrollment = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  classroomId?: InputMaybe<Scalars['String']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  cycleId?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<EnrollmentState>;
  studentId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFee = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Frequency>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateManyActionsInput = {
  /** Filter used to find fields to update */
  filter: ActionUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateAction;
};

export type UpdateManyBranchesInput = {
  /** Filter used to find fields to update */
  filter: BranchUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateBranch;
};

export type UpdateManyClassroomsInput = {
  /** Filter used to find fields to update */
  filter: ClassroomUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateClassroom;
};

export type UpdateManyCoursesInput = {
  /** Filter used to find fields to update */
  filter: CourseUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateCourse;
};

export type UpdateManyCyclesInput = {
  /** Filter used to find fields to update */
  filter: CycleUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateCycle;
};

export type UpdateManyDebitsInput = {
  /** Filter used to find fields to update */
  filter: DebitUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateDebit;
};

export type UpdateManyEnrollmentsInput = {
  /** Filter used to find fields to update */
  filter: EnrollmentUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateEnrollment;
};

export type UpdateManyFeesInput = {
  /** Filter used to find fields to update */
  filter: FeeUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateFee;
};

export type UpdateManyPoliciesInput = {
  /** Filter used to find fields to update */
  filter: PolicyUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdatePolicy;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateManyStudentsInput = {
  /** Filter used to find fields to update */
  filter: StudentUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateStudent;
};

export type UpdateManyTeachersInput = {
  /** Filter used to find fields to update */
  filter: TeacherUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTeacher;
};

export type UpdateManyTutorsInput = {
  /** Filter used to find fields to update */
  filter: TutorUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTutor;
};

export type UpdateOneActionInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateAction;
};

export type UpdateOneBranchInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateBranch;
};

export type UpdateOneClassroomInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateClassroom;
};

export type UpdateOneCourseInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateCourse;
};

export type UpdateOneCycleInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateCycle;
};

export type UpdateOneDebitInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateDebit;
};

export type UpdateOneEnrollmentInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateEnrollment;
};

export type UpdateOneFeeInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateFee;
};

export type UpdateOnePolicyInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdatePolicy;
};

export type UpdateOneStudentInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateStudent;
};

export type UpdateOneTeacherInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateTeacher;
};

export type UpdateOneTutorInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateTutor;
};

export type UpdatePolicy = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStudent = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTeacher = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTutor = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUser = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  branchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type SessionPartsFragment = { __typename?: 'Session', token: string, username: string, exp: any, iat: any };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'Session', token: string, username: string, exp: any, iat: any } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Session', token: string, username: string, exp: any, iat: any } };

export type BranchPartsFragment = { __typename?: 'Branch', id: string, name: string, picture: string, createdAt: any, updatedAt: any };

export type CreateOneBranchMutationVariables = Exact<{
  branch: CreateBranch;
}>;


export type CreateOneBranchMutation = { __typename?: 'Mutation', createOneBranch: { __typename?: 'Branch', id: string, name: string, picture: string, createdAt: any, updatedAt: any } };

export type GetCompaniesPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<BranchFilter>;
}>;


export type GetCompaniesPageQuery = { __typename?: 'Query', branches: { __typename?: 'BranchConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Branch', id: string, name: string, picture: string, createdAt: any, updatedAt: any }> } };

export type UpdateOneBranchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateBranch;
}>;


export type UpdateOneBranchMutation = { __typename?: 'Mutation', updateOneBranch: { __typename?: 'Branch', id: string, name: string, picture: string, createdAt: any, updatedAt: any } };

export type DeleteOneBranchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneBranchMutation = { __typename?: 'Mutation', deleteOneBranch: { __typename?: 'BranchDeleteResponse', id?: string | null } };

export type CoursePartsFragment = { __typename?: 'Course', id: string, name: string, createdAt: any, updatedAt: any };

export type CreateOneCourseMutationVariables = Exact<{
  course: CreateCourse;
}>;


export type CreateOneCourseMutation = { __typename?: 'Mutation', createOneCourse: { __typename?: 'Course', id: string, name: string, createdAt: any, updatedAt: any } };

export type GetCoursePageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CourseFilter>;
}>;


export type GetCoursePageQuery = { __typename?: 'Query', courses: { __typename?: 'CourseConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Course', id: string, name: string, createdAt: any, updatedAt: any }> } };

export type UpdateOneCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateCourse;
}>;


export type UpdateOneCourseMutation = { __typename?: 'Mutation', updateOneCourse: { __typename?: 'Course', id: string, name: string, createdAt: any, updatedAt: any } };

export type DeleteOneCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneCourseMutation = { __typename?: 'Mutation', deleteOneCourse: { __typename?: 'CourseDeleteResponse', id?: string | null } };

export const SessionPartsFragmentDoc = gql`
    fragment SessionParts on Session {
  token
  username
  exp
  iat
}
    `;
export const BranchPartsFragmentDoc = gql`
    fragment BranchParts on Branch {
  id
  name
  picture
  createdAt
  updatedAt
}
    `;
export const CoursePartsFragmentDoc = gql`
    fragment CourseParts on Course {
  id
  name
  createdAt
  updatedAt
}
    `;
export const SignInDocument = gql`
    mutation signIn($input: SignInInput!) {
  signIn(input: $input) {
    ...SessionParts
  }
}
    ${SessionPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SignInGQL extends Apollo.Mutation<SignInMutation, SignInMutationVariables> {
    document = SignInDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SignUpDocument = gql`
    mutation signUp($input: SignUpInput!) {
  signUp(input: $input) {
    ...SessionParts
  }
}
    ${SessionPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SignUpGQL extends Apollo.Mutation<SignUpMutation, SignUpMutationVariables> {
    document = SignUpDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneBranchDocument = gql`
    mutation createOneBranch($branch: CreateBranch!) {
  createOneBranch(input: {branch: $branch}) {
    ...BranchParts
  }
}
    ${BranchPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneBranchGQL extends Apollo.Mutation<CreateOneBranchMutation, CreateOneBranchMutationVariables> {
    document = CreateOneBranchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCompaniesPageDocument = gql`
    query getCompaniesPage($offset: Int = 0, $limit: Int = 10, $filter: BranchFilter = {}) {
  branches(paging: {limit: $limit, offset: $offset}, filter: $filter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...BranchParts
    }
  }
}
    ${BranchPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCompaniesPageGQL extends Apollo.Query<GetCompaniesPageQuery, GetCompaniesPageQueryVariables> {
    document = GetCompaniesPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneBranchDocument = gql`
    mutation updateOneBranch($id: ID!, $update: UpdateBranch!) {
  updateOneBranch(input: {id: $id, update: $update}) {
    ...BranchParts
  }
}
    ${BranchPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneBranchGQL extends Apollo.Mutation<UpdateOneBranchMutation, UpdateOneBranchMutationVariables> {
    document = UpdateOneBranchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneBranchDocument = gql`
    mutation deleteOneBranch($id: ID!) {
  deleteOneBranch(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneBranchGQL extends Apollo.Mutation<DeleteOneBranchMutation, DeleteOneBranchMutationVariables> {
    document = DeleteOneBranchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneCourseDocument = gql`
    mutation createOneCourse($course: CreateCourse!) {
  createOneCourse(input: {course: $course}) {
    ...CourseParts
  }
}
    ${CoursePartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneCourseGQL extends Apollo.Mutation<CreateOneCourseMutation, CreateOneCourseMutationVariables> {
    document = CreateOneCourseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCoursePageDocument = gql`
    query getCoursePage($offset: Int = 0, $limit: Int = 10, $filter: CourseFilter = {}) {
  courses(paging: {limit: $limit, offset: $offset}, filter: $filter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...CourseParts
    }
  }
}
    ${CoursePartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCoursePageGQL extends Apollo.Query<GetCoursePageQuery, GetCoursePageQueryVariables> {
    document = GetCoursePageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneCourseDocument = gql`
    mutation updateOneCourse($id: ID!, $update: UpdateCourse!) {
  updateOneCourse(input: {id: $id, update: $update}) {
    ...CourseParts
  }
}
    ${CoursePartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneCourseGQL extends Apollo.Mutation<UpdateOneCourseMutation, UpdateOneCourseMutationVariables> {
    document = UpdateOneCourseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneCourseDocument = gql`
    mutation deleteOneCourse($id: ID!) {
  deleteOneCourse(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneCourseGQL extends Apollo.Mutation<DeleteOneCourseMutation, DeleteOneCourseMutationVariables> {
    document = DeleteOneCourseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }