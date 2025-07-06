import { Component, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-charge-dialog',
  imports: [MatDialogModule],
  templateUrl: './charge-dialog.component.html',
  styles: ``
})
export class ChargeDialogComponent {
  public loading = signal<boolean>(false);
}
