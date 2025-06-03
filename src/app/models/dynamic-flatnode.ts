import { signal } from '@angular/core';
import { Observable } from 'rxjs';

export type Item = {
  id: string;
};

export type NodeList<T extends Item> = {
  loading: boolean;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nodes: FlatNode<T>[];
};

export class FlatNode<T extends Item> {
  public isLoading = signal(false);

  constructor(
    public item: T,
    public expandable: boolean = false,
    public level: number = 0
  ) {}
}

export type FlatTreeDataSource<T extends Item> = {
  toggleNode: (node: FlatNode<T>, expand: boolean) => void;
  levelAccessor: (node: FlatNode<T>) => number;
  childrenAccessor: () => (node: FlatNode<T>) => Observable<FlatNode<T>[]>;
  trackBy: (index: number, node: FlatNode<T>) => string;
}
