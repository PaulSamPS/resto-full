export const priceRu = (price: number | undefined): string => {
  if (!price) {
    return '';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');
};
