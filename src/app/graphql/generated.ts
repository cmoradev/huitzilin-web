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
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ActionFilter>>;
  policyId?: InputMaybe<StringFieldComparison>;
  route?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type ActionSort = {
  direction: SortDirection;
  field: ActionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ActionSortFields {
  Action = 'action',
  CreatedAt = 'createdAt',
  Id = 'id',
  PolicyId = 'policyId',
  Route = 'route',
  UpdatedAt = 'updatedAt'
}

export type Activity = {
  __typename?: 'Activity';
  branchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isPackage: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
  withTax: Scalars['Boolean']['output'];
};

export type ActivityConnection = {
  __typename?: 'ActivityConnection';
  /** Array of nodes. */
  nodes: Array<Activity>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ActivityDeleteResponse = {
  __typename?: 'ActivityDeleteResponse';
  branchId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isPackage?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
  withTax?: Maybe<Scalars['Boolean']['output']>;
};

export type ActivityFilter = {
  and?: InputMaybe<Array<ActivityFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isPackage?: InputMaybe<BooleanFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ActivityFilter>>;
  order?: InputMaybe<NumberFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type ActivitySort = {
  direction: SortDirection;
  field: ActivitySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ActivitySortFields {
  BranchId = 'branchId',
  CreatedAt = 'createdAt',
  Id = 'id',
  IsPackage = 'isPackage',
  Name = 'name',
  Order = 'order',
  UpdatedAt = 'updatedAt'
}

export type ActivityUpdateFilter = {
  and?: InputMaybe<Array<ActivityUpdateFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isPackage?: InputMaybe<BooleanFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ActivityUpdateFilter>>;
  order?: InputMaybe<NumberFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type AddBranchsToStudentInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type AddStudentsToDocumentInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
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
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BranchFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type BranchSort = {
  direction: SortDirection;
  field: BranchSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum BranchSortFields {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type CreateAction = {
  action: Scalars['String']['input'];
  effect: ActionEffect;
  policyId: Scalars['String']['input'];
  route: Scalars['String']['input'];
};

export type CreateActivity = {
  branchId: Scalars['String']['input'];
  isPackage: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  withTax: Scalars['Boolean']['input'];
};

export type CreateBranch = {
  name: Scalars['String']['input'];
  picture: Scalars['String']['input'];
};

export type CreateCycle = {
  branchId: Scalars['String']['input'];
  end: Scalars['String']['input'];
  name: Scalars['String']['input'];
  start: Scalars['String']['input'];
};

export type CreateDebit = {
  description: Scalars['String']['input'];
  discount: Scalars['Float']['input'];
  dueDate: Scalars['String']['input'];
  enrollmentId: Scalars['String']['input'];
  frequency: Frequency;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  quantity: Scalars['Float']['input'];
  state: DebitState;
  unitPrice: Scalars['Float']['input'];
  withTax: Scalars['Boolean']['input'];
};

export type CreateDebitDiscount = {
  debitId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: DiscountBy;
  value: Scalars['Float']['input'];
};

export type CreateDiscount = {
  branchId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: DiscountBy;
  value: Scalars['Float']['input'];
};

export type CreateDocument = {
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreateEnrollment = {
  activityId: Scalars['String']['input'];
  branchId: Scalars['String']['input'];
  cycleId: Scalars['String']['input'];
  details: Scalars['String']['input'];
  isPackage: Scalars['Boolean']['input'];
  levelId: Scalars['String']['input'];
  order: Scalars['Float']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  state: EnrollmentState;
  studentId: Scalars['String']['input'];
};

export type CreateFee = {
  activityId: Scalars['String']['input'];
  frequency: Frequency;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  withTax: Scalars['Boolean']['input'];
};

export type CreateLevel = {
  abbreviation: Scalars['String']['input'];
  branchId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Float']['input'];
};

export type CreateManyDebitDiscountsInput = {
  /** Array of records to create */
  debitDiscounts: Array<CreateDebitDiscount>;
};

export type CreateManyDebitsInput = {
  /** Array of records to create */
  debits: Array<CreateDebit>;
};

export type CreateManyDiscountsInput = {
  /** Array of records to create */
  discounts: Array<CreateDiscount>;
};

export type CreateManyDocumentsInput = {
  /** Array of records to create */
  documents: Array<CreateDocument>;
};

export type CreateOneActionInput = {
  /** The record to create */
  action: CreateAction;
};

export type CreateOneActivityInput = {
  /** The record to create */
  activity: CreateActivity;
};

export type CreateOneBranchInput = {
  /** The record to create */
  branch: CreateBranch;
};

export type CreateOneCycleInput = {
  /** The record to create */
  cycle: CreateCycle;
};

export type CreateOneDebitDiscountInput = {
  /** The record to create */
  debitDiscount: CreateDebitDiscount;
};

export type CreateOneDebitInput = {
  /** The record to create */
  debit: CreateDebit;
};

export type CreateOneDiscountInput = {
  /** The record to create */
  discount: CreateDiscount;
};

export type CreateOneDocumentInput = {
  /** The record to create */
  document: CreateDocument;
};

export type CreateOneEnrollmentInput = {
  /** The record to create */
  enrollment: CreateEnrollment;
};

export type CreateOneFeeInput = {
  /** The record to create */
  fee: CreateFee;
};

export type CreateOneLevelInput = {
  /** The record to create */
  level: CreateLevel;
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
  dateBirth: Scalars['String']['input'];
  dni: Scalars['String']['input'];
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
  end: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  start: Scalars['String']['output'];
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

export type CycleDeleteResponse = {
  __typename?: 'CycleDeleteResponse';
  branchId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  end?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type CycleFilter = {
  and?: InputMaybe<Array<CycleFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CycleFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type CycleSort = {
  direction: SortDirection;
  field: CycleSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CycleSortFields {
  BranchId = 'branchId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime']['input'];
  upper: Scalars['DateTime']['input'];
};

export type Debit = {
  __typename?: 'Debit';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  discount: Scalars['Float']['output'];
  dueDate: Scalars['String']['output'];
  enrollmentId: Scalars['String']['output'];
  frequency: Frequency;
  id: Scalars['ID']['output'];
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  quantity: Scalars['Float']['output'];
  state: DebitState;
  subtotal: Scalars['Float']['output'];
  taxes: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
  withTax: Scalars['Boolean']['output'];
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

export type DebitDeleteResponse = {
  __typename?: 'DebitDeleteResponse';
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  dueDate?: Maybe<Scalars['String']['output']>;
  enrollmentId?: Maybe<Scalars['String']['output']>;
  frequency?: Maybe<Frequency>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<DebitState>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  taxes?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  unitPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
  withTax?: Maybe<Scalars['Boolean']['output']>;
};

export type DebitDiscount = {
  __typename?: 'DebitDiscount';
  createdAt: Scalars['DateTime']['output'];
  debitId: Scalars['ID']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: DiscountBy;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
  version: Scalars['Int']['output'];
};

export type DebitDiscountConnection = {
  __typename?: 'DebitDiscountConnection';
  /** Array of nodes. */
  nodes: Array<DebitDiscount>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DebitDiscountDeleteResponse = {
  __typename?: 'DebitDiscountDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  debitId?: Maybe<Scalars['ID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<DiscountBy>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type DebitDiscountFilter = {
  and?: InputMaybe<Array<DebitDiscountFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  debitId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DebitDiscountFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type DebitDiscountSort = {
  direction: SortDirection;
  field: DebitDiscountSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DebitDiscountSortFields {
  CreatedAt = 'createdAt',
  DebitId = 'debitId',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type DebitFilter = {
  and?: InputMaybe<Array<DebitFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  dueDate?: InputMaybe<StringFieldComparison>;
  enrollmentId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DebitFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type DebitSort = {
  direction: SortDirection;
  field: DebitSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DebitSortFields {
  CreatedAt = 'createdAt',
  Description = 'description',
  DueDate = 'dueDate',
  EnrollmentId = 'enrollmentId',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export enum DebitState {
  Canceled = 'CANCELED',
  Condoned = 'CONDONED',
  Debt = 'DEBT',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID'
}

export type DeleteOneActionInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneActivityInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneBranchInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneCycleInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDebitDiscountInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDebitInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDiscountInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDocumentInput = {
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

export type DeleteOneLevelInput = {
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

export type Discount = {
  __typename?: 'Discount';
  branchId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: DiscountBy;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
  version: Scalars['Int']['output'];
};

export enum DiscountBy {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

export type DiscountConnection = {
  __typename?: 'DiscountConnection';
  /** Array of nodes. */
  nodes: Array<Discount>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DiscountDeleteResponse = {
  __typename?: 'DiscountDeleteResponse';
  branchId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<DiscountBy>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type DiscountFilter = {
  and?: InputMaybe<Array<DiscountFilter>>;
  branchId?: InputMaybe<IdFilterComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DiscountFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type DiscountSort = {
  direction: SortDirection;
  field: DiscountSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DiscountSortFields {
  BranchId = 'branchId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type Document = {
  __typename?: 'Document';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  students: Array<Student>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};


export type DocumentStudentsArgs = {
  filter?: StudentFilter;
  sorting?: Array<StudentSort>;
};

export type DocumentConnection = {
  __typename?: 'DocumentConnection';
  /** Array of nodes. */
  nodes: Array<Document>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DocumentDeleteResponse = {
  __typename?: 'DocumentDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type DocumentFilter = {
  and?: InputMaybe<Array<DocumentFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  key?: InputMaybe<StringFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DocumentFilter>>;
  students?: InputMaybe<DocumentFilterStudentFilter>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type DocumentFilterStudentFilter = {
  and?: InputMaybe<Array<DocumentFilterStudentFilter>>;
  code?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  dni?: InputMaybe<StringFieldComparison>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DocumentFilterStudentFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type DocumentSort = {
  direction: SortDirection;
  field: DocumentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DocumentSortFields {
  CreatedAt = 'createdAt',
  Id = 'id',
  Key = 'key',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type Enrollment = {
  __typename?: 'Enrollment';
  activity: Activity;
  activityId: Scalars['ID']['output'];
  branch: Branch;
  branchId: Scalars['ID']['output'];
  children: EnrollmentChildrenConnection;
  createdAt: Scalars['DateTime']['output'];
  cycle: Cycle;
  cycleId: Scalars['ID']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  details: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPackage: Scalars['Boolean']['output'];
  level: Level;
  levelId: Scalars['ID']['output'];
  order: Scalars['Float']['output'];
  parent?: Maybe<Enrollment>;
  parentId?: Maybe<Scalars['ID']['output']>;
  state: EnrollmentState;
  student: Student;
  studentId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};


export type EnrollmentChildrenArgs = {
  filter?: EnrollmentFilter;
  paging?: OffsetPaging;
  sorting?: Array<EnrollmentSort>;
};

export type EnrollmentChildrenConnection = {
  __typename?: 'EnrollmentChildrenConnection';
  /** Array of nodes. */
  nodes: Array<Enrollment>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
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

export type EnrollmentDeleteResponse = {
  __typename?: 'EnrollmentDeleteResponse';
  activityId?: Maybe<Scalars['ID']['output']>;
  branchId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  cycleId?: Maybe<Scalars['ID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isPackage?: Maybe<Scalars['Boolean']['output']>;
  levelId?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  parentId?: Maybe<Scalars['ID']['output']>;
  state?: Maybe<EnrollmentState>;
  studentId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type EnrollmentFilter = {
  activityId?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<EnrollmentFilter>>;
  branchId?: InputMaybe<IdFilterComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  cycleId?: InputMaybe<IdFilterComparison>;
  details?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isPackage?: InputMaybe<BooleanFieldComparison>;
  levelId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<EnrollmentFilter>>;
  order?: InputMaybe<NumberFieldComparison>;
  parentId?: InputMaybe<IdFilterComparison>;
  studentId?: InputMaybe<IdFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type EnrollmentSort = {
  direction: SortDirection;
  field: EnrollmentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum EnrollmentSortFields {
  ActivityId = 'activityId',
  BranchId = 'branchId',
  CreatedAt = 'createdAt',
  CycleId = 'cycleId',
  Details = 'details',
  Id = 'id',
  IsPackage = 'isPackage',
  LevelId = 'levelId',
  Order = 'order',
  ParentId = 'parentId',
  StudentId = 'studentId',
  UpdatedAt = 'updatedAt'
}

export enum EnrollmentState {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Paused = 'PAUSED'
}

export type Fee = {
  __typename?: 'Fee';
  activityId: Scalars['String']['output'];
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  frequency: Frequency;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  taxes: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
  withTax: Scalars['Boolean']['output'];
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

export type FeeDeleteResponse = {
  __typename?: 'FeeDeleteResponse';
  activityId?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  frequency?: Maybe<Frequency>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  taxes?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
  withTax?: Maybe<Scalars['Boolean']['output']>;
};

export type FeeFilter = {
  activityId?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<FeeFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<FeeFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type FeeSort = {
  direction: SortDirection;
  field: FeeSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FeeSortFields {
  ActivityId = 'activityId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

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

export type IntFieldComparison = {
  between?: InputMaybe<IntFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  notBetween?: InputMaybe<IntFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntFieldComparisonBetween = {
  lower: Scalars['Int']['input'];
  upper: Scalars['Int']['input'];
};

export type Level = {
  __typename?: 'Level';
  abbreviation: Scalars['String']['output'];
  branchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type LevelConnection = {
  __typename?: 'LevelConnection';
  /** Array of nodes. */
  nodes: Array<Level>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type LevelDeleteResponse = {
  __typename?: 'LevelDeleteResponse';
  abbreviation?: Maybe<Scalars['String']['output']>;
  branchId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type LevelFilter = {
  abbreviation?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<LevelFilter>>;
  branchId?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<LevelFilter>>;
  order?: InputMaybe<IntFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type LevelSort = {
  direction: SortDirection;
  field: LevelSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum LevelSortFields {
  Abbreviation = 'abbreviation',
  BranchId = 'branchId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  Order = 'order',
  UpdatedAt = 'updatedAt'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBranchsToStudent: Student;
  addStudentsToDocument: Document;
  createManyDebitDiscounts: Array<DebitDiscount>;
  createManyDebits: Array<Debit>;
  createManyDiscounts: Array<Discount>;
  createManyDocuments: Array<Document>;
  createOneAction: Action;
  createOneActivity: Activity;
  createOneBranch: Branch;
  createOneCycle: Cycle;
  createOneDebit: Debit;
  createOneDebitDiscount: DebitDiscount;
  createOneDiscount: Discount;
  createOneDocument: Document;
  createOneEnrollment: Enrollment;
  createOneFee: Fee;
  createOneLevel: Level;
  createOnePolicy: Policy;
  createOneStudent: Student;
  createOneTeacher: Teacher;
  createOneTutor: Tutor;
  deleteOneAction: ActionDeleteResponse;
  deleteOneActivity: ActivityDeleteResponse;
  deleteOneBranch: BranchDeleteResponse;
  deleteOneCycle: CycleDeleteResponse;
  deleteOneDebit: DebitDeleteResponse;
  deleteOneDebitDiscount: DebitDiscountDeleteResponse;
  deleteOneDiscount: DiscountDeleteResponse;
  deleteOneDocument: DocumentDeleteResponse;
  deleteOneEnrollment: EnrollmentDeleteResponse;
  deleteOneFee: FeeDeleteResponse;
  deleteOneLevel: LevelDeleteResponse;
  deleteOnePolicy: PolicyDeleteResponse;
  deleteOneStudent: StudentDeleteResponse;
  deleteOneTeacher: TeacherDeleteResponse;
  deleteOneTutor: TutorDeleteResponse;
  removeBranchsFromStudent: Student;
  removeStudentsFromDocument: Document;
  restoreManyActivities: UpdateManyResponse;
  restoreManyVideos: UpdateManyResponse;
  restoreOneActivity: Activity;
  restoreOneVideo: Discount;
  setBranchsOnStudent: Student;
  setOrderActivities: UpdateCount;
  setOrderEnrollments: UpdateCount;
  setOrderLevels: UpdateCount;
  setStudentsOnDocument: Document;
  signIn: Session;
  signUp: Session;
  updateManyActivities: UpdateManyResponse;
  updateOneAction: Action;
  updateOneActivity: Activity;
  updateOneBranch: Branch;
  updateOneCycle: Cycle;
  updateOneDebit: Debit;
  updateOneDebitDiscount: DebitDiscount;
  updateOneDiscount: Discount;
  updateOneDocument: Document;
  updateOneEnrollment: Enrollment;
  updateOneFee: Fee;
  updateOneLevel: Level;
  updateOnePolicy: Policy;
  updateOneStudent: Student;
  updateOneTeacher: Teacher;
  updateOneTutor: Tutor;
  updateOneUser: User;
};


export type MutationAddBranchsToStudentArgs = {
  input: AddBranchsToStudentInput;
};


export type MutationAddStudentsToDocumentArgs = {
  input: AddStudentsToDocumentInput;
};


export type MutationCreateManyDebitDiscountsArgs = {
  input: CreateManyDebitDiscountsInput;
};


export type MutationCreateManyDebitsArgs = {
  input: CreateManyDebitsInput;
};


export type MutationCreateManyDiscountsArgs = {
  input: CreateManyDiscountsInput;
};


export type MutationCreateManyDocumentsArgs = {
  input: CreateManyDocumentsInput;
};


export type MutationCreateOneActionArgs = {
  input: CreateOneActionInput;
};


export type MutationCreateOneActivityArgs = {
  input: CreateOneActivityInput;
};


export type MutationCreateOneBranchArgs = {
  input: CreateOneBranchInput;
};


export type MutationCreateOneCycleArgs = {
  input: CreateOneCycleInput;
};


export type MutationCreateOneDebitArgs = {
  input: CreateOneDebitInput;
};


export type MutationCreateOneDebitDiscountArgs = {
  input: CreateOneDebitDiscountInput;
};


export type MutationCreateOneDiscountArgs = {
  input: CreateOneDiscountInput;
};


export type MutationCreateOneDocumentArgs = {
  input: CreateOneDocumentInput;
};


export type MutationCreateOneEnrollmentArgs = {
  input: CreateOneEnrollmentInput;
};


export type MutationCreateOneFeeArgs = {
  input: CreateOneFeeInput;
};


export type MutationCreateOneLevelArgs = {
  input: CreateOneLevelInput;
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


export type MutationDeleteOneActionArgs = {
  input: DeleteOneActionInput;
};


export type MutationDeleteOneActivityArgs = {
  input: DeleteOneActivityInput;
};


export type MutationDeleteOneBranchArgs = {
  input: DeleteOneBranchInput;
};


export type MutationDeleteOneCycleArgs = {
  input: DeleteOneCycleInput;
};


export type MutationDeleteOneDebitArgs = {
  input: DeleteOneDebitInput;
};


export type MutationDeleteOneDebitDiscountArgs = {
  input: DeleteOneDebitDiscountInput;
};


export type MutationDeleteOneDiscountArgs = {
  input: DeleteOneDiscountInput;
};


export type MutationDeleteOneDocumentArgs = {
  input: DeleteOneDocumentInput;
};


export type MutationDeleteOneEnrollmentArgs = {
  input: DeleteOneEnrollmentInput;
};


export type MutationDeleteOneFeeArgs = {
  input: DeleteOneFeeInput;
};


export type MutationDeleteOneLevelArgs = {
  input: DeleteOneLevelInput;
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


export type MutationRemoveBranchsFromStudentArgs = {
  input: RemoveBranchsFromStudentInput;
};


export type MutationRemoveStudentsFromDocumentArgs = {
  input: RemoveStudentsFromDocumentInput;
};


export type MutationRestoreManyActivitiesArgs = {
  input: ActivityFilter;
};


export type MutationRestoreManyVideosArgs = {
  input: DiscountFilter;
};


export type MutationRestoreOneActivityArgs = {
  input: Scalars['ID']['input'];
};


export type MutationRestoreOneVideoArgs = {
  input: Scalars['ID']['input'];
};


export type MutationSetBranchsOnStudentArgs = {
  input: SetBranchsOnStudentInput;
};


export type MutationSetOrderActivitiesArgs = {
  input: Array<SetOrderInput>;
};


export type MutationSetOrderEnrollmentsArgs = {
  input: Array<SetOrderInput>;
};


export type MutationSetOrderLevelsArgs = {
  input: Array<SetOrderInput>;
};


export type MutationSetStudentsOnDocumentArgs = {
  input: SetStudentsOnDocumentInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateManyActivitiesArgs = {
  input: UpdateManyActivitiesInput;
};


export type MutationUpdateOneActionArgs = {
  input: UpdateOneActionInput;
};


export type MutationUpdateOneActivityArgs = {
  input: UpdateOneActivityInput;
};


export type MutationUpdateOneBranchArgs = {
  input: UpdateOneBranchInput;
};


export type MutationUpdateOneCycleArgs = {
  input: UpdateOneCycleInput;
};


export type MutationUpdateOneDebitArgs = {
  input: UpdateOneDebitInput;
};


export type MutationUpdateOneDebitDiscountArgs = {
  input: UpdateOneDebitDiscountInput;
};


export type MutationUpdateOneDiscountArgs = {
  input: UpdateOneDiscountInput;
};


export type MutationUpdateOneDocumentArgs = {
  input: UpdateOneDocumentInput;
};


export type MutationUpdateOneEnrollmentArgs = {
  input: UpdateOneEnrollmentInput;
};


export type MutationUpdateOneFeeArgs = {
  input: UpdateOneFeeInput;
};


export type MutationUpdateOneLevelArgs = {
  input: UpdateOneLevelInput;
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


export type MutationUpdateOneUserArgs = {
  id: Scalars['ID']['input'];
  update: UpdateUser;
};

export type NumberFieldComparison = {
  between?: InputMaybe<NumberFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  notBetween?: InputMaybe<NumberFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NumberFieldComparisonBetween = {
  lower: Scalars['Float']['input'];
  upper: Scalars['Float']['input'];
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
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PolicyFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type PolicySort = {
  direction: SortDirection;
  field: PolicySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum PolicySortFields {
  BranchId = 'branchId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type Query = {
  __typename?: 'Query';
  action: Action;
  actions: ActionConnection;
  activities: ActivityConnection;
  activity: Activity;
  branch: Branch;
  branches: BranchConnection;
  cycle: Cycle;
  cycles: CycleConnection;
  debit: Debit;
  debitDiscount: DebitDiscount;
  debitDiscounts: DebitDiscountConnection;
  debits: DebitConnection;
  discount: Discount;
  discounts: DiscountConnection;
  document: Document;
  documents: DocumentConnection;
  enrollment: Enrollment;
  enrollments: EnrollmentConnection;
  fee: Fee;
  fees: FeeConnection;
  level: Level;
  levels: LevelConnection;
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


export type QueryActivitiesArgs = {
  filter?: ActivityFilter;
  paging?: OffsetPaging;
  sorting?: Array<ActivitySort>;
};


export type QueryActivityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBranchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBranchesArgs = {
  filter?: BranchFilter;
  paging?: OffsetPaging;
  sorting?: Array<BranchSort>;
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


export type QueryDebitDiscountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDebitDiscountsArgs = {
  filter?: DebitDiscountFilter;
  paging?: OffsetPaging;
  sorting?: Array<DebitDiscountSort>;
};


export type QueryDebitsArgs = {
  filter?: DebitFilter;
  paging?: OffsetPaging;
  sorting?: Array<DebitSort>;
};


export type QueryDiscountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDiscountsArgs = {
  filter?: DiscountFilter;
  paging?: OffsetPaging;
  sorting?: Array<DiscountSort>;
};


export type QueryDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDocumentsArgs = {
  filter?: DocumentFilter;
  paging?: OffsetPaging;
  sorting?: Array<DocumentSort>;
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


export type QueryLevelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLevelsArgs = {
  filter?: LevelFilter;
  paging?: OffsetPaging;
  sorting?: Array<LevelSort>;
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

export type RemoveBranchsFromStudentInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type RemoveStudentsFromDocumentInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type Session = {
  __typename?: 'Session';
  branch?: Maybe<Branch>;
  cycle?: Maybe<Cycle>;
  exp: Scalars['DateTime']['output'];
  iat: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type SetBranchsOnStudentInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type SetOrderInput = {
  id: Scalars['ID']['input'];
  order: Scalars['Float']['input'];
};

export type SetStudentsOnDocumentInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type SignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignUpInput = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  cycleId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
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
  branchs: Array<Branch>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  dateBirth: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  dni: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
};


export type StudentBranchsArgs = {
  filter?: BranchFilter;
  sorting?: Array<BranchSort>;
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

export type StudentDeleteResponse = {
  __typename?: 'StudentDeleteResponse';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateBirth?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  dni?: Maybe<Scalars['String']['output']>;
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
  branchs?: InputMaybe<StudentFilterBranchFilter>;
  code?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  dni?: InputMaybe<StringFieldComparison>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<StudentFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type StudentFilterBranchFilter = {
  and?: InputMaybe<Array<StudentFilterBranchFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<StudentFilterBranchFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type StudentSort = {
  direction: SortDirection;
  field: StudentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum StudentSortFields {
  Code = 'code',
  CreatedAt = 'createdAt',
  Dni = 'dni',
  Fullname = 'fullname',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

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
  createdAt?: InputMaybe<DateFieldComparison>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TeacherFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type TeacherSort = {
  direction: SortDirection;
  field: TeacherSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TeacherSortFields {
  CreatedAt = 'createdAt',
  Fullname = 'fullname',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

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
  createdAt?: InputMaybe<DateFieldComparison>;
  fullname?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TutorFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type TutorSort = {
  direction: SortDirection;
  field: TutorSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TutorSortFields {
  CreatedAt = 'createdAt',
  Fullname = 'fullname',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type UpdateAction = {
  action?: InputMaybe<Scalars['String']['input']>;
  effect?: InputMaybe<ActionEffect>;
  policyId?: InputMaybe<Scalars['String']['input']>;
  route?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateActivity = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  isPackage?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  withTax?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateBranch = {
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCount = {
  __typename?: 'UpdateCount';
  updatedCount?: Maybe<Scalars['Int']['output']>;
};

export type UpdateCycle = {
  branchId?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDebit = {
  description?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  enrollmentId?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Frequency>;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<DebitState>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  withTax?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateDebitDiscount = {
  debitId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<DiscountBy>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateDiscount = {
  branchId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<DiscountBy>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateDocument = {
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEnrollment = {
  activityId?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['String']['input']>;
  cycleId?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  isPackage?: InputMaybe<Scalars['Boolean']['input']>;
  levelId?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  state?: InputMaybe<EnrollmentState>;
  studentId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFee = {
  activityId?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Frequency>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  withTax?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateLevel = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateManyActivitiesInput = {
  /** Filter used to find fields to update */
  filter: ActivityUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateActivity;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateOneActionInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateAction;
};

export type UpdateOneActivityInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateActivity;
};

export type UpdateOneBranchInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateBranch;
};

export type UpdateOneCycleInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateCycle;
};

export type UpdateOneDebitDiscountInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateDebitDiscount;
};

export type UpdateOneDebitInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateDebit;
};

export type UpdateOneDiscountInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateDiscount;
};

export type UpdateOneDocumentInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateDocument;
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

export type UpdateOneLevelInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateLevel;
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
  dateBirth?: InputMaybe<Scalars['String']['input']>;
  dni?: InputMaybe<Scalars['String']['input']>;
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
  cycleId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  branchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type SessionPartsFragment = { __typename?: 'Session', id: string, token: string, username: string, exp: any, iat: any, branch?: { __typename?: 'Branch', id: string, picture: string, name: string } | null, cycle?: { __typename?: 'Cycle', id: string, name: string, start: string, end: string } | null };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'Session', id: string, token: string, username: string, exp: any, iat: any, branch?: { __typename?: 'Branch', id: string, picture: string, name: string } | null, cycle?: { __typename?: 'Cycle', id: string, name: string, start: string, end: string } | null } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Session', id: string, token: string, username: string, exp: any, iat: any, branch?: { __typename?: 'Branch', id: string, picture: string, name: string } | null, cycle?: { __typename?: 'Cycle', id: string, name: string, start: string, end: string } | null } };

export type UpdateOneUserMutationVariables = Exact<{
  update: UpdateUser;
  id: Scalars['ID']['input'];
}>;


export type UpdateOneUserMutation = { __typename?: 'Mutation', updateOneUser: { __typename?: 'User', id: string } };

export type BranchPartsFragment = { __typename?: 'Branch', id: string, name: string, picture: string };

export type CreateOneBranchMutationVariables = Exact<{
  branch: CreateBranch;
}>;


export type CreateOneBranchMutation = { __typename?: 'Mutation', createOneBranch: { __typename?: 'Branch', id: string, name: string, picture: string } };

export type GetCompaniesPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<BranchFilter>;
}>;


export type GetCompaniesPageQuery = { __typename?: 'Query', branches: { __typename?: 'BranchConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Branch', id: string, name: string, picture: string }> } };

export type UpdateOneBranchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateBranch;
}>;


export type UpdateOneBranchMutation = { __typename?: 'Mutation', updateOneBranch: { __typename?: 'Branch', id: string, name: string, picture: string } };

export type DeleteOneBranchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneBranchMutation = { __typename?: 'Mutation', deleteOneBranch: { __typename?: 'BranchDeleteResponse', id?: string | null } };

export type ActivityPartsFragment = { __typename?: 'Activity', id: string, name: string, quantity: number, isPackage: boolean, withTax: boolean, order: number };

export type CreateOneActivityMutationVariables = Exact<{
  activity: CreateActivity;
}>;


export type CreateOneActivityMutation = { __typename?: 'Mutation', createOneActivity: { __typename?: 'Activity', id: string, name: string, quantity: number, isPackage: boolean, withTax: boolean, order: number } };

export type GetActivityPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ActivityFilter>;
}>;


export type GetActivityPageQuery = { __typename?: 'Query', activities: { __typename?: 'ActivityConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Activity', id: string, name: string, quantity: number, isPackage: boolean, withTax: boolean, order: number }> } };

export type UpdateOneActivityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateActivity;
}>;


export type UpdateOneActivityMutation = { __typename?: 'Mutation', updateOneActivity: { __typename?: 'Activity', id: string, name: string, quantity: number, isPackage: boolean, withTax: boolean, order: number } };

export type DeleteOneActivityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneActivityMutation = { __typename?: 'Mutation', deleteOneActivity: { __typename?: 'ActivityDeleteResponse', id?: string | null } };

export type SetOrderActivitiesMutationVariables = Exact<{
  payload: Array<SetOrderInput> | SetOrderInput;
}>;


export type SetOrderActivitiesMutation = { __typename?: 'Mutation', setOrderActivities: { __typename?: 'UpdateCount', updatedCount?: number | null } };

export type CyclePartsFragment = { __typename?: 'Cycle', id: string, name: string, start: string, end: string };

export type CreateOneCycleMutationVariables = Exact<{
  cycle: CreateCycle;
}>;


export type CreateOneCycleMutation = { __typename?: 'Mutation', createOneCycle: { __typename?: 'Cycle', id: string, name: string, start: string, end: string } };

export type GetCyclesPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CycleFilter>;
}>;


export type GetCyclesPageQuery = { __typename?: 'Query', cycles: { __typename?: 'CycleConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Cycle', id: string, name: string, start: string, end: string }> } };

export type UpdateOneCycleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateCycle;
}>;


export type UpdateOneCycleMutation = { __typename?: 'Mutation', updateOneCycle: { __typename?: 'Cycle', id: string, name: string, start: string, end: string } };

export type DeleteOneCycleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneCycleMutation = { __typename?: 'Mutation', deleteOneCycle: { __typename?: 'CycleDeleteResponse', id?: string | null } };

export type DebitPartsFragment = { __typename?: 'Debit', id: string, description: string, unitPrice: number, quantity: number, amount: number, discount: number, subtotal: number, taxes: number, total: number, withTax: boolean, state: DebitState, frequency: Frequency, dueDate: string, paymentDate?: any | null };

export type CreateOneDebitMutationVariables = Exact<{
  debit: CreateDebit;
}>;


export type CreateOneDebitMutation = { __typename?: 'Mutation', createOneDebit: { __typename?: 'Debit', id: string, description: string, unitPrice: number, quantity: number, amount: number, discount: number, subtotal: number, taxes: number, total: number, withTax: boolean, state: DebitState, frequency: Frequency, dueDate: string, paymentDate?: any | null } };

export type GetDebitsPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<DebitFilter>;
}>;


export type GetDebitsPageQuery = { __typename?: 'Query', debits: { __typename?: 'DebitConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Debit', id: string, description: string, unitPrice: number, quantity: number, amount: number, discount: number, subtotal: number, taxes: number, total: number, withTax: boolean, state: DebitState, frequency: Frequency, dueDate: string, paymentDate?: any | null }> } };

export type UpdateOneDebitMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateDebit;
}>;


export type UpdateOneDebitMutation = { __typename?: 'Mutation', updateOneDebit: { __typename?: 'Debit', id: string, description: string, unitPrice: number, quantity: number, amount: number, discount: number, subtotal: number, taxes: number, total: number, withTax: boolean, state: DebitState, frequency: Frequency, dueDate: string, paymentDate?: any | null } };

export type CreateManyDebitsMutationVariables = Exact<{
  debits: Array<CreateDebit> | CreateDebit;
}>;


export type CreateManyDebitsMutation = { __typename?: 'Mutation', createManyDebits: Array<{ __typename?: 'Debit', id: string, description: string, unitPrice: number, quantity: number, amount: number, discount: number, subtotal: number, taxes: number, total: number, withTax: boolean, state: DebitState, frequency: Frequency, dueDate: string, paymentDate?: any | null }> };

export type DeleteOneDebitMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneDebitMutation = { __typename?: 'Mutation', deleteOneDebit: { __typename?: 'DebitDeleteResponse', id?: string | null } };

export type DiscountPartsFragment = { __typename?: 'Discount', id: string, name: string, value: number, type: DiscountBy };

export type CreateOneDiscountMutationVariables = Exact<{
  discount: CreateDiscount;
}>;


export type CreateOneDiscountMutation = { __typename?: 'Mutation', createOneDiscount: { __typename?: 'Discount', id: string, name: string, value: number, type: DiscountBy } };

export type GetDiscountsPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<DiscountFilter>;
}>;


export type GetDiscountsPageQuery = { __typename?: 'Query', discounts: { __typename?: 'DiscountConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Discount', id: string, name: string, value: number, type: DiscountBy }> } };

export type UpdateOneDiscountMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateDiscount;
}>;


export type UpdateOneDiscountMutation = { __typename?: 'Mutation', updateOneDiscount: { __typename?: 'Discount', id: string, name: string, value: number, type: DiscountBy } };

export type DeleteOneDiscountMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneDiscountMutation = { __typename?: 'Mutation', deleteOneDiscount: { __typename?: 'DiscountDeleteResponse', id?: string | null } };

export type EnrollmentPartsFragment = { __typename?: 'Enrollment', id: string, details: string, state: EnrollmentState, isPackage: boolean, parentId?: string | null, activity: { __typename?: 'Activity', id: string, name: string, isPackage: boolean, quantity: number }, cycle: { __typename?: 'Cycle', id: string, name: string }, student: { __typename?: 'Student', id: string, picture: string, fullname: string, code: string }, level: { __typename?: 'Level', id: string, name: string, abbreviation: string }, children: { __typename?: 'EnrollmentChildrenConnection', totalCount: number } };

export type CreateOneEnrollmentMutationVariables = Exact<{
  enrollment: CreateEnrollment;
}>;


export type CreateOneEnrollmentMutation = { __typename?: 'Mutation', createOneEnrollment: { __typename?: 'Enrollment', id: string, details: string, state: EnrollmentState, isPackage: boolean, parentId?: string | null, activity: { __typename?: 'Activity', id: string, name: string, isPackage: boolean, quantity: number }, cycle: { __typename?: 'Cycle', id: string, name: string }, student: { __typename?: 'Student', id: string, picture: string, fullname: string, code: string }, level: { __typename?: 'Level', id: string, name: string, abbreviation: string }, children: { __typename?: 'EnrollmentChildrenConnection', totalCount: number } } };

export type GetEnrollmentsPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<EnrollmentFilter>;
}>;


export type GetEnrollmentsPageQuery = { __typename?: 'Query', enrollments: { __typename?: 'EnrollmentConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Enrollment', id: string, details: string, state: EnrollmentState, isPackage: boolean, parentId?: string | null, activity: { __typename?: 'Activity', id: string, name: string, isPackage: boolean, quantity: number }, cycle: { __typename?: 'Cycle', id: string, name: string }, student: { __typename?: 'Student', id: string, picture: string, fullname: string, code: string }, level: { __typename?: 'Level', id: string, name: string, abbreviation: string }, children: { __typename?: 'EnrollmentChildrenConnection', totalCount: number } }> } };

export type UpdateOneEnrollmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateEnrollment;
}>;


export type UpdateOneEnrollmentMutation = { __typename?: 'Mutation', updateOneEnrollment: { __typename?: 'Enrollment', id: string, details: string, state: EnrollmentState, isPackage: boolean, parentId?: string | null, activity: { __typename?: 'Activity', id: string, name: string, isPackage: boolean, quantity: number }, cycle: { __typename?: 'Cycle', id: string, name: string }, student: { __typename?: 'Student', id: string, picture: string, fullname: string, code: string }, level: { __typename?: 'Level', id: string, name: string, abbreviation: string }, children: { __typename?: 'EnrollmentChildrenConnection', totalCount: number } } };

export type DeleteOneEnrollmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneEnrollmentMutation = { __typename?: 'Mutation', deleteOneEnrollment: { __typename?: 'EnrollmentDeleteResponse', id?: string | null } };

export type SetOrderEnrollmentsMutationVariables = Exact<{
  payload: Array<SetOrderInput> | SetOrderInput;
}>;


export type SetOrderEnrollmentsMutation = { __typename?: 'Mutation', setOrderEnrollments: { __typename?: 'UpdateCount', updatedCount?: number | null } };

export type FeePartsFragment = { __typename?: 'Fee', id: string, name: string, price: number, amount: number, frequency: Frequency, withTax: boolean };

export type CreateOneFeeMutationVariables = Exact<{
  fee: CreateFee;
}>;


export type CreateOneFeeMutation = { __typename?: 'Mutation', createOneFee: { __typename?: 'Fee', id: string, name: string, price: number, amount: number, frequency: Frequency, withTax: boolean } };

export type GetFeePageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<FeeFilter>;
}>;


export type GetFeePageQuery = { __typename?: 'Query', fees: { __typename?: 'FeeConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Fee', id: string, name: string, price: number, amount: number, frequency: Frequency, withTax: boolean }> } };

export type UpdateOneFeeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateFee;
}>;


export type UpdateOneFeeMutation = { __typename?: 'Mutation', updateOneFee: { __typename?: 'Fee', id: string, name: string, price: number, amount: number, frequency: Frequency, withTax: boolean } };

export type DeleteOneFeeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneFeeMutation = { __typename?: 'Mutation', deleteOneFee: { __typename?: 'FeeDeleteResponse', id?: string | null } };

export type LevelPartsFragment = { __typename?: 'Level', id: string, name: string, abbreviation: string, order: number };

export type CreateOneLevelMutationVariables = Exact<{
  level: CreateLevel;
}>;


export type CreateOneLevelMutation = { __typename?: 'Mutation', createOneLevel: { __typename?: 'Level', id: string, name: string, abbreviation: string, order: number } };

export type GetLevelsPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<LevelFilter>;
}>;


export type GetLevelsPageQuery = { __typename?: 'Query', levels: { __typename?: 'LevelConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Level', id: string, name: string, abbreviation: string, order: number }> } };

export type UpdateOneLevelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateLevel;
}>;


export type UpdateOneLevelMutation = { __typename?: 'Mutation', updateOneLevel: { __typename?: 'Level', id: string, name: string, abbreviation: string, order: number } };

export type DeleteOneLevelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneLevelMutation = { __typename?: 'Mutation', deleteOneLevel: { __typename?: 'LevelDeleteResponse', id?: string | null } };

export type SetOrderLevelsMutationVariables = Exact<{
  payload: Array<SetOrderInput> | SetOrderInput;
}>;


export type SetOrderLevelsMutation = { __typename?: 'Mutation', setOrderLevels: { __typename?: 'UpdateCount', updatedCount?: number | null } };

export type StudentPartsFragment = { __typename?: 'Student', id: string, code: string, picture: string, fullname: string, firstname: string, lastname: string, dateBirth: string, dni: string };

export type CreateOneStudentMutationVariables = Exact<{
  student: CreateStudent;
}>;


export type CreateOneStudentMutation = { __typename?: 'Mutation', createOneStudent: { __typename?: 'Student', id: string, code: string, picture: string, fullname: string, firstname: string, lastname: string, dateBirth: string, dni: string } };

export type GetStudentsPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<StudentFilter>;
}>;


export type GetStudentsPageQuery = { __typename?: 'Query', students: { __typename?: 'StudentConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Student', id: string, code: string, picture: string, fullname: string, firstname: string, lastname: string, dateBirth: string, dni: string }> } };

export type FetchStudentQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<StudentFilter>;
}>;


export type FetchStudentQuery = { __typename?: 'Query', students: { __typename?: 'StudentConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Student', id: string, code: string, picture: string, fullname: string, firstname: string, lastname: string, dateBirth: string, dni: string }> } };

export type UpdateOneStudentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateStudent;
}>;


export type UpdateOneStudentMutation = { __typename?: 'Mutation', updateOneStudent: { __typename?: 'Student', id: string, code: string, picture: string, fullname: string, firstname: string, lastname: string, dateBirth: string, dni: string } };

export type DeleteOneStudentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneStudentMutation = { __typename?: 'Mutation', deleteOneStudent: { __typename?: 'StudentDeleteResponse', id?: string | null } };

export type AddBranchsToStudentMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  branchIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AddBranchsToStudentMutation = { __typename?: 'Mutation', addBranchsToStudent: { __typename?: 'Student', id: string, code: string, picture: string, fullname: string, firstname: string, lastname: string, dateBirth: string, dni: string } };

export type RemoveBranchsFromStudentMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  branchIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveBranchsFromStudentMutation = { __typename?: 'Mutation', removeBranchsFromStudent: { __typename?: 'Student', id: string, code: string, picture: string, fullname: string, firstname: string, lastname: string, dateBirth: string, dni: string } };

export type DocumentPartsFragment = { __typename?: 'Document', id: string, name: string, key: string, url: string };

export type GetDocumentPageQueryVariables = Exact<{
  studentId: Scalars['ID']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDocumentPageQuery = { __typename?: 'Query', documents: { __typename?: 'DocumentConnection', totalCount: number, nodes: Array<{ __typename?: 'Document', id: string, name: string, key: string, url: string }> } };

export type CreateOneDocumentMutationVariables = Exact<{
  document: CreateDocument;
}>;


export type CreateOneDocumentMutation = { __typename?: 'Mutation', createOneDocument: { __typename?: 'Document', id: string, name: string, key: string, url: string } };

export type AddStudentsToDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  relationIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AddStudentsToDocumentMutation = { __typename?: 'Mutation', addStudentsToDocument: { __typename?: 'Document', id: string } };

export type RemoveStudentsFromDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  relationIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveStudentsFromDocumentMutation = { __typename?: 'Mutation', removeStudentsFromDocument: { __typename?: 'Document', id: string } };

export type DeleteOneDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOneDocumentMutation = { __typename?: 'Mutation', deleteOneDocument: { __typename?: 'DocumentDeleteResponse', id?: string | null } };

export const SessionPartsFragmentDoc = gql`
    fragment SessionParts on Session {
  id
  token
  username
  branch {
    id
    picture
    name
  }
  cycle {
    id
    name
    start
    end
  }
  exp
  iat
}
    `;
export const BranchPartsFragmentDoc = gql`
    fragment BranchParts on Branch {
  id
  name
  picture
}
    `;
export const ActivityPartsFragmentDoc = gql`
    fragment ActivityParts on Activity {
  id
  name
  quantity
  isPackage
  withTax
  order
}
    `;
export const CyclePartsFragmentDoc = gql`
    fragment CycleParts on Cycle {
  id
  name
  start
  end
}
    `;
export const DebitPartsFragmentDoc = gql`
    fragment DebitParts on Debit {
  id
  description
  unitPrice
  quantity
  amount
  discount
  subtotal
  taxes
  total
  withTax
  state
  frequency
  dueDate
  paymentDate
}
    `;
export const DiscountPartsFragmentDoc = gql`
    fragment DiscountParts on Discount {
  id
  name
  value
  type
}
    `;
export const EnrollmentPartsFragmentDoc = gql`
    fragment EnrollmentParts on Enrollment {
  id
  details
  state
  isPackage
  activity {
    id
    name
    isPackage
    quantity
  }
  cycle {
    id
    name
  }
  student {
    id
    picture
    fullname
    code
  }
  level {
    id
    name
    abbreviation
  }
  parentId
  children {
    totalCount
  }
}
    `;
export const FeePartsFragmentDoc = gql`
    fragment FeeParts on Fee {
  id
  name
  price
  amount
  frequency
  withTax
}
    `;
export const LevelPartsFragmentDoc = gql`
    fragment LevelParts on Level {
  id
  name
  abbreviation
  order
}
    `;
export const StudentPartsFragmentDoc = gql`
    fragment StudentParts on Student {
  id
  code
  picture
  fullname
  firstname
  lastname
  dateBirth
  dni
}
    `;
export const DocumentPartsFragmentDoc = gql`
    fragment DocumentParts on Document {
  id
  name
  key
  url
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
export const UpdateOneUserDocument = gql`
    mutation updateOneUser($update: UpdateUser!, $id: ID!) {
  updateOneUser(id: $id, update: $update) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneUserGQL extends Apollo.Mutation<UpdateOneUserMutation, UpdateOneUserMutationVariables> {
    document = UpdateOneUserDocument;
    
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
export const CreateOneActivityDocument = gql`
    mutation createOneActivity($activity: CreateActivity!) {
  createOneActivity(input: {activity: $activity}) {
    ...ActivityParts
  }
}
    ${ActivityPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneActivityGQL extends Apollo.Mutation<CreateOneActivityMutation, CreateOneActivityMutationVariables> {
    document = CreateOneActivityDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetActivityPageDocument = gql`
    query getActivityPage($offset: Int = 0, $limit: Int = 10, $filter: ActivityFilter = {}) {
  activities(
    paging: {limit: $limit, offset: $offset}
    sorting: [{field: order, direction: ASC}, {field: createdAt, direction: DESC}]
    filter: $filter
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...ActivityParts
    }
  }
}
    ${ActivityPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetActivityPageGQL extends Apollo.Query<GetActivityPageQuery, GetActivityPageQueryVariables> {
    document = GetActivityPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneActivityDocument = gql`
    mutation updateOneActivity($id: ID!, $update: UpdateActivity!) {
  updateOneActivity(input: {id: $id, update: $update}) {
    ...ActivityParts
  }
}
    ${ActivityPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneActivityGQL extends Apollo.Mutation<UpdateOneActivityMutation, UpdateOneActivityMutationVariables> {
    document = UpdateOneActivityDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneActivityDocument = gql`
    mutation deleteOneActivity($id: ID!) {
  deleteOneActivity(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneActivityGQL extends Apollo.Mutation<DeleteOneActivityMutation, DeleteOneActivityMutationVariables> {
    document = DeleteOneActivityDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SetOrderActivitiesDocument = gql`
    mutation setOrderActivities($payload: [SetOrderInput!]!) {
  setOrderActivities(input: $payload) {
    updatedCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetOrderActivitiesGQL extends Apollo.Mutation<SetOrderActivitiesMutation, SetOrderActivitiesMutationVariables> {
    document = SetOrderActivitiesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneCycleDocument = gql`
    mutation createOneCycle($cycle: CreateCycle!) {
  createOneCycle(input: {cycle: $cycle}) {
    ...CycleParts
  }
}
    ${CyclePartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneCycleGQL extends Apollo.Mutation<CreateOneCycleMutation, CreateOneCycleMutationVariables> {
    document = CreateOneCycleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCyclesPageDocument = gql`
    query getCyclesPage($offset: Int = 0, $limit: Int = 10, $filter: CycleFilter = {}) {
  cycles(paging: {limit: $limit, offset: $offset}, filter: $filter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...CycleParts
    }
  }
}
    ${CyclePartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCyclesPageGQL extends Apollo.Query<GetCyclesPageQuery, GetCyclesPageQueryVariables> {
    document = GetCyclesPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneCycleDocument = gql`
    mutation updateOneCycle($id: ID!, $update: UpdateCycle!) {
  updateOneCycle(input: {id: $id, update: $update}) {
    ...CycleParts
  }
}
    ${CyclePartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneCycleGQL extends Apollo.Mutation<UpdateOneCycleMutation, UpdateOneCycleMutationVariables> {
    document = UpdateOneCycleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneCycleDocument = gql`
    mutation deleteOneCycle($id: ID!) {
  deleteOneCycle(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneCycleGQL extends Apollo.Mutation<DeleteOneCycleMutation, DeleteOneCycleMutationVariables> {
    document = DeleteOneCycleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneDebitDocument = gql`
    mutation createOneDebit($debit: CreateDebit!) {
  createOneDebit(input: {debit: $debit}) {
    ...DebitParts
  }
}
    ${DebitPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneDebitGQL extends Apollo.Mutation<CreateOneDebitMutation, CreateOneDebitMutationVariables> {
    document = CreateOneDebitDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetDebitsPageDocument = gql`
    query getDebitsPage($offset: Int = 0, $limit: Int = 10, $filter: DebitFilter = {}) {
  debits(paging: {limit: $limit, offset: $offset}, filter: $filter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...DebitParts
    }
  }
}
    ${DebitPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDebitsPageGQL extends Apollo.Query<GetDebitsPageQuery, GetDebitsPageQueryVariables> {
    document = GetDebitsPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneDebitDocument = gql`
    mutation updateOneDebit($id: ID!, $update: UpdateDebit!) {
  updateOneDebit(input: {id: $id, update: $update}) {
    ...DebitParts
  }
}
    ${DebitPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneDebitGQL extends Apollo.Mutation<UpdateOneDebitMutation, UpdateOneDebitMutationVariables> {
    document = UpdateOneDebitDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateManyDebitsDocument = gql`
    mutation createManyDebits($debits: [CreateDebit!]!) {
  createManyDebits(input: {debits: $debits}) {
    ...DebitParts
  }
}
    ${DebitPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateManyDebitsGQL extends Apollo.Mutation<CreateManyDebitsMutation, CreateManyDebitsMutationVariables> {
    document = CreateManyDebitsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneDebitDocument = gql`
    mutation deleteOneDebit($id: ID!) {
  deleteOneDebit(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneDebitGQL extends Apollo.Mutation<DeleteOneDebitMutation, DeleteOneDebitMutationVariables> {
    document = DeleteOneDebitDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneDiscountDocument = gql`
    mutation createOneDiscount($discount: CreateDiscount!) {
  createOneDiscount(input: {discount: $discount}) {
    ...DiscountParts
  }
}
    ${DiscountPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneDiscountGQL extends Apollo.Mutation<CreateOneDiscountMutation, CreateOneDiscountMutationVariables> {
    document = CreateOneDiscountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetDiscountsPageDocument = gql`
    query getDiscountsPage($offset: Int = 0, $limit: Int = 10, $filter: DiscountFilter = {}) {
  discounts(paging: {limit: $limit, offset: $offset}, filter: $filter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...DiscountParts
    }
  }
}
    ${DiscountPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDiscountsPageGQL extends Apollo.Query<GetDiscountsPageQuery, GetDiscountsPageQueryVariables> {
    document = GetDiscountsPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneDiscountDocument = gql`
    mutation updateOneDiscount($id: ID!, $update: UpdateDiscount!) {
  updateOneDiscount(input: {id: $id, update: $update}) {
    ...DiscountParts
  }
}
    ${DiscountPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneDiscountGQL extends Apollo.Mutation<UpdateOneDiscountMutation, UpdateOneDiscountMutationVariables> {
    document = UpdateOneDiscountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneDiscountDocument = gql`
    mutation deleteOneDiscount($id: ID!) {
  deleteOneDiscount(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneDiscountGQL extends Apollo.Mutation<DeleteOneDiscountMutation, DeleteOneDiscountMutationVariables> {
    document = DeleteOneDiscountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneEnrollmentDocument = gql`
    mutation createOneEnrollment($enrollment: CreateEnrollment!) {
  createOneEnrollment(input: {enrollment: $enrollment}) {
    ...EnrollmentParts
  }
}
    ${EnrollmentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneEnrollmentGQL extends Apollo.Mutation<CreateOneEnrollmentMutation, CreateOneEnrollmentMutationVariables> {
    document = CreateOneEnrollmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetEnrollmentsPageDocument = gql`
    query getEnrollmentsPage($offset: Int = 0, $limit: Int = 10, $filter: EnrollmentFilter = {}) {
  enrollments(
    paging: {limit: $limit, offset: $offset}
    filter: $filter
    sorting: [{field: order, direction: ASC}, {field: createdAt, direction: DESC}]
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...EnrollmentParts
    }
  }
}
    ${EnrollmentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEnrollmentsPageGQL extends Apollo.Query<GetEnrollmentsPageQuery, GetEnrollmentsPageQueryVariables> {
    document = GetEnrollmentsPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneEnrollmentDocument = gql`
    mutation updateOneEnrollment($id: ID!, $update: UpdateEnrollment!) {
  updateOneEnrollment(input: {id: $id, update: $update}) {
    ...EnrollmentParts
  }
}
    ${EnrollmentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneEnrollmentGQL extends Apollo.Mutation<UpdateOneEnrollmentMutation, UpdateOneEnrollmentMutationVariables> {
    document = UpdateOneEnrollmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneEnrollmentDocument = gql`
    mutation deleteOneEnrollment($id: ID!) {
  deleteOneEnrollment(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneEnrollmentGQL extends Apollo.Mutation<DeleteOneEnrollmentMutation, DeleteOneEnrollmentMutationVariables> {
    document = DeleteOneEnrollmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SetOrderEnrollmentsDocument = gql`
    mutation setOrderEnrollments($payload: [SetOrderInput!]!) {
  setOrderEnrollments(input: $payload) {
    updatedCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetOrderEnrollmentsGQL extends Apollo.Mutation<SetOrderEnrollmentsMutation, SetOrderEnrollmentsMutationVariables> {
    document = SetOrderEnrollmentsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneFeeDocument = gql`
    mutation createOneFee($fee: CreateFee!) {
  createOneFee(input: {fee: $fee}) {
    ...FeeParts
  }
}
    ${FeePartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneFeeGQL extends Apollo.Mutation<CreateOneFeeMutation, CreateOneFeeMutationVariables> {
    document = CreateOneFeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetFeePageDocument = gql`
    query getFeePage($offset: Int = 0, $limit: Int = 10, $filter: FeeFilter = {}) {
  fees(paging: {limit: $limit, offset: $offset}, filter: $filter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...FeeParts
    }
  }
}
    ${FeePartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetFeePageGQL extends Apollo.Query<GetFeePageQuery, GetFeePageQueryVariables> {
    document = GetFeePageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneFeeDocument = gql`
    mutation updateOneFee($id: ID!, $update: UpdateFee!) {
  updateOneFee(input: {id: $id, update: $update}) {
    ...FeeParts
  }
}
    ${FeePartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneFeeGQL extends Apollo.Mutation<UpdateOneFeeMutation, UpdateOneFeeMutationVariables> {
    document = UpdateOneFeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneFeeDocument = gql`
    mutation deleteOneFee($id: ID!) {
  deleteOneFee(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneFeeGQL extends Apollo.Mutation<DeleteOneFeeMutation, DeleteOneFeeMutationVariables> {
    document = DeleteOneFeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneLevelDocument = gql`
    mutation createOneLevel($level: CreateLevel!) {
  createOneLevel(input: {level: $level}) {
    ...LevelParts
  }
}
    ${LevelPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneLevelGQL extends Apollo.Mutation<CreateOneLevelMutation, CreateOneLevelMutationVariables> {
    document = CreateOneLevelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetLevelsPageDocument = gql`
    query getLevelsPage($offset: Int = 0, $limit: Int = 10, $filter: LevelFilter = {}) {
  levels(
    paging: {limit: $limit, offset: $offset}
    sorting: [{field: order, direction: ASC}, {field: createdAt, direction: DESC}]
    filter: $filter
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...LevelParts
    }
  }
}
    ${LevelPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLevelsPageGQL extends Apollo.Query<GetLevelsPageQuery, GetLevelsPageQueryVariables> {
    document = GetLevelsPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneLevelDocument = gql`
    mutation updateOneLevel($id: ID!, $update: UpdateLevel!) {
  updateOneLevel(input: {id: $id, update: $update}) {
    ...LevelParts
  }
}
    ${LevelPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneLevelGQL extends Apollo.Mutation<UpdateOneLevelMutation, UpdateOneLevelMutationVariables> {
    document = UpdateOneLevelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneLevelDocument = gql`
    mutation deleteOneLevel($id: ID!) {
  deleteOneLevel(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneLevelGQL extends Apollo.Mutation<DeleteOneLevelMutation, DeleteOneLevelMutationVariables> {
    document = DeleteOneLevelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SetOrderLevelsDocument = gql`
    mutation setOrderLevels($payload: [SetOrderInput!]!) {
  setOrderLevels(input: $payload) {
    updatedCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetOrderLevelsGQL extends Apollo.Mutation<SetOrderLevelsMutation, SetOrderLevelsMutationVariables> {
    document = SetOrderLevelsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneStudentDocument = gql`
    mutation createOneStudent($student: CreateStudent!) {
  createOneStudent(input: {student: $student}) {
    ...StudentParts
  }
}
    ${StudentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneStudentGQL extends Apollo.Mutation<CreateOneStudentMutation, CreateOneStudentMutationVariables> {
    document = CreateOneStudentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetStudentsPageDocument = gql`
    query getStudentsPage($offset: Int = 0, $limit: Int = 10, $filter: StudentFilter = {}) {
  students(paging: {limit: $limit, offset: $offset}, filter: $filter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...StudentParts
    }
  }
}
    ${StudentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStudentsPageGQL extends Apollo.Query<GetStudentsPageQuery, GetStudentsPageQueryVariables> {
    document = GetStudentsPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FetchStudentDocument = gql`
    query fetchStudent($offset: Int = 0, $limit: Int = 10, $filter: StudentFilter = {}) {
  students(paging: {limit: $limit, offset: $offset}, filter: $filter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...StudentParts
    }
  }
}
    ${StudentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class FetchStudentGQL extends Apollo.Query<FetchStudentQuery, FetchStudentQueryVariables> {
    document = FetchStudentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneStudentDocument = gql`
    mutation updateOneStudent($id: ID!, $update: UpdateStudent!) {
  updateOneStudent(input: {id: $id, update: $update}) {
    ...StudentParts
  }
}
    ${StudentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneStudentGQL extends Apollo.Mutation<UpdateOneStudentMutation, UpdateOneStudentMutationVariables> {
    document = UpdateOneStudentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneStudentDocument = gql`
    mutation deleteOneStudent($id: ID!) {
  deleteOneStudent(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneStudentGQL extends Apollo.Mutation<DeleteOneStudentMutation, DeleteOneStudentMutationVariables> {
    document = DeleteOneStudentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddBranchsToStudentDocument = gql`
    mutation addBranchsToStudent($studentId: ID!, $branchIds: [ID!]!) {
  addBranchsToStudent(input: {id: $studentId, relationIds: $branchIds}) {
    ...StudentParts
  }
}
    ${StudentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AddBranchsToStudentGQL extends Apollo.Mutation<AddBranchsToStudentMutation, AddBranchsToStudentMutationVariables> {
    document = AddBranchsToStudentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveBranchsFromStudentDocument = gql`
    mutation removeBranchsFromStudent($studentId: ID!, $branchIds: [ID!]!) {
  removeBranchsFromStudent(input: {id: $studentId, relationIds: $branchIds}) {
    ...StudentParts
  }
}
    ${StudentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveBranchsFromStudentGQL extends Apollo.Mutation<RemoveBranchsFromStudentMutation, RemoveBranchsFromStudentMutationVariables> {
    document = RemoveBranchsFromStudentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetDocumentPageDocument = gql`
    query getDocumentPage($studentId: ID!, $offset: Int = 0, $limit: Int = 10) {
  documents(
    filter: {students: {id: {eq: $studentId}}}
    paging: {offset: $offset, limit: $limit}
  ) {
    totalCount
    nodes {
      ...DocumentParts
    }
  }
}
    ${DocumentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDocumentPageGQL extends Apollo.Query<GetDocumentPageQuery, GetDocumentPageQueryVariables> {
    document = GetDocumentPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOneDocumentDocument = gql`
    mutation createOneDocument($document: CreateDocument!) {
  createOneDocument(input: {document: $document}) {
    ...DocumentParts
  }
}
    ${DocumentPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneDocumentGQL extends Apollo.Mutation<CreateOneDocumentMutation, CreateOneDocumentMutationVariables> {
    document = CreateOneDocumentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddStudentsToDocumentDocument = gql`
    mutation addStudentsToDocument($id: ID!, $relationIds: [ID!]!) {
  addStudentsToDocument(input: {id: $id, relationIds: $relationIds}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddStudentsToDocumentGQL extends Apollo.Mutation<AddStudentsToDocumentMutation, AddStudentsToDocumentMutationVariables> {
    document = AddStudentsToDocumentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveStudentsFromDocumentDocument = gql`
    mutation removeStudentsFromDocument($id: ID!, $relationIds: [ID!]!) {
  removeStudentsFromDocument(input: {id: $id, relationIds: $relationIds}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveStudentsFromDocumentGQL extends Apollo.Mutation<RemoveStudentsFromDocumentMutation, RemoveStudentsFromDocumentMutationVariables> {
    document = RemoveStudentsFromDocumentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneDocumentDocument = gql`
    mutation deleteOneDocument($id: ID!) {
  deleteOneDocument(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneDocumentGQL extends Apollo.Mutation<DeleteOneDocumentMutation, DeleteOneDocumentMutationVariables> {
    document = DeleteOneDocumentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }