export const convertDistance = (num: number) => {
  if (!num)
    return '';
  return `${(num / 1000).toFixed(2)}km`;
}