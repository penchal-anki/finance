import { Select, type SelectProps, type SelectOption } from 'rizzui';
import cn from '@/utils/class-names';

export default function StatusField({
  placeholder = 'Select status',
  dropdownClassName,
  selectClassName,
  optionClassName,
  ...props
}: SelectProps<SelectOption>) {
  return (
    <Select
      inPortal={false}
      placeholder={placeholder}
      selectClassName={`h-9 min-w-[150px] ${selectClassName}`}
      dropdownClassName={cn('p-1.5 !z-0', dropdownClassName)}
      optionClassName={cn('h-9',optionClassName)}
      {...props}
    />
  );
}
