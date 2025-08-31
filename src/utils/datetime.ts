import { numToString } from './numToString';

export const getDateString = (d: any) => {
  const date = new Date(d);
  return `${numToString(date.getDate())}/${numToString(
    date.getMonth() + 1,
  )}/${date.getFullYear()}`;
};
