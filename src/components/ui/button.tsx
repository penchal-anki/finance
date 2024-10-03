'use client';


import { Button as RizzButton, type ButtonProps } from 'rizzui';

const Button = ({ children, buttonStyles, ...props }: any) => {
  return (
    <RizzButton
      className={`
      rizzui-button
      inline-flex
      font-medium
      items-center
      justify-center
      active:enabled:translate-y-px
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-opacity-50
      transition-colors
      duration-200
      px-3 py-4
      rounded-md
      border border-transparent
      focus-visible:ring-offset-2
      hover:enabled:bg-[#669F2A]
      focus-visible:ring-blue/30
    text-white
      w-full h-11 text-base
      bg-[#669F2A]
      ${buttonStyles}
      `}
      {...props}
    >
      {children}
    </RizzButton>
  )
}


export { Button, ButtonProps };

