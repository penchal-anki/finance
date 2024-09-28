'use client';
import { Avatar, Button, Popover, Title, Text, Tooltip } from 'rizzui';
import cn from '@/utils/class-names';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { Placement } from '@floating-ui/react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/app/root-lib';

type ProfileCardMenuProps = {
  className?: string;
  buttonClassName?: string;
  avatarClassName?: string;
  placement?: Placement;
  icon?: ReactNode;
  title?: string;
  designation?: string;
  initial?: string;
  image?: string;
  signOut?: any
};

const menuItems = [
  {
    name: 'User Settings',
    href: '/settings/user-settings',
  }
];



export default function ProfileCardMenu({
  className,
  buttonClassName,
  avatarClassName,
  placement = 'bottom-start',
  icon,
  title,
  designation,
  image,
  initial = 'P',
}: ProfileCardMenuProps) {
  const [, setIsOpen] = useState(false);
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
    setAppContextData({})
    // router.push(routes.signIn)
  }

  return (
    <>
      <div className={cn('px-4 py-5', className)}>
        <div
          className={cn(
            'flex-items-center group flex h-auto w-full max-w-full justify-between gap-3 !border-t-[0.5px] border-gray-100 px-5 text-left pt-8 pb-4',
            buttonClassName
          )}
        >
          <span className="truncate flex items-center gap-1 text-primary-100 w-full">
            <div>
              <Avatar
                src={image && image}
                name={currentUserInfo?.name || ''}
                // initials={initial && initial}
                size="sm"
                className={cn('text-primary-600 font-bold gray-1000 bg-primary-100', avatarClassName)}
                color='secondary'
              />
            </div>
            <div className='w-full'>
              <div className="flex ml-2 justify-between">
                {title && (
                  <Title
                    as="h6"
                    className="capitalize truncate w-[188px] text-sm font-semibold text-primary-100"
                  >
                    {title}
                  </Title>
                )}
                <div
                  className='cursor-pointer'
                  onClick={() => signOut()}
                >
                  {icon && icon}
                </div>
              </div>



              <div className='ml-2'>
                {designation && (
                  <Tooltip
                    size="sm"
                    content={designation}
                    placement="top-start"
                    color="invert"
                    className='bg-white cursor-pointer'
                    showArrow={false}
                  >
                    <Text className="truncate text-primary-100 w-[204px]">
                      {designation}
                    </Text>
                  </Tooltip>
                )}
              </div>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}
