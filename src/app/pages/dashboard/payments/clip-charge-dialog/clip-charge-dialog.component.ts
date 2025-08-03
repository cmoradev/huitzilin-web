import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { Package } from '../../../../graphql/generated';

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
  private readonly _dialogRef = inject(MatDialogRef<ClipChargeDialogComponent>);

  public loading = signal<boolean>(false);
  public created = signal<boolean>(false);
  public income = signal<IncomeWithLinksFragment | null>(null);

  public closeDialog() {
    this._dialogRef.close(this.income());
  }

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

    const studentIDs = Array.from(new Set(this.pos.studentIDs));
    const branchID = this.pos.branchID;

    if (!!studentIDs.length && !!branchID) {
      this._createLinkIncomes
        .mutate({
          input: {
            concepts,
            studentIDs,
            branchID,
          },
        })
        .subscribe({
          next: ({ data }) => {
            this.loading.set(false);
            if (data?.createLinkIncomes) {
              this.created.set(true);
              this.income.set(data.createLinkIncomes);
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
}
