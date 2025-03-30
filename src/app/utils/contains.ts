import { Frequency, EnrollmentState } from '@graphql';

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
