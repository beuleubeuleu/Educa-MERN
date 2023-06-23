export const slugify = (string: string): string =>
    string
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .split(" ")
        .join("-");

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("fr-EU");
}