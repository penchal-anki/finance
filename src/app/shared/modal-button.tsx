'use client';

import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Button, type ButtonProps } from '@/components/ui/button';

interface ModalButtonProps extends ButtonProps {
  label?: string;
  className?: string;
  customSize?: string;
  icon?: React.ReactNode;
  view: React.ReactNode;
}

export default function ModalButton({
  label = 'Add New',
  className,
  customSize = '500px',
  view,
  icon = <PiPlusBold className="mr-1.5 h-[17px] w-[17px]" />,
  disabled,
  ...rest
}: ModalButtonProps) {
  const { openModal } = useModal();
  const buttonStyle = `mt-5 w-full text-xs capitalize lg:w-auto bg-[#669F2A] text-white dark:active:bg-gray-100 sm:text-sm lg:mt-0 ${disabled ? '!bg-gray-100' : '!bg-[#669F2A]'}`

  return (
    <div>
      <Button
        buttonStyles="!text-sm !h-10"
        onClick={() => {
          openModal({
            view,
            customSize,
          })
        }
        }
        {...rest}
        disabled={disabled}
      >
        {icon}
        {label}
      </Button>
    </div>
  );
}
