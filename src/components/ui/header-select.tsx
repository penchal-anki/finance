import { useContext, useState } from 'react'
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { AppContext } from '@/app/root-lib';
import Select from '@/components/ui/select';


export default function HeaderSelect({ className }: any) {
  const { appContextData, setAppContextData } = useContext<any>(AppContext);
  const { currentUserInfo } = appContextData;

  const listOptions = currentUserInfo?.masterAccountDetails?.accounts.map((item: any) => ({
    value: item,
    name: `Account-${item}`
  }))

  const [value, setValue] = useState(currentUserInfo?.masterAccountDetails?.accounts[0] || '');
  const onChange = () => {
    console.log(">>>>>fired")
  }
  return (
    <>
      {currentUserInfo?.masterAccountId &&
        <Select
          className='w-[320px]'
          color='info'
          options={listOptions}
          value={value}
          onChange={onChange}
          label=""
          error={''}
          getOptionValue={(option) => option.name}
        />
      }
    </>
  );
}

