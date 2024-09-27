export function cepMask(cep: string) {
  if (cep)
    if (cep.length === 8) {
      cep = `${cep.substr(0, 5)}-${cep.substr(5, 9)}`;
    }
  return cep;
}
