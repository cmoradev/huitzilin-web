import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { DebitPartsFragment, DebitState } from '@graphql';
import { DebitStatePipe } from '@pipes';

@Component({
  selector: 'app-debit-item',
  imports: [
    NgClass,
    MatIcon,
    MatIconButton,
    MatListModule,
    MatMenu,
    MatMenuItem,
    MatTooltip,
    MatMenuTrigger,
    DebitStatePipe,
    CurrencyPipe,
  ],
  templateUrl: './debit-item.component.html',
  styles: ``,
})
export class DebitItemComponent {
  @Input({ required: true }) debit!: DebitPartsFragment;
  @Input() menuTrigger!: MatMenuTrigger;

  @Output() update = new EventEmitter<DebitPartsFragment>();
  @Output() delete = new EventEmitter<DebitPartsFragment>();

  public openMenu(event: MouseEvent) {
    event.stopPropagation();
    if (this.menuTrigger) {
      this.menuTrigger.openMenu();
    }
  }
}
