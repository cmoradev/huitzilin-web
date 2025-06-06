import { DiscountBy } from '@graphql';
import Decimal from 'decimal.js';

/**
 * Calculates the tax based on a fixed rate.
 */
export enum TaxEnum {
  Zero = 0,
  Sixteen = 16,
}

/**
 * Calcula el importe base y los impuestos a partir del total y el porcentaje de impuestos.
 * @param total Monto total (importe + impuestos)
 * @param taxRate Porcentaje de impuestos (por ejemplo, 16 para 16%)
 * @returns Un objeto con importe e impuestos
 */
export function calculateAmountFromTotalAndTax(
  total: number,
  taxRate: number = TaxEnum.Sixteen
): { amount: number; taxes: number } {
  const totalDecimal = new Decimal(total);
  const rateDecimal = new Decimal(taxRate).dividedBy(100);
  const amount = totalDecimal.dividedBy(rateDecimal.plus(1));
  const taxes = totalDecimal.minus(amount);

  return {
    amount: Number(amount.toFixed(2)),
    taxes: Number(taxes.toFixed(2)),
  };
}

/**
 * Calcula el total y los impuestos a partir del importe base y el porcentaje de impuestos.
 * @param importe Importe base sin impuestos
 * @param taxRate Porcentaje de impuestos (por ejemplo, 16 para 16%)
 * @returns Un objeto con total e impuestos
 */
export function calculateTotalFromBaseAndTax(
  amount: number,
  taxRate: number = TaxEnum.Sixteen
) {
  const amountDecimal = new Decimal(amount);
  const rateDecimal = new Decimal(taxRate).dividedBy(100);
  const taxes = amountDecimal.times(rateDecimal);
  const total = amountDecimal.plus(taxes);

  return {
    total: Number(total.toFixed(2)),
    taxes: Number(taxes.toFixed(2)),
  };
}

/**
 * Calcula el importe a partir del precio unitario y la cantidad.
 * @param unitPrice Precio unitario
 * @param quantity Cantidad
 * @returns Importe total
 */
export function calculateAmountFromUnitPriceAndQuantity(
  unitPrice: number = 0,
  quantity: number = 0
): number {
  const unitPriceDecimal = new Decimal(unitPrice);
  const quantityDecimal = new Decimal(quantity);
  return Number(unitPriceDecimal.times(quantityDecimal).toFixed(2));
}

/**
 * Calcula el descuento a partir de un importe y una lista de descuentos.
 * @param amount Importe total
 * @param discounts Lista de descuentos aplicables
 * @returns Un objeto con el descuento total y el subtotal después de aplicar los descuentos
 */
export function calculateDiscountFromAmountAndDiscounts(
  amount: number,
  discounts: { value: number; type: DiscountBy }[]
) {
  const amountDecimal = new Decimal(amount);

  let discountTotal = new Decimal(0);

  for (const discount of discounts) {
    const valueDecimal = new Decimal(discount.value);

    if (discount.type === DiscountBy.Percentage) {
      discountTotal = discountTotal.plus(
        amountDecimal.times(valueDecimal).dividedBy(100)
      );
    } else if (discount.type === DiscountBy.Fixed) {
      discountTotal = discountTotal.plus(valueDecimal);
    }
  }

  const subtotalDecimal = amountDecimal.minus(discountTotal);

  return {
    discount: Number(discountTotal.toFixed(2)),
    subtotal: Number(subtotalDecimal.toFixed(2)),
  };
}

export function calculateTaxesFromSubtotal(
  subtotal: number,
  taxRate: number = TaxEnum.Sixteen
) {
  const subtotalDecimal = new Decimal(subtotal);
  const rateDecimal = new Decimal(taxRate).dividedBy(100);

  const taxesDecimal = subtotalDecimal.times(rateDecimal);
  const totalDecimal = subtotalDecimal.plus(taxesDecimal);

  return {
    subtotal: Number(subtotalDecimal.toFixed(2)),
    taxes: Number(taxesDecimal.toFixed(2)),
    total: Number(totalDecimal.toFixed(2)),
  };
}
