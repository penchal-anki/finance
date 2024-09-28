import { PiCaretDownBold } from 'react-icons/pi';
import Pagination, { type PaginationProps } from '@/components/ui/pagination';
import { Select } from 'rizzui';
import cn from '@/utils/class-names';

const paginationLimitOptions = [8, 15, 20, 25, 30].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}));

export type TablePaginationProps = {
  pageSize: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  paginatorClassName?: string;
} & PaginationProps;

export default function TablePagination({
  pageSize,
  setPageSize,
  total,
  paginatorClassName = 'mt-3 ml-6 mb-2 xs:mt-2 sm:mt-3',
  ...props
}: TablePaginationProps) {

  // if (total && total < pageSize) {
  //   return null;
  // }

  return (
    <div
      className={cn(
        'table-pagination flex items-center justify-center sm:justify-between',
        paginatorClassName
      )}
    >
      {!setPageSize ? (
        total && (
          <div className="hidden text-gray-500 sm:inline-flex">
            {props.current} of {Math.ceil(total / pageSize)} pages
          </div>
        )
      ) : (
        <div className="hidden items-center sm:flex">
          Rows per page:{' '}
          <Select
            options={paginationLimitOptions}
            onChange={setPageSize}
            size="sm"
            variant="flat"
            value={pageSize}
            getOptionValue={({ value }) => value}
            suffix={<PiCaretDownBold />}
            dropdownClassName="!p-1.5 border w-12 border-gray-100 bg-white !z-10 shadow-lg dropdownClassName"
            className="ms-1 w-auto [&_button]:font-medium"
            optionClassName="px-1"
          />
        </div>
      )}
      <Pagination
        total={total}
        pageSize={pageSize}
        defaultCurrent={1}
        showLessItems={true}
        prevIconClassName="py-0 text-gray-500 !leading-[26px]"
        nextIconClassName="py-0 text-gray-500 !leading-[26px]"
        {...props}
      />
    </div>
  );
}
