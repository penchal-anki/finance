import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import SignUpForm from './sign-up-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import { metaObject } from '@/config/site.config';
import dashboardImage from '@public/dashboard.png'

export const metadata = {
  ...metaObject('Sign Up 1'),
};

export default function SignUp() {
  return (
    <AuthWrapperOne
      bannerTitle="Title"
      bannerDescription="Take the first step towards"
      isSocialLoginActive={true}
      pageImage={
        <Image
          className='w-[600px] filter-blur-1 z-[9] rounded-md top-[50%] inset-0 flex items-center justify-center'
          src={dashboardImage}
          alt="dashboardImage"
          style={{
            filter: 'blur(1px)'
          }}
        />
      }
    >
      <SignUpForm />
    </AuthWrapperOne>
  );
}
