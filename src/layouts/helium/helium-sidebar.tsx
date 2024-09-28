"use client";

import Link from "next/link";
import cn from "@/utils/class-names";
import SimpleBar from "@/components/ui/simplebar";
import { CarbonSidebarMenu } from "./helium-sidebar-menu";
import ProfileCardMenu from "./profile-card-menu";
import { Title } from "@/components/ui/text";
import { useContext } from "react";
import { AppContext } from "@/app/root-lib";
import { carbonMenuItems, carbonUserMenuItems } from "./helium-menu-items";
import LogOutIcon from "@/components/icons/logout";

export default function HeliumSidebar({ className }: { className?: string }) {
  const { appContextData } = useContext<any>(AppContext);
  const { currentUserInfo } = appContextData;
  const mainURL = "/interviews";

  return (
    <aside
      className={cn(
        "fixed start-0 z-50 h-full w-[312px] dark:bg-primary-dark 2xl:w-[312px] border-r-2",
        className
      )}
    >
      <div className="h-full bg-white pl-0 dark:bg-primary-dark">
        {/* <div className="sticky top-0 z-40 flex justify-start px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6">
          <Link href={mainURL} aria-label="Site Logo">
            <Title
              as="h2"
              className="font-semibold text-white lg:text-[26px] 2xl:text-[32px] font-olga"
            >
              Financial Planner
            </Title>
          </Link>
        </div> */}
        <SimpleBar
          className={cn(
            "h-[calc(100%-80px)] [&_.simplebar-content]:flex [&_.simplebar-content]:h-full [&_.simplebar-content]:flex-col [&_.simplebar-content]:justify-between"
          )}
        >
          <div className="h-full">
            <CarbonSidebarMenu
              carbonMenuItems={carbonMenuItems}
              isShowNewBadge={true}
              heading=""
            />
          </div>
          <div>
            {/* <CarbonSidebarMenu carbonMenuItems={carbonUserMenuItems} /> */}
            {/* <div className="mx-1.5 mb-1.5 mt-6 px-4 xl:rounded-2xl">
              <ProfileCardMenu
                title={currentUserInfo?.name}
                designation={currentUserInfo?.email}
                placement="top"
                image=""
                avatarClassName="!w-10 !h-10"
                icon={
                  <span className="w-[32px] text-primary-300 flex justify-end h-5 hover:text-primary-100">
                    <LogOutIcon
                      width="16"
                      height="16"
                      className={cn(
                        "h-5 w-5 transition-all text-primary-300 hover:text-primary-100"
                      )}
                    />
                  </span>
                }
                className={cn("mt-0 px-0 py-0")}
                buttonClassName="border-0 px-0 rounded-none items-start"
              />
            </div> */}
          </div>
        </SimpleBar>
      </div>
    </aside>
  );
}
