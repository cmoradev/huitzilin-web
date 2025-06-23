import { inject, Injectable, signal } from '@angular/core';
import {
  GetLevelsPageQueryVariables,
  GetLevelsPageGQL,
  LevelPartsFragment,
} from '@graphql';
import { map } from 'rxjs';
import { GlobalStateService } from '../global-state.service';

@Injectable({ providedIn: 'root' })
export class LevelToolsService {
  private readonly _globalState = inject(GlobalStateService);
  private readonly _fetch = inject(GetLevelsPageGQL);

  public options = signal<LevelPartsFragment[]>([]);
  public loading = signal<boolean>(false);

  public fetch(query: string): void {
    if (!!this._globalState.branch?.id) {
      this.loading.set(true);

      const variables: GetLevelsPageQueryVariables = {
        limit: 50,
        filter: {
          name: { iLike: `%${query}%` },
          branchId: { eq: this._globalState.branch!.id },
        },
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
            this.options.set(data.levels.nodes);
            return data.levels.nodes;
          })
        )
        .subscribe({
          next: () => {
            // do nothing
          },
        });
    }
  }

  public fetchAll(accumulared: LevelPartsFragment[] = []): void {
    if (!!this._globalState.branch?.id) {
      this.loading.set(true);

      const limit = 50;
      const offset = accumulared.length;

      const variables: GetLevelsPageQueryVariables = {
        filter: { branchId: { eq: this._globalState.branch!.id } },
        limit,
        offset,
      };

      const fetch$ = this._fetch.watch(variables, {
        fetchPolicy: 'cache-and-network', // Usa cache primero, solo pide a la API si no hay datos en cache
        nextFetchPolicy: 'cache-and-network', // Mantiene la política de cache en siguientes peticiones
        notifyOnNetworkStatusChange: false, // No notifica cambios de red para evitar refetch innecesario
      }).valueChanges;

      fetch$.pipe(map((resp) => resp.data.levels)).subscribe({
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
  }

  public displayFn(option: LevelPartsFragment | null) {
    return option?.name ?? '';
  }
}
