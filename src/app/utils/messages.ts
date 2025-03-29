export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
    unauthenticated: () => 'Credenciales no validas',
    required: () => `Campo requerido`,
    notAvailable: () => 'Este registro ya esta en uso',
    email: () => `Dirección de correo electrónico válida`,
    min: (requirement: string) => `El valor debe ser mayor a ${requirement}.`,
    max: (requirement: string) => `El valor debe ser menor a ${requirement}.`,
    minLength: (requirement: string) => `El valor debe tener al menos ${requirement} caracteres.`,
    maxLength: (requirement: string) => `El valor no puede tener más de ${requirement} caracteres.`,
    endDateInvalid: () => `La fecha de finalización debe ser mayor a la fecha de inicio`,
    studentNotFound: () => `El estudiante no fue encontrado`,
  };