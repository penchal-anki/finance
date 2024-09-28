'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'

export default function ErrorComp({reset}:any) {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='flex justify-center items-center flex-col'>
        <div className='flex justify-center flex-col items-center'>
          <h2>Something went wrong!</h2>
          <div className='w-[240px] mt-8 '>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
          </div>
        </div>
      </div>
    </div>
  )
}