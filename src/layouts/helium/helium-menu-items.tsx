import { routes } from "@/config/routes";
import { DUMMY_ID } from "@/config/constants";
import { IconType } from "react-icons/lib";
import {
  PiBrowserDuotone,
  PiUserCircleDuotone,
  PiUserPlusDuotone,
  PiShieldCheck,
  PiUserGear,
  PiCurrencyDollar,
  PiWarning,
  PiCirclesFourBold,
  PiCloudBold,
  PiCircuitryBold,
  PiBug,
  PiDetective,
  PiCalendarCheckDuotone,
  PiCalendarCheck,
  PiCalendarBold,
  PiCalendarBlank,
  PiFileText,
  PiFileCode,
  PiArticle,
  PiClipboardText,
  PiCirclesFour
} from "react-icons/pi";
import { atom } from "jotai";
import PoliciesIcon from "@/components/icons/policies";
import ViolationsIcon from "@/components/icons/violationsIcon";
import SettingsIcon from "@/components/icons/settings";
import DashBoardIcon from "@/components/icons/dashboard";
import SupportIcon from "@/components/icons/support";

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  href: string;
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
}

export const carbonMenuItems: MenuItemsType[] = [
  {
    id: "1",
    name: "Models",
    title: "Models",
    icon: PiCirclesFour ,
    menuItems: [],
    href: "/models",
  },
  {
    id: "2",
    name: "Categories",
    title: "Categories",
    icon: PiClipboardText ,
    menuItems: [],
    href: "/categories",
  },
];

export const manageMenuItems: MenuItemsType[] = [
  {
    id: "2",
    name: "Models",
    title: "Models",
    icon: PiCirclesFourBold,
    href: "/models",
    menuItems: [],
  },
  {
    id: "3",
    name: "Findings",
    title: "Findings",
    icon: PiBug,
    href: "/findings",
    menuItems: [],
  },
  {
    id: "4",
    name: "Red Teaming",
    title: "Red Teaming",
    icon: PiDetective,
    href: "/red-teaming",
    menuItems: [],
  },
  {
    id: "1",
    name: "Integrations",
    title: "Integrations",
    icon: PiCloudBold,
    menuItems: [],
    href: "/integrations",
  },
];

export const carbonUserMenuItems: MenuItemsType[] = [
  {
    id: "1",
    name: "Support",
    title: "support",
    icon: SupportIcon,
    href: "/support",
    menuItems: [],
  },
  // {
  //   id: '2',
  //   name: 'Settings',
  //   title: 'Settings',
  //   icon: SettingsIcon,
  //   href: '/settings',
  //   menuItems: [
  // {
  //   name: 'General',
  //   href: '/settings',
  //   icon: PiUserGear,
  // },
  // {
  //   name: 'User Management',
  //   href: '/settings/user-management',
  //   icon: PiUserPlusDuotone,
  //   badge: '',
  // },
  // {
  //   name: 'Billing',
  //   href: '/settings/billing',
  //   icon: PiCurrencyDollar,
  // }
  //   ],
  // },
];

export const carbonMenuItemAtom = atom(carbonMenuItems[0]);
