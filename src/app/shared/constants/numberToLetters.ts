export function convertirNumeroALetras(numero: number): string {
  const unidades = [
    '',
    'uno',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve',
    'diez',
    'once',
    'doce',
    'trece',
    'catorce',
    'quince',
    'dieciséis',
    'diecisiete',
    'dieciocho',
    'diecinueve',
    'veinte',
    'veintiuno',
    'veintidos',
    'veintitres',
    'veinticuatro',
    'veinticinco',
    'veintiseis',
    'veintisiete',
    'veintiocho',
    'veintinueve',
  ];

  const decenas = [
    '',
    '',
    'veinte',
    'treinta',
    'cuarenta',
    'cincuenta',
    'sesenta',
    'setenta',
    'ochenta',
    'noventa',
  ];

  const centenas = [
    '',
    'ciento',
    'doscientos',
    'trescientos',
    'cuatrocientos',
    'quinientos',
    'seiscientos',
    'setecientos',
    'ochocientos',
    'novecientos',
  ];

  const separadorDecimal = 'con';
  const divisorDecimal = 100;

  if (numero === 0) {
    return 'cero';
  }

  if (numero < 0) {
    return 'menos ' + convertirNumeroALetras(Math.abs(numero));
  }

  let letras = '';

  if (Math.floor(numero / 1000000) > 0) {
    letras +=
      convertirNumeroALetras(Math.floor(numero / 1000000)) +
      (numero >= 2000000 ? ' millones ' : ' millón ');
    numero %= 1000000;
  }

  if (Math.floor(numero / 1000) > 0) {
    letras += convertirNumeroALetras(Math.floor(numero / 1000)) + ' mil ';
    numero %= 1000;
  }

  if (Math.floor(numero / 100) > 0) {
    letras += centenas[Math.floor(numero / 100)] + ' ';
    numero %= 100;
  }

  if (numero > 0) {
    if (numero < 30) {
      letras += unidades[Math.floor(numero)];
    } else {
      letras += decenas[Math.floor(numero / 10)];
      if (numero % 10 > 0) {
        letras += ' y ' + unidades[numero % 10];
      }
    }
  }

  letras = letras.trim();

  const parteDecimal = Math.round((numero % 1) * divisorDecimal);
  if (parteDecimal > 0) {
    letras += ` ${separadorDecimal} ${parteDecimal}/100`;
  }

  return letras;
}
