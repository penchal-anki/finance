import { Title, Text, Button } from 'rizzui';
// import TrashIcon from '@/components-ysly/icons/trash';
import { PiTrashFill } from 'react-icons/pi';
import { Fragment, useRef, useState } from 'react';
import { Popover, Transition } from '@headlessui/react'

type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete: () => void;
  isActive: boolean;
  children?: any
};

export default function DeletePopover({
  title,
  description,
  onDelete,
  children
}: DeletePopoverProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <Popover placement="left">
    //   <Popover.Trigger>
    //     <div ref={triggerRef}>
    //       {children}
    //     </div>
    //   </Popover.Trigger>
    //   <Popover.Content className="z-0 bg-white">
    //     {({ setOpen }) => (
    //       <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
    //         <Title
    //           as="h6"
    //           className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
    //         >
    //           <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
    //         </Title>
    //         <Text className="mb-2 leading-relaxed text-gray-500">
    //           {description}
    //         </Text>
    //         <div className="flex items-center justify-end">
    //           <Button size="sm" className="me-1.5 h-7 text-white"
    //             onClick={() => {
    //               onDelete()
    //               setOpen(false)
    //             }}>
    //             Yes
    //           </Button>
    //           <Button
    //             size="sm"
    //             variant="outline"
    //             className="h-7"
    //             onClick={() => setOpen(false)}
    //           >
    //             No
    //           </Button>
    //         </div>
    //       </div>
    //     )}
    //   </Popover.Content>
    // </Popover>
    <Popover className="relative">
      <Popover.Button
        onClick={() => setIsOpen(true)}
        className="inline-flex outline-none items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
      >
        {children}
      </Popover.Button>
      {isOpen &&
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 top-0 right-0 w-[420px] h-full flex justify-center items-center">
            <div className="w-[80%] mb-[38px] px-4 py-2 text-left rtl:text-right bg-white rounded-lg shadow-lg">
              <Title
                as="h6"
                className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
              >
                <PiTrashFill className="me-1 h-[20px] w-[20px]" /> {title}
              </Title>
              <Text className="mb-2 text-[13px] leading-relaxed text-gray-500">
                {description}
              </Text>
              <div className="flex items-center justify-end">
                <Button size="sm" className="me-1.5 h-7 text-white"
                  onClick={() => {
                    onDelete();
                    setIsOpen(false);
                  }}>
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7"
                  onClick={() => setIsOpen(false)}
                >
                  No
                </Button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      }
    </Popover>

    // <div className="relative">
    //   <div onClick={() => setIsOpen(true)}>
    //     {children}
    //   </div>
    //   {isOpen && (
    //     <div className="absolute z-10 top-0 right-0 w-[420px] h-full flex justify-center items-center">
    //       <div className="w-[80%] px-6 py-4 text-left rtl:text-right bg-white rounded-lg shadow-lg">
    //         <Title
    //           as="h6"
    //           className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
    //         >
    //           <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
    //         </Title>
    //         <Text className="mb-2 leading-relaxed text-gray-500">
    //           {description}
    //         </Text>
    //         <div className="flex items-center justify-end">
    //           <Button size="sm" className="me-1.5 h-7 text-white"
    //             onClick={() => {
    //               onDelete();
    //               setIsOpen(false);
    //             }}>
    //             Yes
    //           </Button>
    //           <Button
    //             size="sm"
    //             variant="outline"
    //             className="h-7"
    //             onClick={() => setIsOpen(false)}
    //           >
    //             No
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}
