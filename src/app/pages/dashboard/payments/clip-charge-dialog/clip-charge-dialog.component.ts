import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateConcept, CreateLinkIncomesGQL } from '@graphql';
import { PosService } from '@services';

@Component({
  selector: 'app-clip-charge-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './clip-charge-dialog.component.html',
  styles: ``,
})
export class ClipChargeDialogComponent {
  private readonly pos = inject(PosService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _createLinkIncomes = inject(CreateLinkIncomesGQL);

  public loading = signal<boolean>(false);

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
        next: (response) => {
          this.loading.set(false);
          // const link = response.data.createLinkIncomes;
          // this._snackBar.open(`Link generado: ${link.folio}`, 'Cerrar', {
          //   duration: 3000,
          // });
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
