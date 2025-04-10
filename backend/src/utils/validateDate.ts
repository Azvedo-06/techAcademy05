export function validateBookDate(date: Date): Date {
  if (!date) {
    throw "Data de publicação é obrigatória";
  }
  return new Date(date);
}

export function validateAuthorDate(date: Date): Date {
  if (!date) {
    throw "Data de nascimento é obrigatória";
  }
  return new Date(date);
}
