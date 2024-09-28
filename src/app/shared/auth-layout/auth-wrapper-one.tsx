'use client';

import Link from 'next/link';
import logoImg from '@public/logo-primary.svg';
import Image from 'next/image';
import { Title, Text } from '@/components/ui/text';
import LinePattern from '@/components/icons/linePattern';

export default function AuthWrapperOne({
  title,
  children,
  bannerTitle,
  bannerDescription,
  description,
  pageImage,
}: {
  title?:any
  children: React.ReactNode;
  description?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  pageImage?: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
}) {
  return (
    <>
      <div className="min-h-screen justify-between gap-x-8 lg:flex xl:gap-x-10 [&>div]:min-h-[calc(100vh-80px)] relative overflow-hidden">
        <div className="
                hidden bg-gradient-to-tr 
                from-primary-800
                to-primary-600 
                  w-6/12 items-start justify-start bg-gray-50  dark:bg-gray-100/40 lg:flex xl:justify-end
                  ">
          <div className="pb-6 text-left w-full 2xl:w-full flex justify-between">
            <div className="xl:pt-6">
              <Link href='/sign-in'>
                <Title
                  as="h2"
                  className="mb-5 text-primary-100
                                !leading-normal lg:text-[32px] xl:px-10 lg:px-6 xl:text-[48px] font-olga"
                >
                  APP NAME
                </Title>
              </Link>
            </div>
            <div >
              <LinePattern />
            </div>
          </div>
          <div className='absolute w-6/12 flex flex-col justify-center items-center h-full'>
            <div className='lg:px-6 flex flex-col justify-center items-center'>
              {/* {pageImage} */}
              <div className=''>
                <Title className='text-primary-200 my-4 text-center'>{bannerTitle}</Title>
                <div className='flex items-center justify-center'>
                  <div className='mb-4 text-base text-primary-200 w-[70%] text-center'>{bannerDescription}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-auto h-full absolute left-0 flex justify-start items-end'>
            <LinePattern className='-mb-60' />
          </div>
        </div>
        <div className="relative flex w-full items-center justify-center lg:w-5/12 2xl:justify-end 2xl:pr-56  ">
          <div className=" w-full max-w-sm md:max-w-md lg:py-7 lg:pt-16 2xl:w-[400px] 2xl:max-w-none 2xl:pt-7">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
