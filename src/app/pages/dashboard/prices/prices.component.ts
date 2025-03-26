import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem, MatListItemTitle, MatListItemIcon } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CoursePartsFragment, GetCoursePageGQL } from '@graphql';
import { AuthService } from '@services';
import { filter } from 'rxjs';

@Component({
  selector: 'app-prices',
  imports: [
    MatCard,
    MatIcon,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIconButton,
    MatProgressBar,
    MatMenu,
    MatMenuItem, 
    MatMenuTrigger,
    MatList,
    MatListItem,
    MatListItemTitle
  ],
  templateUrl: './prices.component.html',
  styles: ``,
})
export class PricesComponent implements OnInit {
  private readonly _authService = inject(AuthService);

  private readonly _coursesPageGQL = inject(GetCoursePageGQL);
  public courses = signal<CoursePartsFragment[]>([]);
  public loading = signal<boolean>(false);
  public totalCount = signal<number>(0);

  ngOnInit(): void {
    this._authService.branch$.pipe(filter((branch) => !!branch)).subscribe({
      next: (branch) => {
        this._fetch(branch.id);
      },
    });
  }

  private _fetch(branchId: string): void {
    this.loading.set(true);

    // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
    this._coursesPageGQL
      .watch({
        filter: {
          branchId: { eq: branchId },
        },
        limit: 100,
        offset: 0,
      })
      .valueChanges.subscribe({
        next: ({ data, loading }) => {
          const { nodes, pageInfo, totalCount } = data.courses;

          this.courses.set(nodes);
          this.loading.set(loading);
          this.totalCount.set(totalCount);
        },
      });
  }
}
