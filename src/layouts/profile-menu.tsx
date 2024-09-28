'use client';

import { Title, Text, Avatar, Button, Popover } from 'rizzui';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/app/root-lib';


const menuItems = [
  {
    name: 'User Management',
    href: '/settings/user-settings',
  }
];


function DropdownMenu({ email, signOut, name }: any) {
  return (
    <div className="w-72 text-left rtl:text-right bg-white">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src=""
          name={name}
          color="info"
        />
        <div className="ml-3">
          <Title as="h6" className="font-semibold capitalize">
            {name}
          </Title>
          <Text className="text-gray-600">penchal.anki@gmail.com</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="capitalize group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}




export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { appContextData, setAppContextData } = useContext<any>(AppContext);
  const { currentUserInfo } = appContextData;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const signOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    setAppContextData({});
    router.push(routes.signIn)
  }

  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar
            src=""
            name={currentUserInfo.name}
            color="info"
            className={cn('!h-9 w-9 sm:!h-10 sm:w-10', avatarClassName)}
          />
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu
          router={router}
          email={currentUserInfo?.email}
          signOut={signOut}
          name={currentUserInfo?.name}
        />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}
