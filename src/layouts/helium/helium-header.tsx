'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ActionIcon } from '@/components/ui/action-icon';
import SearchWidget from '@/components/search/search';
// import MessagesDropdown from '@/layouts-ysly/messages-dropdown';
// import NotificationDropdown from '@/layouts-ysly/notification-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import HamburgerButton from '@/layouts/hamburger-button';
import Logo from '@/components/logo';
import {
  PiChatCircleDotsFill,
  PiBellSimpleRingingFill,
  PiGearFill,
} from 'react-icons/pi';
import cn from '@/utils/class-names';
import Sidebar from './helium-sidebar';
import HeaderMenuRight from '@/layouts/header-menu-right';

export default function Header() {
  return (
    <header
      className={
        'sticky top-0 z-50 flex items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 xl:-ms-1.5 xl:pl-4 2xl:-ms-0 2xl:py-5 2xl:pl-6 3xl:px-8 3xl:pl-6 4xl:px-10 4xl:pl-9'
      }
    >
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={
            <Sidebar className="static w-full xl:p-0 2xl:w-full [&>div]:xl:rounded-none" />
          }
        />
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 lg:me-5 xl:hidden"
        >
          <Logo iconOnly={true} />
        </Link>
      </div>
      <HeaderMenuRight />
    </header>
  );
}
