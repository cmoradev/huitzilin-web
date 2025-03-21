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

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  user: User;
};

export type BaseInput = {
  id: Scalars['Int']['input'];
};

export type Company = {
  __typename?: 'Company';
  address: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  departments: Array<Department>;
  hierarchies: Array<Hierarchy>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  version: Scalars['Float']['output'];
  workstations: Array<Workstation>;
};


export type CompanyDepartmentsArgs = {
  filter?: DepartmentFilter;
  sorting?: Array<DepartmentSort>;
};


export type CompanyHierarchiesArgs = {
  filter?: HierarchyFilter;
  sorting?: Array<HierarchySort>;
};


export type CompanyWorkstationsArgs = {
  filter?: WorkstationFilter;
  sorting?: Array<WorkstationSort>;
};

export type CompanyConnection = {
  __typename?: 'CompanyConnection';
  /** Array of nodes. */
  nodes: Array<Company>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type CompanyDeleteFilter = {
  and?: InputMaybe<Array<CompanyDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CompanyDeleteFilter>>;
};

export type CompanyDeleteResponse = {
  __typename?: 'CompanyDeleteResponse';
  address?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type CompanyFilter = {
  and?: InputMaybe<Array<CompanyFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CompanyFilter>>;
};

export type CompanySort = {
  direction: SortDirection;
  field: CompanySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CompanySortFields {
  Id = 'id',
  Name = 'name'
}

export type CompanyUpdateFilter = {
  and?: InputMaybe<Array<CompanyUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CompanyUpdateFilter>>;
};

export type CreateCompany = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
  picture: Scalars['String']['input'];
};

export type CreateManyCompaniesInput = {
  /** Array of records to create */
  companies: Array<CreateCompany>;
};

export type CreateManyDepartmentsInput = {
  /** Array of records to create */
  departments: Array<DepartmentCreate>;
};

export type CreateManyDetailOrdersInput = {
  /** Array of records to create */
  detailOrders: Array<DetailOrderCreate>;
};

export type CreateManyDocumentsInput = {
  /** Array of records to create */
  documents: Array<DocumentCreate>;
};

export type CreateManyHierarchiesInput = {
  /** Array of records to create */
  hierarchies: Array<HierarchyCreate>;
};

export type CreateManyInteractionOrdersInput = {
  /** Array of records to create */
  interactionOrders: Array<InteractionOrderCreate>;
};

export type CreateManyPurchaseOrderLogsInput = {
  /** Array of records to create */
  purchaseOrderLogs: Array<PurchaseOrderLogCreate>;
};

export type CreateManySuppliersInput = {
  /** Array of records to create */
  suppliers: Array<SupplierCreate>;
};

export type CreateManyUsersInput = {
  /** Array of records to create */
  users: Array<UserCreate>;
};

export type CreateManyWorkstationsInput = {
  /** Array of records to create */
  workstations: Array<WorkstationCreate>;
};

export type CreateOneCompanyInput = {
  /** The record to create */
  company: CreateCompany;
};

export type CreateOneDepartmentInput = {
  /** The record to create */
  department: DepartmentCreate;
};

export type CreateOneDetailOrderInput = {
  /** The record to create */
  detailOrder: DetailOrderCreate;
};

export type CreateOneDocumentInput = {
  /** The record to create */
  document: DocumentCreate;
};

export type CreateOneHierarchyInput = {
  /** The record to create */
  hierarchy: HierarchyCreate;
};

export type CreateOneInteractionOrderInput = {
  /** The record to create */
  interactionOrder: InteractionOrderCreate;
};

export type CreateOnePurchaseOrderLogInput = {
  /** The record to create */
  purchaseOrderLog: PurchaseOrderLogCreate;
};

export type CreateOneSupplierInput = {
  /** The record to create */
  supplier: SupplierCreate;
};

export type CreateOneUserInput = {
  /** The record to create */
  user: UserCreate;
};

export type CreateOneWorkstationInput = {
  /** The record to create */
  workstation: WorkstationCreate;
};

export type DeleteManyCompaniesInput = {
  /** Filter to find records to delete */
  filter: CompanyDeleteFilter;
};

export type DeleteManyDepartmentsInput = {
  /** Filter to find records to delete */
  filter: DepartmentDeleteFilter;
};

export type DeleteManyDetailOrdersInput = {
  /** Filter to find records to delete */
  filter: DetailOrderDeleteFilter;
};

export type DeleteManyDocumentsInput = {
  /** Filter to find records to delete */
  filter: DocumentDeleteFilter;
};

export type DeleteManyHierarchiesInput = {
  /** Filter to find records to delete */
  filter: HierarchyDeleteFilter;
};

export type DeleteManyInteractionOrdersInput = {
  /** Filter to find records to delete */
  filter: InteractionOrderDeleteFilter;
};

export type DeleteManyPurchaseOrderLogsInput = {
  /** Filter to find records to delete */
  filter: PurchaseOrderLogDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteManySuppliersInput = {
  /** Filter to find records to delete */
  filter: SupplierDeleteFilter;
};

export type DeleteManyUsersInput = {
  /** Filter to find records to delete */
  filter: UserDeleteFilter;
};

export type DeleteManyWorkstationsInput = {
  /** Filter to find records to delete */
  filter: WorkstationDeleteFilter;
};

export type DeleteOneCompanyInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type DeleteOneDepartmentInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type DeleteOneDetailOrderInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type DeleteOneDocumentInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type DeleteOneHierarchyInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type DeleteOneInteractionOrderInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type DeleteOnePurchaseOrderLogInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type DeleteOneSupplierInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type DeleteOneUserInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type DeleteOneWorkstationInput = {
  /** The id of the record to delete. */
  id: Scalars['Int']['input'];
};

export type Department = {
  __typename?: 'Department';
  company: Company;
  companyId: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  parentId: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  version: Scalars['Float']['output'];
  workstations: Array<Workstation>;
};


export type DepartmentWorkstationsArgs = {
  filter?: WorkstationFilter;
  sorting?: Array<WorkstationSort>;
};

export type DepartmentConnection = {
  __typename?: 'DepartmentConnection';
  /** Array of nodes. */
  nodes: Array<Department>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DepartmentCreate = {
  companyId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  parentId: Scalars['Int']['input'];
};

export type DepartmentDeleteFilter = {
  and?: InputMaybe<Array<DepartmentDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<DepartmentDeleteFilter>>;
};

export type DepartmentDeleteResponse = {
  __typename?: 'DepartmentDeleteResponse';
  companyId?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type DepartmentFilter = {
  and?: InputMaybe<Array<DepartmentFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<DepartmentFilter>>;
};

export type DepartmentSort = {
  direction: SortDirection;
  field: DepartmentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DepartmentSortFields {
  Id = 'id'
}

export type DepartmentUpdate = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  workstations?: InputMaybe<Array<BaseInput>>;
};

export type DepartmentUpdateFilter = {
  and?: InputMaybe<Array<DepartmentUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<DepartmentUpdateFilter>>;
};

export type DetailOrder = {
  __typename?: 'DetailOrder';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  product: Scalars['String']['output'];
  purchaseOrder: PurchaseOrder;
  purchaseOrderId: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
  version: Scalars['Float']['output'];
};

export type DetailOrderConnection = {
  __typename?: 'DetailOrderConnection';
  /** Array of nodes. */
  nodes: Array<DetailOrder>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DetailOrderCreate = {
  description: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  product: Scalars['String']['input'];
  purchaseOrderId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  total: Scalars['Float']['input'];
};

export type DetailOrderDeleteFilter = {
  and?: InputMaybe<Array<DetailOrderDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<DetailOrderDeleteFilter>>;
};

export type DetailOrderDeleteResponse = {
  __typename?: 'DetailOrderDeleteResponse';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Scalars['String']['output']>;
  purchaseOrderId?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type DetailOrderFilter = {
  and?: InputMaybe<Array<DetailOrderFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<DetailOrderFilter>>;
};

export type DetailOrderSort = {
  direction: SortDirection;
  field: DetailOrderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DetailOrderSortFields {
  Id = 'id'
}

export type DetailOrderUpdate = {
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  product?: InputMaybe<Scalars['String']['input']>;
  purchaseOrderId?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type DetailOrderUpdateFilter = {
  and?: InputMaybe<Array<DetailOrderUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<DetailOrderUpdateFilter>>;
};

export type Document = {
  __typename?: 'Document';
  DocumentType: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  partner?: Maybe<Partner>;
  partnerId: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  version: Scalars['Float']['output'];
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

export type DocumentCreate = {
  DocumentType: Scalars['Int']['input'];
  partnerId: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type DocumentDeleteFilter = {
  and?: InputMaybe<Array<DocumentDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<DocumentDeleteFilter>>;
};

export type DocumentDeleteResponse = {
  __typename?: 'DocumentDeleteResponse';
  DocumentType?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  partnerId?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type DocumentFilter = {
  and?: InputMaybe<Array<DocumentFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<DocumentFilter>>;
};

export type DocumentSort = {
  direction: SortDirection;
  field: DocumentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DocumentSortFields {
  Id = 'id'
}

export type DocumentUpdate = {
  DocumentType?: InputMaybe<Scalars['Int']['input']>;
  partnerId?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentUpdateFilter = {
  and?: InputMaybe<Array<DocumentUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<DocumentUpdateFilter>>;
};

export type Hierarchy = {
  __typename?: 'Hierarchy';
  company: Company;
  companyId: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  parentId: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  version: Scalars['Float']['output'];
  workstations: Array<Workstation>;
};


export type HierarchyWorkstationsArgs = {
  filter?: WorkstationFilter;
  sorting?: Array<WorkstationSort>;
};

export type HierarchyConnection = {
  __typename?: 'HierarchyConnection';
  /** Array of nodes. */
  nodes: Array<Hierarchy>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type HierarchyCreate = {
  companyId: Scalars['Int']['input'];
  departmentId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  parentId: Scalars['Int']['input'];
};

export type HierarchyDeleteFilter = {
  and?: InputMaybe<Array<HierarchyDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<HierarchyDeleteFilter>>;
};

export type HierarchyDeleteResponse = {
  __typename?: 'HierarchyDeleteResponse';
  companyId?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type HierarchyFilter = {
  and?: InputMaybe<Array<HierarchyFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<HierarchyFilter>>;
};

export type HierarchySort = {
  direction: SortDirection;
  field: HierarchySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum HierarchySortFields {
  Id = 'id'
}

export type HierarchyUpdate = {
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  workstations?: InputMaybe<Array<BaseInput>>;
};

export type HierarchyUpdateFilter = {
  and?: InputMaybe<Array<HierarchyUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<HierarchyUpdateFilter>>;
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

export type InteractionOrder = {
  __typename?: 'InteractionOrder';
  PurchaseOrderId: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  interactionOrder: Scalars['Int']['output'];
  purchaseOrder?: Maybe<PurchaseOrder>;
  updated_at: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
  version: Scalars['Float']['output'];
};

export type InteractionOrderConnection = {
  __typename?: 'InteractionOrderConnection';
  /** Array of nodes. */
  nodes: Array<InteractionOrder>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type InteractionOrderCreate = {
  interactionOrder: Scalars['Int']['input'];
  purchaseOrderId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type InteractionOrderDeleteFilter = {
  and?: InputMaybe<Array<InteractionOrderDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<InteractionOrderDeleteFilter>>;
};

export type InteractionOrderDeleteResponse = {
  __typename?: 'InteractionOrderDeleteResponse';
  PurchaseOrderId?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  interactionOrder?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type InteractionOrderFilter = {
  and?: InputMaybe<Array<InteractionOrderFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<InteractionOrderFilter>>;
};

export type InteractionOrderSort = {
  direction: SortDirection;
  field: InteractionOrderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum InteractionOrderSortFields {
  Id = 'id'
}

export type InteractionOrderUpdate = {
  interactionOrder?: InputMaybe<Scalars['Int']['input']>;
  purchaseOrderId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type InteractionOrderUpdateFilter = {
  and?: InputMaybe<Array<InteractionOrderUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<InteractionOrderUpdateFilter>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyCompanies: Array<Company>;
  createManyDepartments: Array<Department>;
  createManyDetailOrders: Array<DetailOrder>;
  createManyDocuments: Array<Document>;
  createManyHierarchies: Array<Hierarchy>;
  createManyInteractionOrders: Array<InteractionOrder>;
  createManyPurchaseOrderLogs: Array<PurchaseOrderLog>;
  createManySuppliers: Array<Supplier>;
  createManyUsers: Array<User>;
  createManyWorkstations: Array<Workstation>;
  createOneCompany: Company;
  createOneDepartment: Department;
  createOneDetailOrder: DetailOrder;
  createOneDocument: Document;
  createOneHierarchy: Hierarchy;
  createOneInteractionOrder: InteractionOrder;
  createOnePurchaseOrderLog: PurchaseOrderLog;
  createOneSupplier: Supplier;
  createOneUser: User;
  createOneWorkstation: Workstation;
  deleteManyCompanies: DeleteManyResponse;
  deleteManyDepartments: DeleteManyResponse;
  deleteManyDetailOrders: DeleteManyResponse;
  deleteManyDocuments: DeleteManyResponse;
  deleteManyHierarchies: DeleteManyResponse;
  deleteManyInteractionOrders: DeleteManyResponse;
  deleteManyPurchaseOrderLogs: DeleteManyResponse;
  deleteManySuppliers: DeleteManyResponse;
  deleteManyUsers: DeleteManyResponse;
  deleteManyWorkstations: DeleteManyResponse;
  deleteOneCompany: CompanyDeleteResponse;
  deleteOneDepartment: DepartmentDeleteResponse;
  deleteOneDetailOrder: DetailOrderDeleteResponse;
  deleteOneDocument: DocumentDeleteResponse;
  deleteOneHierarchy: HierarchyDeleteResponse;
  deleteOneInteractionOrder: InteractionOrderDeleteResponse;
  deleteOnePurchaseOrderLog: PurchaseOrderLogDeleteResponse;
  deleteOneSupplier: SupplierDeleteResponse;
  deleteOneUser: UserDeleteResponse;
  deleteOneWorkstation: WorkstationDeleteResponse;
  login: AuthResponse;
  register: AuthResponse;
  updateManyCompanies: UpdateManyResponse;
  updateManyDepartments: UpdateManyResponse;
  updateManyDetailOrders: UpdateManyResponse;
  updateManyDocuments: UpdateManyResponse;
  updateManyHierarchies: UpdateManyResponse;
  updateManyInteractionOrders: UpdateManyResponse;
  updateManyPurchaseOrderLogs: UpdateManyResponse;
  updateManySuppliers: UpdateManyResponse;
  updateManyUsers: UpdateManyResponse;
  updateManyWorkstations: UpdateManyResponse;
  updateOneCompany: Company;
  updateOneDepartment: Department;
  updateOneDetailOrder: DetailOrder;
  updateOneDocument: Document;
  updateOneHierarchy: Hierarchy;
  updateOneInteractionOrder: InteractionOrder;
  updateOnePurchaseOrderLog: PurchaseOrderLog;
  updateOneSupplier: Supplier;
  updateOneUser: User;
  updateOneWorkstation: Workstation;
};


export type MutationCreateManyCompaniesArgs = {
  input: CreateManyCompaniesInput;
};


export type MutationCreateManyDepartmentsArgs = {
  input: CreateManyDepartmentsInput;
};


export type MutationCreateManyDetailOrdersArgs = {
  input: CreateManyDetailOrdersInput;
};


export type MutationCreateManyDocumentsArgs = {
  input: CreateManyDocumentsInput;
};


export type MutationCreateManyHierarchiesArgs = {
  input: CreateManyHierarchiesInput;
};


export type MutationCreateManyInteractionOrdersArgs = {
  input: CreateManyInteractionOrdersInput;
};


export type MutationCreateManyPurchaseOrderLogsArgs = {
  input: CreateManyPurchaseOrderLogsInput;
};


export type MutationCreateManySuppliersArgs = {
  input: CreateManySuppliersInput;
};


export type MutationCreateManyUsersArgs = {
  input: CreateManyUsersInput;
};


export type MutationCreateManyWorkstationsArgs = {
  input: CreateManyWorkstationsInput;
};


export type MutationCreateOneCompanyArgs = {
  input: CreateOneCompanyInput;
};


export type MutationCreateOneDepartmentArgs = {
  input: CreateOneDepartmentInput;
};


export type MutationCreateOneDetailOrderArgs = {
  input: CreateOneDetailOrderInput;
};


export type MutationCreateOneDocumentArgs = {
  input: CreateOneDocumentInput;
};


export type MutationCreateOneHierarchyArgs = {
  input: CreateOneHierarchyInput;
};


export type MutationCreateOneInteractionOrderArgs = {
  input: CreateOneInteractionOrderInput;
};


export type MutationCreateOnePurchaseOrderLogArgs = {
  input: CreateOnePurchaseOrderLogInput;
};


export type MutationCreateOneSupplierArgs = {
  input: CreateOneSupplierInput;
};


export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput;
};


export type MutationCreateOneWorkstationArgs = {
  input: CreateOneWorkstationInput;
};


export type MutationDeleteManyCompaniesArgs = {
  input: DeleteManyCompaniesInput;
};


export type MutationDeleteManyDepartmentsArgs = {
  input: DeleteManyDepartmentsInput;
};


export type MutationDeleteManyDetailOrdersArgs = {
  input: DeleteManyDetailOrdersInput;
};


export type MutationDeleteManyDocumentsArgs = {
  input: DeleteManyDocumentsInput;
};


export type MutationDeleteManyHierarchiesArgs = {
  input: DeleteManyHierarchiesInput;
};


export type MutationDeleteManyInteractionOrdersArgs = {
  input: DeleteManyInteractionOrdersInput;
};


export type MutationDeleteManyPurchaseOrderLogsArgs = {
  input: DeleteManyPurchaseOrderLogsInput;
};


export type MutationDeleteManySuppliersArgs = {
  input: DeleteManySuppliersInput;
};


export type MutationDeleteManyUsersArgs = {
  input: DeleteManyUsersInput;
};


export type MutationDeleteManyWorkstationsArgs = {
  input: DeleteManyWorkstationsInput;
};


export type MutationDeleteOneCompanyArgs = {
  input: DeleteOneCompanyInput;
};


export type MutationDeleteOneDepartmentArgs = {
  input: DeleteOneDepartmentInput;
};


export type MutationDeleteOneDetailOrderArgs = {
  input: DeleteOneDetailOrderInput;
};


export type MutationDeleteOneDocumentArgs = {
  input: DeleteOneDocumentInput;
};


export type MutationDeleteOneHierarchyArgs = {
  input: DeleteOneHierarchyInput;
};


export type MutationDeleteOneInteractionOrderArgs = {
  input: DeleteOneInteractionOrderInput;
};


export type MutationDeleteOnePurchaseOrderLogArgs = {
  input: DeleteOnePurchaseOrderLogInput;
};


export type MutationDeleteOneSupplierArgs = {
  input: DeleteOneSupplierInput;
};


export type MutationDeleteOneUserArgs = {
  input: DeleteOneUserInput;
};


export type MutationDeleteOneWorkstationArgs = {
  input: DeleteOneWorkstationInput;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  userData: UserCreate;
};


export type MutationUpdateManyCompaniesArgs = {
  input: UpdateManyCompaniesInput;
};


export type MutationUpdateManyDepartmentsArgs = {
  input: UpdateManyDepartmentsInput;
};


export type MutationUpdateManyDetailOrdersArgs = {
  input: UpdateManyDetailOrdersInput;
};


export type MutationUpdateManyDocumentsArgs = {
  input: UpdateManyDocumentsInput;
};


export type MutationUpdateManyHierarchiesArgs = {
  input: UpdateManyHierarchiesInput;
};


export type MutationUpdateManyInteractionOrdersArgs = {
  input: UpdateManyInteractionOrdersInput;
};


export type MutationUpdateManyPurchaseOrderLogsArgs = {
  input: UpdateManyPurchaseOrderLogsInput;
};


export type MutationUpdateManySuppliersArgs = {
  input: UpdateManySuppliersInput;
};


export type MutationUpdateManyUsersArgs = {
  input: UpdateManyUsersInput;
};


export type MutationUpdateManyWorkstationsArgs = {
  input: UpdateManyWorkstationsInput;
};


export type MutationUpdateOneCompanyArgs = {
  input: UpdateOneCompanyInput;
};


export type MutationUpdateOneDepartmentArgs = {
  input: UpdateOneDepartmentInput;
};


export type MutationUpdateOneDetailOrderArgs = {
  input: UpdateOneDetailOrderInput;
};


export type MutationUpdateOneDocumentArgs = {
  input: UpdateOneDocumentInput;
};


export type MutationUpdateOneHierarchyArgs = {
  input: UpdateOneHierarchyInput;
};


export type MutationUpdateOneInteractionOrderArgs = {
  input: UpdateOneInteractionOrderInput;
};


export type MutationUpdateOnePurchaseOrderLogArgs = {
  input: UpdateOnePurchaseOrderLogInput;
};


export type MutationUpdateOneSupplierArgs = {
  input: UpdateOneSupplierInput;
};


export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};


export type MutationUpdateOneWorkstationArgs = {
  input: UpdateOneWorkstationInput;
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

export type Partner = {
  __typename?: 'Partner';
  birthDate: Scalars['DateTime']['output'];
  created_at: Scalars['DateTime']['output'];
  dailyWave: Scalars['Float']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  fatherLastName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  monthlyWave: Scalars['Float']['output'];
  motherLastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nss: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  rfc: Scalars['String']['output'];
  searchName: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  version: Scalars['Float']['output'];
  weeklyWave: Scalars['Float']['output'];
};

export type PurchaseOrder = {
  __typename?: 'PurchaseOrder';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  folio: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  stateOrder: Scalars['Int']['output'];
  supplierId: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  version: Scalars['Float']['output'];
};

export type PurchaseOrderFilter = {
  and?: InputMaybe<Array<PurchaseOrderFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<PurchaseOrderFilter>>;
};

export type PurchaseOrderLog = {
  __typename?: 'PurchaseOrderLog';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  purchaseOrder: PurchaseOrder;
  purchaseOrderId: Scalars['Int']['output'];
  registered: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  version: Scalars['Float']['output'];
};

export type PurchaseOrderLogConnection = {
  __typename?: 'PurchaseOrderLogConnection';
  /** Array of nodes. */
  nodes: Array<PurchaseOrderLog>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type PurchaseOrderLogCreate = {
  description: Scalars['String']['input'];
  purchaseOrderId: Scalars['Int']['input'];
  registered: Scalars['DateTime']['input'];
  userId: Scalars['Int']['input'];
};

export type PurchaseOrderLogDeleteFilter = {
  and?: InputMaybe<Array<PurchaseOrderLogDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<PurchaseOrderLogDeleteFilter>>;
};

export type PurchaseOrderLogDeleteResponse = {
  __typename?: 'PurchaseOrderLogDeleteResponse';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  purchaseOrderId?: Maybe<Scalars['Int']['output']>;
  registered?: Maybe<Scalars['DateTime']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type PurchaseOrderLogFilter = {
  and?: InputMaybe<Array<PurchaseOrderLogFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<PurchaseOrderLogFilter>>;
};

export type PurchaseOrderLogSort = {
  direction: SortDirection;
  field: PurchaseOrderLogSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum PurchaseOrderLogSortFields {
  Id = 'id'
}

export type PurchaseOrderLogUpdate = {
  description?: InputMaybe<Scalars['String']['input']>;
  purchaseOrderId?: InputMaybe<Scalars['Int']['input']>;
  registered?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type PurchaseOrderLogUpdateFilter = {
  and?: InputMaybe<Array<PurchaseOrderLogUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<PurchaseOrderLogUpdateFilter>>;
};

export type PurchaseOrderSort = {
  direction: SortDirection;
  field: PurchaseOrderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum PurchaseOrderSortFields {
  Id = 'id'
}

export type Query = {
  __typename?: 'Query';
  companies: CompanyConnection;
  company: Company;
  department: Department;
  departments: DepartmentConnection;
  detailOrder: DetailOrder;
  detailOrders: DetailOrderConnection;
  document: Document;
  documents: DocumentConnection;
  hierarchies: HierarchyConnection;
  hierarchy: Hierarchy;
  interactionOrder: InteractionOrder;
  interactionOrders: InteractionOrderConnection;
  purchaseOrderLog: PurchaseOrderLog;
  purchaseOrderLogs: PurchaseOrderLogConnection;
  supplier: Supplier;
  suppliers: SupplierConnection;
  user: User;
  users: UserConnection;
  workstation: Workstation;
  workstations: WorkstationConnection;
};


export type QueryCompaniesArgs = {
  filter?: CompanyFilter;
  paging?: OffsetPaging;
  sorting?: Array<CompanySort>;
};


export type QueryCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDepartmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDepartmentsArgs = {
  filter?: DepartmentFilter;
  paging?: OffsetPaging;
  sorting?: Array<DepartmentSort>;
};


export type QueryDetailOrderArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDetailOrdersArgs = {
  filter?: DetailOrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<DetailOrderSort>;
};


export type QueryDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocumentsArgs = {
  filter?: DocumentFilter;
  paging?: OffsetPaging;
  sorting?: Array<DocumentSort>;
};


export type QueryHierarchiesArgs = {
  filter?: HierarchyFilter;
  paging?: OffsetPaging;
  sorting?: Array<HierarchySort>;
};


export type QueryHierarchyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryInteractionOrderArgs = {
  id: Scalars['Int']['input'];
};


export type QueryInteractionOrdersArgs = {
  filter?: InteractionOrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<InteractionOrderSort>;
};


export type QueryPurchaseOrderLogArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPurchaseOrderLogsArgs = {
  filter?: PurchaseOrderLogFilter;
  paging?: OffsetPaging;
  sorting?: Array<PurchaseOrderLogSort>;
};


export type QuerySupplierArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySuppliersArgs = {
  filter?: SupplierFilter;
  paging?: OffsetPaging;
  sorting?: Array<SupplierSort>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  filter?: UserFilter;
  paging?: OffsetPaging;
  sorting?: Array<UserSort>;
};


export type QueryWorkstationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryWorkstationsArgs = {
  filter?: WorkstationFilter;
  paging?: OffsetPaging;
  sorting?: Array<WorkstationSort>;
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

export type Supplier = {
  __typename?: 'Supplier';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  purchaseOrders: Array<PurchaseOrder>;
  updated_at: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  version: Scalars['Float']['output'];
};


export type SupplierPurchaseOrdersArgs = {
  filter?: PurchaseOrderFilter;
  sorting?: Array<PurchaseOrderSort>;
};

export type SupplierConnection = {
  __typename?: 'SupplierConnection';
  /** Array of nodes. */
  nodes: Array<Supplier>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type SupplierCreate = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type SupplierDeleteFilter = {
  and?: InputMaybe<Array<SupplierDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<SupplierDeleteFilter>>;
};

export type SupplierDeleteResponse = {
  __typename?: 'SupplierDeleteResponse';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type SupplierFilter = {
  and?: InputMaybe<Array<SupplierFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<SupplierFilter>>;
};

export type SupplierSort = {
  direction: SortDirection;
  field: SupplierSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum SupplierSortFields {
  Id = 'id'
}

export type SupplierUpdate = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  purchaseOrders?: InputMaybe<Array<BaseInput>>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type SupplierUpdateFilter = {
  and?: InputMaybe<Array<SupplierUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<SupplierUpdateFilter>>;
};

export type UpdateCompany = {
  address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  workstations?: InputMaybe<Array<BaseInput>>;
};

export type UpdateManyCompaniesInput = {
  /** Filter used to find fields to update */
  filter: CompanyUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateCompany;
};

export type UpdateManyDepartmentsInput = {
  /** Filter used to find fields to update */
  filter: DepartmentUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: DepartmentUpdate;
};

export type UpdateManyDetailOrdersInput = {
  /** Filter used to find fields to update */
  filter: DetailOrderUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: DetailOrderUpdate;
};

export type UpdateManyDocumentsInput = {
  /** Filter used to find fields to update */
  filter: DocumentUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: DocumentUpdate;
};

export type UpdateManyHierarchiesInput = {
  /** Filter used to find fields to update */
  filter: HierarchyUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: HierarchyUpdate;
};

export type UpdateManyInteractionOrdersInput = {
  /** Filter used to find fields to update */
  filter: InteractionOrderUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: InteractionOrderUpdate;
};

export type UpdateManyPurchaseOrderLogsInput = {
  /** Filter used to find fields to update */
  filter: PurchaseOrderLogUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: PurchaseOrderLogUpdate;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateManySuppliersInput = {
  /** Filter used to find fields to update */
  filter: SupplierUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: SupplierUpdate;
};

export type UpdateManyUsersInput = {
  /** Filter used to find fields to update */
  filter: UserUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UserUpdate;
};

export type UpdateManyWorkstationsInput = {
  /** Filter used to find fields to update */
  filter: WorkstationUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: WorkstationUpdate;
};

export type UpdateOneCompanyInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: UpdateCompany;
};

export type UpdateOneDepartmentInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: DepartmentUpdate;
};

export type UpdateOneDetailOrderInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: DetailOrderUpdate;
};

export type UpdateOneDocumentInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: DocumentUpdate;
};

export type UpdateOneHierarchyInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: HierarchyUpdate;
};

export type UpdateOneInteractionOrderInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: InteractionOrderUpdate;
};

export type UpdateOnePurchaseOrderLogInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: PurchaseOrderLogUpdate;
};

export type UpdateOneSupplierInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: SupplierUpdate;
};

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: UserUpdate;
};

export type UpdateOneWorkstationInput = {
  /** The id of the record to update */
  id: Scalars['Int']['input'];
  /** The update to apply. */
  update: WorkstationUpdate;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  interactionOrders: Array<InteractionOrder>;
  partner: Partner;
  partnerId: Scalars['Int']['output'];
  purchaseOrderLogs: Array<PurchaseOrderLog>;
  updated_at: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  version: Scalars['Float']['output'];
};


export type UserInteractionOrdersArgs = {
  filter?: InteractionOrderFilter;
  sorting?: Array<InteractionOrderSort>;
};


export type UserPurchaseOrderLogsArgs = {
  filter?: PurchaseOrderLogFilter;
  sorting?: Array<PurchaseOrderLogSort>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** Array of nodes. */
  nodes: Array<User>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type UserCreate = {
  email: Scalars['String']['input'];
  partnerId?: InputMaybe<Scalars['Int']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserDeleteFilter = {
  and?: InputMaybe<Array<UserDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<UserDeleteFilter>>;
};

export type UserDeleteResponse = {
  __typename?: 'UserDeleteResponse';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  partnerId?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type UserFilter = {
  and?: InputMaybe<Array<UserFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<UserFilter>>;
};

export type UserSort = {
  direction: SortDirection;
  field: UserSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum UserSortFields {
  Id = 'id'
}

export type UserUpdate = {
  email?: InputMaybe<Scalars['String']['input']>;
  interactionOrders: Array<BaseInput>;
  partnerId?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  purchaseOrderLogs: Array<BaseInput>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserUpdateFilter = {
  and?: InputMaybe<Array<UserUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<UserUpdateFilter>>;
};

export type Workstation = {
  __typename?: 'Workstation';
  company: Company;
  companyId: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  dailyWave: Scalars['Float']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  department: Department;
  departmentId: Scalars['Int']['output'];
  hierarchy: Hierarchy;
  hierarchyId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  monthlyWave: Scalars['Float']['output'];
  partner: Partner;
  partnerId: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  version: Scalars['Float']['output'];
};

export type WorkstationConnection = {
  __typename?: 'WorkstationConnection';
  /** Array of nodes. */
  nodes: Array<Workstation>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type WorkstationCreate = {
  compayId: Scalars['Int']['input'];
  dailyWave: Scalars['Float']['input'];
  departmentId: Scalars['Int']['input'];
  hierarchyId: Scalars['Int']['input'];
  monthlyWave: Scalars['Float']['input'];
  partnerId: Scalars['Int']['input'];
};

export type WorkstationDeleteFilter = {
  and?: InputMaybe<Array<WorkstationDeleteFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<WorkstationDeleteFilter>>;
};

export type WorkstationDeleteResponse = {
  __typename?: 'WorkstationDeleteResponse';
  companyId?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  dailyWave?: Maybe<Scalars['Float']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  departmentId?: Maybe<Scalars['Int']['output']>;
  hierarchyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  monthlyWave?: Maybe<Scalars['Float']['output']>;
  partnerId?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

export type WorkstationFilter = {
  and?: InputMaybe<Array<WorkstationFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<WorkstationFilter>>;
};

export type WorkstationSort = {
  direction: SortDirection;
  field: WorkstationSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum WorkstationSortFields {
  Id = 'id'
}

export type WorkstationUpdate = {
  companyId?: InputMaybe<Array<BaseInput>>;
  dailyWave?: InputMaybe<Scalars['Float']['input']>;
  departmentId?: InputMaybe<Array<BaseInput>>;
  hierarchyId?: InputMaybe<Array<BaseInput>>;
  monthlyWave?: InputMaybe<Scalars['Float']['input']>;
  partnerId?: InputMaybe<Array<BaseInput>>;
};

export type WorkstationUpdateFilter = {
  and?: InputMaybe<Array<WorkstationUpdateFilter>>;
  id?: InputMaybe<IntFieldComparison>;
  or?: InputMaybe<Array<WorkstationUpdateFilter>>;
};

export type CompanyPartsFragment = { __typename?: 'Company', id: number, name: string, picture: string, address: string, created_at: any, updated_at: any };

export type CreateOneCompanyMutationVariables = Exact<{
  company: CreateCompany;
}>;


export type CreateOneCompanyMutation = { __typename?: 'Mutation', createOneCompany: { __typename?: 'Company', id: number, name: string, picture: string, address: string, created_at: any, updated_at: any } };

export type GetCompaniesPageQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CompanyFilter>;
}>;


export type GetCompaniesPageQuery = { __typename?: 'Query', companies: { __typename?: 'CompanyConnection', totalCount: number, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null }, nodes: Array<{ __typename?: 'Company', id: number, name: string, picture: string, address: string, created_at: any, updated_at: any }> } };

export type UpdateOneCompanyMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  update: UpdateCompany;
}>;


export type UpdateOneCompanyMutation = { __typename?: 'Mutation', updateOneCompany: { __typename?: 'Company', id: number, name: string, picture: string, address: string, created_at: any, updated_at: any } };

export type DeleteOneCompanyMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteOneCompanyMutation = { __typename?: 'Mutation', deleteOneCompany: { __typename?: 'CompanyDeleteResponse', id?: number | null } };

export const CompanyPartsFragmentDoc = gql`
    fragment CompanyParts on Company {
  id
  name
  picture
  address
  created_at
  updated_at
}
    `;
export const CreateOneCompanyDocument = gql`
    mutation createOneCompany($company: CreateCompany!) {
  createOneCompany(input: {company: $company}) {
    ...CompanyParts
  }
}
    ${CompanyPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOneCompanyGQL extends Apollo.Mutation<CreateOneCompanyMutation, CreateOneCompanyMutationVariables> {
    document = CreateOneCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCompaniesPageDocument = gql`
    query getCompaniesPage($offset: Int = 0, $limit: Int = 10, $filter: CompanyFilter = {}) {
  companies(paging: {limit: $limit, offset: $offset}, filter: $filter) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...CompanyParts
    }
  }
}
    ${CompanyPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCompaniesPageGQL extends Apollo.Query<GetCompaniesPageQuery, GetCompaniesPageQueryVariables> {
    document = GetCompaniesPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOneCompanyDocument = gql`
    mutation updateOneCompany($id: Int!, $update: UpdateCompany!) {
  updateOneCompany(input: {id: $id, update: $update}) {
    ...CompanyParts
  }
}
    ${CompanyPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOneCompanyGQL extends Apollo.Mutation<UpdateOneCompanyMutation, UpdateOneCompanyMutationVariables> {
    document = UpdateOneCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOneCompanyDocument = gql`
    mutation deleteOneCompany($id: Int!) {
  deleteOneCompany(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOneCompanyGQL extends Apollo.Mutation<DeleteOneCompanyMutation, DeleteOneCompanyMutationVariables> {
    document = DeleteOneCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }