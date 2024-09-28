'use client';

import SignInForm from './sign-in-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import { useContext, useEffect } from 'react';
import { AppContext } from '../root-lib';
import dashboardImage from '@public/dashboard.png'
import violationImage from '@public/violations.png';
import topPoliciesImage from '@public/topPolicies.png'


export default function SignIn() {
  const { appContextData, setAppContextData } = useContext<any>(AppContext);
  const { isLogOut } = appContextData

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    setAppContextData({});
  }, []);

  useEffect(() => {
    console.log(">>>>>>>>>>>>appContextData", appContextData)
    setAppContextData({});
  }, [isLogOut]);

  return (
    <AuthWrapperOne
      bannerTitle="Welcome back to your secure gateway!"
      bannerDescription="Sign in to explore"
      isSocialLoginActive={true}
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
      <SignInForm />
    </AuthWrapperOne>
  );
}
