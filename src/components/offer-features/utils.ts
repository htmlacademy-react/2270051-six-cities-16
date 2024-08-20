export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pluralize (count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}
