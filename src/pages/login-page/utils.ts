export function isValidPassword(pass: string) {
  const password = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
  return password.test(pass);
}
