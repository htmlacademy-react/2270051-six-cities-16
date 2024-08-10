export function isValidPassword(pass: string) {
  const letter = /[a-zA-Zа-яА-Я]/;
  const number = /[0-9]/;
  return letter.test(pass) && number.test(pass);
}
