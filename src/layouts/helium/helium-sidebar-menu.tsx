import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ElementType, Fragment, useState } from "react";
import { Loader, Text } from "rizzui";
import cn from "@/utils/class-names";
import {
  PiCaretDownBold,
  PiCurrencyDollar,
  PiPlus,
  PiTerminalWindow,
  PiUserGear,
  PiUserPlusDuotone,
} from "react-icons/pi";
import Menu from "@/components/ui/menu/dropdown/menu";
import StatusBadge from "@/components/get-status-badge";
import { SortableList } from "@/components/dnd-sortable/dnd-sortable-list";
import { useColorPresetName } from "@/hooks/use-theme-color";
import { useRouter } from "next/navigation";
import { createNewInterview } from "@/app/shared/interviews/actions";
import { useAppContext } from "@/app/root-lib";

const hoverMenuItems = [
  {
    name: "Start New Interview",
    icon: PiTerminalWindow,
  },
];

export function CarbonSidebarMenu({
  carbonMenuItems,
  heading,
  isShowNewBadge,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [items, setItems] = useState<any>(carbonMenuItems);
  const { colorPresetName } = useColorPresetName();
  const isDropdownOpenNew = true;
  const { appContextData }: any = useAppContext();
  const [isInterviewCreating, setIsInterviewCreating] = useState(false);

  const idToken = appContextData.currentUserInfo?.idToken || "";
  const accessToken = appContextData.currentUserInfo?.accessToken || "";

  const createNewInterviewData = async () => {
    setIsInterviewCreating(true);
    const interviewInfo = await createNewInterview({
      idToken,
      accessToken,
    });
    setIsInterviewCreating(false);
    console.log("interviewInfo>>>>>>>>>>>>>>>>>>", interviewInfo);
    router.push(`/interview/${interviewInfo._id}?createnew=true`);
  };

  return (
    <div className="mb-auto">
      {heading && (
        <Text
          as="span"
          className="block px-[25px] pt-5 font-lexend text-md font-medium capitalize text-white dark:text-white"
        >
          {" "}
          {heading}
        </Text>
      )}

      {isShowNewBadge && (
        <Menu trigger="hover" placement="right-start" offset={2} closeDelay={0}>
          {/* <Menu.Trigger>
            <div
              className={cn(
                "group w-min relative mx-3.5 flex grow cursor-pointer items-center justify-between overflow-hidden rounded-md px-3 py-2 font-medium transition-all lg:my-1 2xl:my-2",
                isDropdownOpenNew
                  ? colorPresetName === "black"
                    ? "bg-primary-600 text-primary-600"
                    : "bg-white text-primary-600"
                  : "text-primary-600 transition-all duration-200 hover:bg-primary-600  hover:text-primary-100"
              )}
            >
              <span
                className={cn(
                  "flex items-center",
                  isDropdownOpenNew
                    ? colorPresetName === "black"
                      ? "text-primary-600"
                      : "text-primary-600"
                    : "text-primary-600 group-hover:text-primary-100"
                )}
              >
                <span
                  className={cn(
                    "me-2 inline-flex h-6 w-6 items-center justify-center rounded-md transition-all [&>svg]:h-[24px] [&>svg]:w-[24px]",
                    "text-primary-600 group-hover:text-primary-600"
                  )}
                >
                  <PiPlus />
                </span>
                New
              </span>
            </div>
          </Menu.Trigger> */}

          <Menu.List className="w-[312px] !border-transparent !px-2 !py-3 dark:border-gray-300 dark:bg-gray-100">
            {hoverMenuItems?.map((dropdownItem: any, index: any) => {
              const isChildActive = pathname === (dropdownItem?.href as string);
              const pathnameExistInChildDropdowns: any =
                dropdownItem?.subMenuItems?.filter(
                  (dropdownItem: { href: string }) =>
                    dropdownItem.href === pathname
                );
              const isChildDropdownActive = Boolean(
                pathnameExistInChildDropdowns?.length
              );
              const DropdownIcon = dropdownItem?.icon;

              return (
                <Menu.Item
                  key={"dropdown" + dropdownItem?.name + index}
                  className={cn(
                    "px-0 py-0 transition-all data-[hover=true]:dark:bg-gray-200",
                    isChildDropdownActive && "bg-gray-100 dark:bg-gray-200"
                  )}
                >
                  <div
                    className={cn(
                      "relative cursor-pointer flex w-full items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize text-gray-900",
                      isChildActive
                        ? "before:top-2/5 bg-gray-100 text-primary before:absolute before:-start-2.5 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary dark:bg-gray-200 2xl:before:-start-2.5"
                        : "text-gray-900 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90 dark:hover:bg-gray-200"
                    )}
                    onClick={createNewInterviewData}
                  >
                    <div className="flex items-center truncate">
                      {DropdownIcon && (
                        <span
                          className={cn(
                            "me-3 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                            isChildActive
                              ? "text-primary"
                              : "text-gray-400 dark:text-gray-500 dark:group-hover:text-gray-700"
                          )}
                        >
                          <DropdownIcon />
                        </span>
                      )}
                      <span className="truncate">{dropdownItem?.name}</span>
                      {isInterviewCreating && (
                        <Loader color="info" className="text-primary h-5 w-5 ml-4" />
                      )}
                    </div>
                  </div>
                </Menu.Item>
              );
            })}
          </Menu.List>
        </Menu>
      )}

      <ul className="">
        <SortableList items={items} onChange={setItems}>
          {items.map((item: any, index: string) => {
            const Icon = item.icon;
            const activeMenu = pathname.startsWith(item?.href);
            const pathnameExistInDropdowns: boolean = item?.menuItems?.some(
              (dropdownItem: { href: string; subMenuItems: any[] }) => {
                return (
                  dropdownItem.href === pathname ||
                  dropdownItem.subMenuItems?.some(
                    (subMenuItem: { href: string }) =>
                      subMenuItem.href === pathname
                  )
                );
              }
            );
            const isDropdownOpen = Boolean(
              pathnameExistInDropdowns || activeMenu
            );
            return (
              <Fragment key={"sortable-menu" + item.name + "-" + index}>
                <SortableList.Item id={item.id}>
                  <Menu
                    trigger="hover"
                    placement="right-start"
                    offset={2}
                    closeDelay={0}
                  >
                    <Menu.Trigger>
                      <Link href={item?.href}>
                        <div
                          className={cn(
                            "group relative mx-3.5 flex grow cursor-pointer items-center justify-between overflow-hidden rounded-md px-3 py-2 font-medium transition-all lg:my-1 2xl:my-2",
                            isDropdownOpen
                              ? colorPresetName === "black"
                                ? "bg-[#f9fafb] text-gray-700"
                                : "bg-[#f9fafb] text-gray-700"
                              : "text-gray-700 transition-all duration-200 hover:bg-[#f9fafb]  hover:text-primary-100"
                          )}
                        >
                          <span
                            // className="flex items-center text-white dark:group-hover:text-gray-700"
                            className={cn(
                              "flex items-center",
                              isDropdownOpen
                                ? colorPresetName === "black"
                                  ? "text-gray-700"
                                  : "text-gray-700"
                                : "text-gray-700 group-hover:text-gray-700"
                            )}
                          >
                            {/* <SortableList.DragHandle
                              className={cn(
                                'inset-t-0 absolute me-1 h-5 w-5 -translate-x-7 text-gray-900 transition-all group-hover:-translate-x-6 [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                isDropdownOpen
                                  ? colorPresetName === 'black'
                                    ? 'text-white'
                                    : 'text-white text-white'
                                  : 'text-white group-hover:text-gray-700'
                              )}
                            /> */}
                            {Icon && (
                              <span
                                className={cn(
                                  "me-2 inline-flex h-6 w-6 items-center justify-center rounded-md transition-all [&>svg]:h-[24px] [&>svg]:w-[24px]",
                                  isDropdownOpen
                                    ? colorPresetName === "black"
                                      ? "text-primary-300"
                                      : "text-gray-700 dark:text-white"
                                    : "text-[#667085] group-hover:text-[#667085]"
                                )}
                              >
                                <Icon />
                              </span>
                            )}
                            {item.name}
                          </span>

                          {item?.menuItems.length > 0 && (
                            <div className="flex items-center transition-all group-hover:gap-1">
                              <PiCaretDownBold
                                strokeWidth={3}
                                className={cn(
                                  "h-3.5 w-3.5 -rotate-90 transition-transform duration-200 rtl:rotate-90",
                                  isDropdownOpen
                                    ? colorPresetName === "black"
                                      ? "text-white"
                                      : "text-white dark:text-white"
                                    : "text-white dark:group-hover:text-primary-100"
                                )}
                              />
                            </div>
                          )}
                        </div>
                      </Link>
                    </Menu.Trigger>
                    {item?.menuItems.length > 0 && (
                      <Menu.List className="w-[312px] !border-transparent !px-2 !py-3 dark:border-gray-300 dark:bg-gray-100">
                        {item?.menuItems?.map(
                          (dropdownItem: any, index: any) => {
                            const isChildActive =
                              pathname === (dropdownItem?.href as string);
                            const pathnameExistInChildDropdowns: any =
                              dropdownItem?.subMenuItems?.filter(
                                (dropdownItem: { href: string }) =>
                                  dropdownItem.href === pathname
                              );
                            const isChildDropdownActive = Boolean(
                              pathnameExistInChildDropdowns?.length
                            );
                            const DropdownIcon = dropdownItem?.icon;

                            return (
                              <Menu.Item
                                key={"dropdown" + dropdownItem?.name + index}
                                className={cn(
                                  "px-0 py-0 transition-all data-[hover=true]:dark:bg-gray-200",
                                  isChildDropdownActive &&
                                    "bg-gray-100 dark:bg-gray-200"
                                )}
                              >
                                <MenuLink
                                  item={dropdownItem}
                                  isChildActive={isChildActive}
                                  isDropdownOpen={isDropdownOpen}
                                />
                              </Menu.Item>
                            );
                          }
                        )}
                      </Menu.List>
                    )}
                  </Menu>
                </SortableList.Item>
              </Fragment>
            );
          })}
        </SortableList>
      </ul>
    </div>
  );
}

type MenuItemsProps = {
  as?: ElementType;
  item: any;
  isChildActive?: boolean;
  isDropdownOpen?: boolean;
  className?: string;
};

function MenuLink({ item, isChildActive }: MenuItemsProps) {
  const Icon = item?.icon;

  return (
    <Link
      href={item?.href}
      className={cn(
        "relative flex w-full items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize text-gray-900",
        isChildActive
          ? "before:top-2/5 bg-gray-100 text-primary before:absolute before:-start-2.5 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary dark:bg-gray-200 2xl:before:-start-2.5"
          : "text-gray-900 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90 dark:hover:bg-gray-200"
      )}
    >
      <div className="flex items-center truncate">
        {Icon && (
          <span
            className={cn(
              "me-3 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
              isChildActive
                ? "text-primary"
                : "text-gray-400 dark:text-gray-500 dark:group-hover:text-gray-700"
            )}
          >
            <Icon />
          </span>
        )}
        <span className="truncate">{item?.name}</span>
      </div>
      {item?.badge?.length ? <StatusBadge status={item?.badge} /> : null}
    </Link>
  );
}
