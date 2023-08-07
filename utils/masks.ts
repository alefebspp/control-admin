export const formatTimeInput = (value: string | undefined) => {
  if (!value) return '';

  const onlyNumbers = value.replace(/\D/g, '');

  if (onlyNumbers.length >= 3) {
    const hours = onlyNumbers.slice(0, 2);
    const minutes = onlyNumbers.slice(2, 4);
    return `${hours}:${minutes}`;
  }

  return onlyNumbers;
};
