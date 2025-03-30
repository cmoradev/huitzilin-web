import { Frequency, EnrollmentState, DebitState } from '@graphql';

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
