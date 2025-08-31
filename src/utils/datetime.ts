import { numToString } from './numToString';

export const getDateString = (d: any) => {
  const date = new Date(d);
  return `${numToString(date.getDate())}/${numToString(
    date.getMonth() + 1,
  )}/${date.getFullYear()}`;
};

export const getTimeString = (d: any) => {
  const date = new Date(d);
  return `${numToString(date.getHours())}:${numToString(date.getMinutes())}`;
};

export const getDateTimeString = (d: any) => {
  return `${getDateString(d)} ${getTimeString(d)}`;
};
