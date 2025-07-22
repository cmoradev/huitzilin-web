import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ClipLink,
  CreateConcept,
  CreateLinkIncomesGQL,
  IncomeWithLinksFragment,
} from '@graphql';
import { FolioPipe } from '@pipes';
import { PosService } from '@services';

@Component({
  selector: 'app-clip-charge-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    CurrencyPipe,
    FolioPipe,
  ],
  templateUrl: './clip-charge-dialog.component.html',
  styleUrls: ['./clip-charge-dialog.component.scss'],
})
export class ClipChargeDialogComponent {
  private readonly pos = inject(PosService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _createLinkIncomes = inject(CreateLinkIncomesGQL);

  public loading = signal<boolean>(false);
  public created = signal<boolean>(false);
  public incomes = signal<IncomeWithLinksFragment[]>([]);

  public shareLinkWhatsApp(link: Partial<ClipLink>) {
    const message = `💳 ¡Hola! Por favor realiza tu pago de $${link.amount?.toFixed(
      2
    )} usando este enlace seguro:
    
    ${link.link} 🙏😊`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  }

  public generateLink() {
    this.loading.set(true);

    const concepts: CreateConcept[] = this.pos.concepts.map((concept) => ({
      description: concept.description,
      debitId: concept.debitId,
      quantity: concept.quantity,
      unitPrice: concept.unitPrice,
      withTax: concept.withTax,
      discounts: concept.discounts.map((discount) => ({
        id: discount.id,
      })),
    }));

    this._createLinkIncomes
      .mutate({
        input: {
          concepts,
        },
      })
      .subscribe({
        next: ({ data }) => {
          this.loading.set(false);
          if (data?.createLinkIncomes) {
            console.log('Link created successfully', data.createLinkIncomes);
            console.log('Link URL:', JSON.stringify(data.createLinkIncomes));
            this.created.set(true);
            this.incomes.set(data.createLinkIncomes);
          }
        },
        error: (error) => {
          this.loading.set(false);
          this._snackBar.open('Error al generar el link', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }
}
