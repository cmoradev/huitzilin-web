import { Injectable, signal } from '@angular/core';
import { Debit, DebitPartsFragment } from '@graphql';

const DEBIT_KEY = 'debits';

@Injectable({
  providedIn: 'root',
})
export class PosService {
  private readonly _debits = signal<DebitPartsFragment[]>([]);

  constructor() {
    this._load();
  }

  get debits(): DebitPartsFragment[] {
    return this._debits();
  }

  public addDebit(value: DebitPartsFragment) {
    this._debits.update((previous) => {
      const debits = [...previous];
      debits.push(value);
      this._store(debits);

      return debits;
    });
  }

  public removeDebit(value: DebitPartsFragment) {
    this._debits.update((previous) => {
      const debits = [...previous];

      const index = debits.findIndex((debit) => debit.id === value.id);

      if (index !== -1) {
        debits.splice(index, 1);
      }

      this._store(debits);

      return debits;
    });
  }

  private _store(debits: DebitPartsFragment[] | null) {
    if (!!debits) {
      sessionStorage.setItem(DEBIT_KEY, JSON.stringify(debits));
    } else {
      sessionStorage.removeItem(DEBIT_KEY);
    }
  }

  private _load() {
    const debits = sessionStorage.getItem(DEBIT_KEY);

    if (debits) {
      this._debits.set(JSON.parse(debits));
    } else {
      this._debits.set([]);
    }
  }
}
