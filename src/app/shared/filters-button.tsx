'use client';
import {
  useDrawer,
  type DrawerPlacements,
} from '@/app/shared/drawer-views/use-drawer';
import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import { PiFunnel } from 'react-icons/pi';

interface FiltersButtonProps {
  className?: string;
  modalView: React.ReactNode;
  placement: DrawerPlacements;
}

export default function FiltersButton({
  className,
  placement,
  modalView,
}: FiltersButtonProps) {
  const { openDrawer } = useDrawer();
  return (
    <Button
      className={cn(
        'mt-4 w-full cursor-pointer @lg:mt-0 @lg:w-auto text-gray-700',
        className
      )}
      onClick={() =>
        openDrawer({
          view: modalView,
          placement,
        })
      }
      variant='outline'
    >
      <PiFunnel className="me-1 h-4 w-4 text-gray-700" />
      Filters
    </Button>
  );
}
