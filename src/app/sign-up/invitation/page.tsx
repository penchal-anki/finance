import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import SignUpForm from '../sign-up-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import { metaObject } from '@/config/site.config';
import { PiArrowLeftBold, PiCheckCircleDuotone } from 'react-icons/pi';
import { Text } from 'rizzui';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dashboardImage from '@public/dashboard.png'
import { routes } from '@/config/routes';

export const metadata = {
    ...metaObject('Sign Up 1'),
};

export default function SignUp() {
    return (
        <AuthWrapperOne
            description=""
            bannerTitle="Transform your AI security landscape"
            bannerDescription="Take the first step towards unmatched AI protection - Trusted by enterprises globally"
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
            <div className='mb-8 flex justify-center flex-col items-center'>
                <div className='h-14 w-14 rounded-full bg-green-50 flex justify-center items-center mb-8'>
                    <div className='h-10 w-10 rounded-full bg-green-100 flex justify-center items-center'>
                        <PiCheckCircleDuotone className='h-6 w-6 text-green-600' />
                    </div>
                </div>
                <div className='text-3xl font-semibold text-gray-900 mb-2 text-center'>Sign up successful!</div>
                <Text className='text-center text-gray-600 my-4'>Our team will reach out to you shortly to enable the platform for your organization.</Text>
                <Link href="https://security.revrr.ai/" className='w-full'>
                    <Button
                        buttonStyles={'h-10'}
                    >
                        Explore the platform
                    </Button>
                </Link>
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
            </div>
        </AuthWrapperOne>
    );
}
