"use client";

import { Title, Text } from "@/components/ui/text";
import Breadcrumb from "@/components/ui/breadcrumb";
import cn from "@/utils/class-names";

export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  subHeading?: string;
};

export default function PageHeader({
  title,
  subHeading,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <header className={cn("mb-2 @container", className)}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Title
            as="h2"
            className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px] text-gray-600"
          >
            {title}
          </Title>
          {subHeading && <Text className="text-gray-600">{subHeading}</Text>}
          {breadcrumb?.length > 0 && (
            <Breadcrumb
              separator=""
              separatorVariant="circle"
              className="flex-wrap"
            >
              {breadcrumb.map((item) => (
                <Breadcrumb.Item
                  key={item.name}
                  {...(item?.href && { href: item?.href })}
                >
                  {item.name}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
