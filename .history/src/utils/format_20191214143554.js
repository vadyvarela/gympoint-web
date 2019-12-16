import { format, parseISO } from 'date-fns';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatCurrency = value => {
  if (!value) return value;
  value = value.replace(/\./g, ',');
  const index = value.lastIndexOf(',');
  const first = `${value.substr(0, index).replace(/,/g, '')}`;
  const decimal = `${value.substr(index).replace(',', '.')}`;
  const currency = Number(`${first}${decimal}`);

  return currency;
};

export const formatDatePicker = value => {
  if (!value) return null;
  const dateFormatted = format(parseISO(value), 'yyyy-MM-dd');

  return dateFormatted;
};
