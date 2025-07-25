import { inject, Injectable, signal } from '@angular/core';
import {
  ClipAccountPartsFragment,
  GetClipAccountsPageGQL,
  GetClipAccountsPageQueryVariables,
} from '@graphql';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClipAccountToolsService {
  private readonly _fetch = inject(GetClipAccountsPageGQL);

  public options = signal<ClipAccountPartsFragment[]>([]);
  public loading = signal<boolean>(false);

  public fetch(query: string): void {
    this.loading.set(true);

    const variables: GetClipAccountsPageQueryVariables = {
      limit: 50,
      filter: { name: { iLike: `%${query}%` } },
    };

    const fetch$ = this._fetch.watch(variables, {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    }).valueChanges;

    fetch$
      .pipe(
        map(({ data, loading }) => {
          this.loading.set(loading);
          this.options.set(data.clipAccounts.nodes);
          return data.clipAccounts.nodes;
        })
      )
      .subscribe({
        next: () => {
          // do nothing
        },
      });
  }

  public fetchAll(accumulared: ClipAccountPartsFragment[] = []): void {
    this.loading.set(true);

    const limit = 50;
    const offset = accumulared.length;

    const variables: GetClipAccountsPageQueryVariables = {
      limit,
      offset,
    };

    const fetch$ = this._fetch.watch(variables, {
      fetchPolicy: 'cache-and-network', // Usa cache primero, solo pide a la API si no hay datos en cache
      nextFetchPolicy: 'cache-and-network', // Mantiene la política de cache en siguientes peticiones
      notifyOnNetworkStatusChange: false, // No notifica cambios de red para evitar refetch innecesario
    }).valueChanges;

    fetch$.pipe(map((resp) => resp.data.clipAccounts)).subscribe({
      next: ({ nodes, totalCount }) => {
        const allItems = accumulared.concat(nodes);

        if (allItems.length >= totalCount) {
          this.options.set(allItems);
          this.loading.set(false);
          return; // No more fees to fetch
        }

        this.fetchAll(allItems);
      },
      error: (error) => {
        console.error('Error fetching disciplines', error);
      },
    });
  }

  public displayFn(option: ClipAccountPartsFragment | null) {
    return option?.name ?? '';
  }
}
