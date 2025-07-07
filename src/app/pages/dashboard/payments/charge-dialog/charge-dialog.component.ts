import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-charge-dialog',
  imports: [MatDialogModule, MatTabsModule, MatIconModule, MatButtonModule],
  templateUrl: './charge-dialog.component.html',
  styles: ``
})
export class ChargeDialogComponent {
  public loading = signal<boolean>(false);
}
