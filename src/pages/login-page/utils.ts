export function isValidPassword(pass: string) {
  const letter = /[a-zA-Z]/;
  const number = /[0-9]/;
  return letter.test(pass) && number.test(pass);
}
