import { AfterViewInit, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOption, MatRipple } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { BranchPartsFragment, GetCompaniesPageGQL } from '@graphql';
import { GlobalStateService } from '@services';
import { debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [MatToolbar, MatRipple, MatFormField, MatLabel, MatInput, MatOption, MatAutocompleteTrigger, MatAutocomplete, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent implements AfterViewInit, OnInit {
  private readonly _companiesPageGQL = inject(GetCompaniesPageGQL);
  private readonly _globalStateService = inject(GlobalStateService);

  public searchControl = new FormControl<BranchPartsFragment | string>('');
  public loading = signal<boolean>(false);
  public finding = signal<boolean>(false);
  public branchs = signal<BranchPartsFragment[]>([]);
  public currentBranch = computed(() => this._globalStateService.branch);

  ngOnInit(): void {
    this.finding.set(!this.currentBranch());
  }

  ngAfterViewInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), startWith(''))
      .subscribe({
        next: (value) => {
          if (value && typeof value === 'object') {
            this.toggleFinding();
            this._globalStateService.branch = value;
          } else if (typeof value === 'string') {
            this._fetchBranch();
          }
        },
      });
  }

  public displayFn(branch: BranchPartsFragment): string {
    return branch?.name ?? '';
  }

  public toggleFinding() {
    this.finding.update(prev => !prev);
  }

  private _fetchBranch(): void {
    this.loading.set(true);

    // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
    this._companiesPageGQL
      .watch({
        limit: 100,
        offset: 0,
        filter: { name: { iLike: `%${this.searchControl.value}%` } },
      })
      .valueChanges.subscribe({
        next: ({ loading, data }) => {
          this.loading.set(loading);

          this.branchs.set(data?.branches.nodes ?? []);
        },
      });
  }
}
