import cn from '@/utils/class-names';
import { formatDate, formatToLocalDateTime } from '@/utils/format-date';

interface DateCellProps {
  date: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
  dateProps?:string
}

export default function DateCell({
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = 'MMM D, YYYY',
  timeFormat = 'h:mm A',
}: DateCellProps) {
  return (
    <div className={cn(className, 'grid gap-1')}>
      <time
        dateTime={formatDate(date, 'YYYY-MM-DD')}
        className={cn('text-gray-600', dateClassName)}
      >
        {formatDate(date, 'MMM D, YYYY')}
      </time>
      <time
        dateTime={formatDate(date, 'HH:mm:ss')}
        className={cn('text-[14px] text-gray-600', timeClassName)}
      >
        {formatDate(date, timeFormat)}
      </time>
    </div>
  );
}


export function DateFormat({
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = 'MMM D, YYYY',
  timeFormat = 'h:mm A',
  dateProps
}: DateCellProps) {
  return (
    <div className={cn(className, 'grid gap-1',dateProps)}>
      {formatToLocalDateTime(date)}
    </div>
  )
}
