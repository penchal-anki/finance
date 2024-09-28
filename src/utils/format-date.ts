import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';


dayjs.extend(relativeTime);
dayjs.extend(utc);

export function formatDate(
  date?: Date,
  format: string = 'MMM DD, YYYY'
): string {
  if (!date) return '';
  return dayjs(date).format(format);
}

export function formatToLocalDateTime(date: any) {
  return dayjs.utc(date).local().format('MMM D, YYYY, h:mm A');
}

export function formatDateToYYYYMMDD(date?: Date): string {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
}


export function formatDateWithRelativeTime(timestamp: string): string {
  // Convert the timestamp to a dayjs object
  const date = dayjs.utc(timestamp);

  // Get the current date and time
  const now = dayjs.utc();

  // Check if the date is today
  if (date.isSame(now, 'day')) {
    return `Today at ${date.format('h:mm A')}`;
  }
  // Check if the date was yesterday
  else if (date.isSame(now.subtract(1, 'day'), 'day')) {
    return `Yesterday at ${date.format('h:mm A')}`;
  }
  // If the date is not today or yesterday, format it
  else {
    return date.format('dddd h:mm A DD-MM-YYYY');
  }
}