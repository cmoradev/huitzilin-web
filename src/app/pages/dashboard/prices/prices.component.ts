import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-prices',
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  templateUrl: './prices.component.html',
  styles: ``,
})
export class PricesComponent {}
