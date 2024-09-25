export const formatNumberWithComma = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
