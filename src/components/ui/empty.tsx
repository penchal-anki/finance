'use client';
import cn from '@/utils/class-names';
import {
  EmptyBoxIcon,
  EmptyProductBoxIcon,
  SearchNotFoundIcon,
  Title,
} from 'rizzui';
import Image from 'next/image';
import emptyImage from '@public/empty.png';


const Empty = ({ className }: { className?: string }) => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <Image
        src={emptyImage}
        alt="Empty"
        className={cn('w-44 h-auto', className)}
      />
      <Title as="h6" className='text-gray-700 mt-2'>No Data Found</Title>
    </div>
  )
}

export {
  Empty,
  EmptyBoxIcon,
  EmptyProductBoxIcon,
  SearchNotFoundIcon,
} 
