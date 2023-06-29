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

export function formatDateWithWords(date: Date) {
  const jourSemaine = new Intl.DateTimeFormat("fr-EU", {weekday:"long"}).format(date)
  const jourMois = date.getDate()
  const mois = new Intl.DateTimeFormat("fr-EU", {month:"long"}).format(date)
  return `${jourSemaine} ${jourMois} ${mois}`
}

export const getObjectFromSessionStorage = (key: string) => {
  const storedItem = sessionStorage.getItem(key);

  let item = null
  if ( storedItem ) {
    item = JSON.parse(storedItem)
  }
  return item
}