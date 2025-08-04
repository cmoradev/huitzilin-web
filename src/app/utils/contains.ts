import {
  Frequency,
  EnrollmentState,
  DebitState,
  DiscountBy,
  PackageKind,
  PaymentMethod,
} from '@graphql';

export const discountTypes = [
  {
    label: 'Porcentaje',
    value: DiscountBy.Percentage,
  },
  {
    label: 'Monto fijo',
    value: DiscountBy.Fixed,
  },
];

export const frequencies = [
  {
    label: 'Único (una vez)',
    value: Frequency.Single,
  },
  {
    label: 'Mensual (una vez al mes)',
    value: Frequency.Monthly,
  },
  {
    label: 'Semanal (una vez a la semana)',
    value: Frequency.Weekly,
  },
  {
    label: 'Diario (una vez al día)',
    value: Frequency.Daily,
  },
  {
    label: 'Por hora (una vez por hora)',
    value: Frequency.Hourly,
  },
];

export const debitStates = [
  {
    label: 'Cancelado (no pagado)',
    value: DebitState.Canceled,
  },
  {
    label: 'Condonado (no pagado)',
    value: DebitState.Condoned,
  },
  {
    label: 'Adeudado (no pagado)',
    value: DebitState.Debt,
  },
  {
    label: 'Pagado (pagado)',
    value: DebitState.Paid,
  },
  {
    label: 'Abonado (parcialmente pagado)',
    value: DebitState.PartiallyPaid,
  },
];

export const enrollmentStates = [
  {
    label: 'Activo',
    value: EnrollmentState.Active,
  },
  {
    label: 'Inactivo (terminado)',
    value: EnrollmentState.Inactive,
  },
  {
    label: 'Pausado (en espera)',
    value: EnrollmentState.Paused,
  },
];

export const packageKinds = [
  {
    label: 'Por horas',
    value: PackageKind.Hours,
  },
  {
    label: 'Por cantidad',
    value: PackageKind.Quantity,
  },
  {
    label: 'Ilimitado',
    value: PackageKind.Unlimited,
  },
];

export const daysOfWeek = [
  { label: 'Domingo', value: '0' },
  { label: 'Lunes', value: '1' },
  { label: 'Martes', value: '2' },
  { label: 'Miércoles', value: '3' },
  { label: 'Jueves', value: '4' },
  { label: 'Viernes', value: '5' },
  { label: 'Sábado', value: '6' },
];

export const daysOfWeekMap = new Map<string, string>([
  ['0', 'Domingo'],
  ['1', 'Lunes'],
  ['2', 'Martes'],
  ['3', 'Miércoles'],
  ['4', 'Jueves'],
  ['5', 'Viernes'],
  ['6', 'Sábado'],
]);

export const studentDocuments = [
  { label: 'Acta de nacimiento', value: 'acta_de_nacimiento' },
  { label: 'CURP', value: 'curp' },
  { label: 'Pasaporte', value: 'pasaporte' },
  { label: 'Boleta/Certificado', value: 'certificado' },
  { label: 'Comprobante de domicilio', value: 'comprobante_de_domicilio' },
  { label: 'INE madre', value: 'ine1' },
  { label: 'INE padre', value: 'ine2' },
];

export const defaultDate = '2025-06-15';

export const paymentNames: Record<PaymentMethod, string> = {
  [PaymentMethod.Card]: 'Tarjeta',
  [PaymentMethod.Cash]: 'Efectivo',
  [PaymentMethod.Transfer]: 'Transferencia',
  [PaymentMethod.Clip]: 'Clip',
};

export const paymentIcons: Record<PaymentMethod, string> = {
  [PaymentMethod.Card]: 'credit-card',
  [PaymentMethod.Cash]: 'cash',
  [PaymentMethod.Transfer]: 'bank-transfer-in',
  [PaymentMethod.Clip]: 'clipboard',
};
