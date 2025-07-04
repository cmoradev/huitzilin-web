import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { PosService } from '@services';

@Component({
  selector: 'app-sale-details',
  imports: [JsonPipe],
  templateUrl: './sale-details.component.html',
  styles: ``
})
export class SaleDetailsComponent {
  private readonly _pos = inject(PosService);

  public debits = computed(() => this._pos.debits);

}
