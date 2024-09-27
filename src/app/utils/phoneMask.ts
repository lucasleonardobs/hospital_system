export function phoneMask(number: any) {
  var x = number.replace(/\D/g, '').match(/(\d{2})(\d{5})(\d{4})/);
  number = '(' + x[1] + ') ' + x[2] + '-' + x[3];
  return number;
}
