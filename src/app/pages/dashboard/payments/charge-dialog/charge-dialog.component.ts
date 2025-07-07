import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PosService } from '@services';
import { CurrencyPipe } from '@angular/common';
import { ChargeFormComponent } from '../charge-form/charge-form.component';

@Component({
  selector: 'app-charge-dialog',
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    ChargeFormComponent,
  ],
  templateUrl: './charge-dialog.component.html',
  styles: ``,
})
export class ChargeDialogComponent {
  private readonly pos = inject(PosService);

  public loading = signal<boolean>(false);
  public total = computed(() => this.pos.total);
  public remainingAmount = signal<number>(0);
}
