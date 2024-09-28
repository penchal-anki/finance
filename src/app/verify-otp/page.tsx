'use client'
import { Title, Text } from '@/components/ui/text';
import OtpForm from './otp-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import UnderlineShape from '@/components/shape/underline';
import Image from 'next/image';
import { useContext } from 'react';
import { AppContext } from '../root-lib';
import Link from 'next/link';
import { routes } from '@/config/routes';
import MailIcon from '@/components/icons/mail';
import { PiArrowLeftBold } from 'react-icons/pi';
import dashboardImage from '@public/dashboard.png'
import violationImage from '@public/violations.png';
import topPoliciesImage from '@public/topPolicies.png'

export default function OtpPage() {
  const { appContextData } = useContext<any>(AppContext);
  const { loginUser } = appContextData;

  return (
    <AuthWrapperOne
      bannerTitle="Welcome back to your secure gateway!"
      bannerDescription="Sign in to explore active violations and ensure your security"
      // pageImage={
      //   <Image
      //     className='w-[600px] filter-blur-1 z-[9] rounded-md top-[50%] inset-0 flex items-center justify-center'
      //     src={dashboardImage}
      //     alt="dashboardImage"
      //     style={{
      //       filter: 'blur(1px)'
      //     }}
      //   />
      // }
      pageImage={
        <div className='w-full'>
          <div className='flex justify-end -mb-10'>
            <Image
              className='w-[400px] filter-blur-1 z-[9] rounded-md top-[50%] inset-0 flex items-center justify-end'
              src={violationImage}
              alt="violationImage"
              style={{
                filter: 'blur(1px)'
              }}
            />
          </div>
          <Image
            className='w-[400px] filter-blur-1 z-[9] rounded-md top-[50%] inset-0 flex items-center justify-start'
            src={topPoliciesImage}
            alt="topPoliciesImage"
            style={{
              filter: 'blur(1px)'
            }}
          />
        </div>
      }
    >
      <div className='mb-8 flex justify-center flex-col items-center'>
        <div className='h-14 w-14 rounded-full bg-primary-50 flex justify-center items-center mb-8'>
          <div className='h-10 w-10 rounded-full bg-primary-100 flex justify-center items-center'>
            <MailIcon className='h-6 w-6 text-primary-600' />
          </div>
        </div>
        <div className='text-3xl font-semibold text-gray-900 mb-2 text-center'>Check your email</div>
      </div>
      <Text className="-mt-1 mb-9 text-start text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:text-center xl:-mt-6">
        We have sent you One Time Password to your email
        <Link
          href={routes.signIn}
          className="ml-2 underline font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          {loginUser?.email}.
        </Link>
      </Text>
      <OtpForm />
      <div className='flex justify-center '>
        <Link
          href={routes.signIn}
        >
          <Text className='text-sm font-medium flex cursor-pointer hover:text-primary-600 mt-4 items-center text-gray-600 md:text-sm md:!leading-loose lg:text-center'>
            <PiArrowLeftBold className="ml-2 h-5 w-5 mr-2 cursor-pointer hover:text-primary-600" />
            Back To Sign In
          </Text>
        </Link>
      </div>
    </AuthWrapperOne>
  );
}
