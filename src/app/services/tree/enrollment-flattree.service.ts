import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { inject, Injectable } from '@angular/core';
import {
  EnrollmentFilter,
  EnrollmentPartsFragment,
  GetEnrollmentsPageGQL,
  GetEnrollmentsPageQueryVariables,
} from '@graphql';
import { NodeList, FlatNode, FlatTreeDataSource } from '@models';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnrollmentFlatTreeService {
  private readonly _fetchEnrollments = inject(GetEnrollmentsPageGQL);

  public loadRoots(
    params: GetEnrollmentsPageQueryVariables
  ): Observable<NodeList<EnrollmentPartsFragment>> {
    return this._fetchEnrollments
      .watch(params, {
        fetchPolicy: 'no-cache',
        nextFetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(
        map(({ data, loading }) => ({
          loading,
          totalCount: data.enrollments?.totalCount || 0,
          hasPreviousPage: !!data.enrollments?.pageInfo?.hasPreviousPage,
          hasNextPage: !!data.enrollments?.pageInfo?.hasNextPage,
          nodes: data.enrollments.nodes.map((item) => {
            const expandable = item.children?.totalCount > 0;

            return new FlatNode<EnrollmentPartsFragment>(item, expandable);
          }),
        }))
      );
  }

  loadChildren(
    parentId: string,
    level: number = 0
  ): Observable<NodeList<EnrollmentPartsFragment>> {
    const filter: EnrollmentFilter = {
      parentId: { eq: parentId },
    };

    return this._fetchEnrollments
      .watch(
        { limit: 50, offset: 0, filter },
        {
          fetchPolicy: 'no-cache',
          nextFetchPolicy: 'no-cache',
        }
      )
      .valueChanges.pipe(
        map(({ data, loading }) => ({
          loading,
          totalCount: data.enrollments?.totalCount || 0,
          hasPreviousPage: !!data.enrollments?.pageInfo?.hasPreviousPage,
          hasNextPage: !!data.enrollments?.pageInfo?.hasNextPage,
          nodes: data.enrollments.nodes.map((item) => {
            const expandable = item.children?.totalCount > 0;

            return new FlatNode<EnrollmentPartsFragment>(
              item,
              expandable,
              level
            );
          }),
        }))
      );
  }
}

export class DepartmentDataSource
  implements
    DataSource<FlatNode<EnrollmentPartsFragment>>,
    FlatTreeDataSource<EnrollmentPartsFragment>
{
  private readonly _data = new BehaviorSubject<
    FlatNode<EnrollmentPartsFragment>[]
  >([]);

  get data(): FlatNode<EnrollmentPartsFragment>[] {
    return this._data.value;
  }

  set data(value: FlatNode<EnrollmentPartsFragment>[]) {
    this._data.next(value);
  }

  constructor(private readonly _database: EnrollmentFlatTreeService) {}

  connect(
    collectionViewer: CollectionViewer
  ): Observable<FlatNode<EnrollmentPartsFragment>[]> {
    return merge(collectionViewer.viewChange, this._data).pipe(
      map(() => this.data)
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  public toggleNode(node: FlatNode<EnrollmentPartsFragment>, expand: boolean) {
    const index = this.data.indexOf(node);

    if (index < 0) return;

    node.isLoading.set(true);

    if (expand) {
      this._database
        .loadChildren(node.item.id, node.level + 1)
        .subscribe(({ nodes, loading }) => {
          const ids = new Set(this.data.map((n) => n.item.id));

          const newNodes = nodes.filter((n) => !ids.has(n.item.id));

          this.data.splice(index + 1, 0, ...newNodes);

          this._data.next(this.data);

          node.isLoading.set(loading);
        });
    } else {
      // Remove all child nodes of the collapsed node
      let removeCount = 0;

      // Count how many subsequent nodes are children (deeper level)
      for (
        let i = index + 1;
        i < this.data.length && this.data[i].level > node.level;
        i++, removeCount++
      ) {}

      // Remove the child nodes from the data array
      this.data.splice(index + 1, removeCount);

      // Emit the updated data
      this._data.next(this.data);

      // Set loading to false
      node.isLoading.set(false);
    }
  }

  public levelAccessor(node: FlatNode<EnrollmentPartsFragment>): number {
    return node.level;
  }

  public childrenAccessor(): (
    node: FlatNode<EnrollmentPartsFragment>
  ) => Observable<FlatNode<EnrollmentPartsFragment>[]> {
    return (node: FlatNode<EnrollmentPartsFragment>) =>
      this._database
        .loadChildren(node.item.id, node.level + 1)
        .pipe(map(({ nodes }) => nodes));
  }

  public trackBy(_: number, node: FlatNode<EnrollmentPartsFragment>): string {
    return node.item.id;
  }
}
