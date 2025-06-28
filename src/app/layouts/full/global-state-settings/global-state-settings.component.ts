import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import {
  BranchPartsFragment,
  CyclePartsFragment,
  GetCompaniesPageGQL,
  GetCyclesPageGQL,
  UpdateOneUserGQL,
  UpdateUser,
} from '@graphql';
import { BranchState, CycleState, GlobalStateService } from '@services';
import { debounceTime, merge, startWith } from 'rxjs';
import { isAfter, isBefore } from 'date-fns';

@Component({
  selector: 'app-global-state-settings',
  imports: [
    MatToolbar,
    MatFormField,
    MatLabel,
    MatInput,
    MatOption,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatIconButton,
    MatIcon,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './global-state-settings.component.html',
  styles: ``,
})
export class GlobalStateSettingsComponent implements AfterViewInit, OnInit {
  @Output() closeSidenavLeft = new EventEmitter<void>();

  public branchControl = new FormControl<BranchState | string>('');
  public branches = signal<BranchPartsFragment[]>([]);
  public loadingBranches = signal<boolean>(false);

  public cycleControl = new FormControl<CycleState | string>('');
  public cycles = signal<CyclePartsFragment[]>([]);
  public loadingCycles = signal<boolean>(false);

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _companiesPageGQL = inject(GetCompaniesPageGQL);
  private readonly _updateOneUserGQL = inject(UpdateOneUserGQL);
  private readonly _cyclesPageGQL = inject(GetCyclesPageGQL);

  ngOnInit(): void {
    if (this._globalStateService.branch?.id) {
      this.branchControl.setValue(this._globalStateService.branch);
    }

    if (this._globalStateService.cycle?.id) {
      this.cycleControl.setValue(this._globalStateService.cycle);
    }
  }

  ngAfterViewInit(): void {
    this.branchControl.valueChanges
      .pipe(debounceTime(300), startWith(''))
      .subscribe({
        next: (value) => {
          if (value && typeof value === 'object') {
            this._globalStateService.branch = value;
            this.cycleControl.setValue('');
            this._updateUser({
              branchId: value.id,
              cycleId: null,
            });
          } else if (typeof value === 'string') {
            this._fetchBranch();
          }
        },
      });

    merge(this.cycleControl.valueChanges)
      .pipe(debounceTime(300), startWith(''))
      .subscribe({
        next: (value) => {
          if (value && typeof value === 'object') {
            this._globalStateService.cycle = value;
            if (this._globalStateService.branch!.id) {
              this._updateUser({
                branchId: this._globalStateService.branch!.id,
                cycleId: value.id,
              });
            }
          } else if (typeof value === 'string') {
            this._fetchCycles();
          }
        },
      });
  }

  public displayFn(value: BranchPartsFragment | CyclePartsFragment): string {
    return value?.name ?? '';
  }

  private _fetchCycles(): void {
    if (this._globalStateService.branch?.id) {
      this.loadingCycles.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._cyclesPageGQL
        .watch(
          {
            limit: 100,
            offset: 0,
            filter: {
              name: { iLike: `%${this.cycleControl.value}%` },
              branchId: { eq: this._globalStateService.branch!.id },
            },
          },
          {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
          }
        )
        .valueChanges.subscribe({
          next: ({ loading, data }) => {
            const nodes = data.cycles.nodes ?? [];
            this.loadingCycles.set(loading);
            this.cycles.set(nodes);
          },
        });
    }
  }

  private _fetchBranch(): void {
    this.loadingBranches.set(true);

    // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
    this._companiesPageGQL
      .watch(
        {
          limit: 100,
          offset: 0,
          filter: { name: { iLike: `%${this.branchControl.value}%` } },
        },
        {
          fetchPolicy: 'cache-and-network',
          nextFetchPolicy: 'cache-and-network',
          notifyOnNetworkStatusChange: true,
        }
      )
      .valueChanges.subscribe({
        next: ({ loading, data }) => {
          this.loadingBranches.set(loading);

          this.branches.set(data?.branches.nodes ?? []);
        },
      });
  }

  private _updateUser(update: UpdateUser): void {
    if (this._globalStateService.session!.id) {
      this._updateOneUserGQL
        .mutate({
          id: this._globalStateService.session!.id,
          update,
        })
        .subscribe({});
    }
  }
}
