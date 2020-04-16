export function addOh(num: number) {
  return `${num > 9 ? num : '0' + num}`;
}

export function dateToString(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const mins = date.getMinutes();

  return `${addOh(day)}.${addOh(month)}.${year} ${addOh(hours)}:${addOh(mins)}`;
}