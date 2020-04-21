import { Schedule } from '../components/Posts';

export function addOh(num: number) {
  return `${num > 9 ? num : '0' + num}`;
}

export function isTakenNow(schedule: Schedule[]) {
  const currentDate = new Date();
  return schedule.some((el: Schedule) => 
    currentDate >= new Date(el.fromDate) && currentDate <= new Date(el.toDate)
  );
}

export function isTakenNowText(schedule: Schedule[]) {
  return isTakenNow(schedule) ? '(in use now)' : '';
}

export function dateToString(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const mins = date.getMinutes();

  return `${addOh(day)}.${addOh(month)}.${year} ${addOh(hours)}:${addOh(mins)}`;
}