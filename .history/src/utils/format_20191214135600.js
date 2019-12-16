import { format, parseISO } from 'date-fns';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatDatePicker = value => {
  if (!value) return null;
  const dateFormatted = format(parseISO(value), 'yyyy-MM-dd');

  return dateFormatted;
};
