import { AppContext } from '@/app/root-lib';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { routes } from '@/config/routes';
import Sidebar from '@/layouts/helium/helium-sidebar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import finance from '@public/finance.png';
import cn from '@/utils/class-names';
import { Avatar } from '@/components/ui/avatar';


export default function HeliumLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const { appContextData, setAppContextData } = useContext<any>(AppContext);
  const [isExpired, setIsExpired] = useState(false)

  // useEffect(() => {
  //   if (!appContextData?.currentUserInfo) {
  //     router.push(routes.signIn);
  //   }
  // }, [])

  // useEffect(() => {
  //   if (appContextData?.isSessionExpired) {
  //     setIsExpired(true)
  //   }
  // }, [appContextData?.isSessionExpired])

  return (
    <div className='mb-8'>
      <div className='flex items-center py-4 pl-7 pr-10 border-b-2 fixed w-full'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center'>
            <Image src={finance} alt="logo" className='w-[28px] h-[28px]' />
            <div className='text-[24px] font-medium ml-[10px]'>Budget</div>
          </div>
          <div>
            <Avatar
              src={'https://docs.material-tailwind.com/img/face-3.jpg'}
              name={'PA'}
              // initials={initial && initial}
              size="md"
              className={cn('text-white font-bold gray-1000 bg-primary-100 h-10 w-10 cursor-pointer')}
              color='secondary'
            />
          </div>
        </div>
      </div>
      <main className="flex flex-grow mt-[74px]">
        <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
        <div className="flex w-full flex-col xl:ms-[312px] xl:w-[calc(100%-312px)] 2xl:ms-[312px] 2xl:w-[calc(100%-312px)]">
          <div className="flex flex-grow flex-col px-4 pb-6 pt-5 md:px-5 lg:px-10 lg:pb-8 xl:pl-3 2xl:pl-10 3xl:px-10 3xl:pl-8 3xl:pt-5 4xl:px-10 4xl:pb-9 4xl:pl-10">
            {children}
            <Modal
              isOpen={isExpired}
              onClose={() => { }}
              customSize='400px'
              containerClassName="pointer-events-auto bg-white"
              className='z-[9999] pointer-events-auto'
              overlayClassName="dark:bg-opacity-60 opacity-60 bg-black"
            >
              <div className='h-[280px] p-6'>
                <div className="col-span-full flex items-center justify-end">
                  {/* <ActionIcon size="sm" variant="text" onClick={() => { }}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon> */}
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-lg text-primary-600 font-semibold mt-8'>
                    Session expired!
                  </p>
                  <div className='text-center items-center px-15'>
                    <p className='text-sm text-gray-600 text-center mt-4 mb-11'>
                      Please sign in to continue using our app
                    </p>
                    <Button
                      buttonStyles="!text-sm !h-10"
                      onClick={() => {
                        setAppContextData({})
                        router.push(routes.signIn);
                      }}
                    >
                      Sign in
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </main>
    </div>

  );
}
