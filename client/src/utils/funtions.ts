export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
}

export const municipioString = (municipio: number): string => {
  const municipios: { [key: string]: string } = {
    39629: 'YUMBO',
    39630: 'VIJES',
    39631: 'CUMBRE',
    39632: 'JAMUNDI'
  };
  return municipios[municipio] || 'NO DEFINIDO';
}