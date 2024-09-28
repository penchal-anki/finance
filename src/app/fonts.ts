import { Inter, Lexend_Deca } from 'next/font/google';
import localFont from 'next/font/local'

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const olga = localFont({
  src: '../../public/fonts/Olga.ttf',
  display: 'swap',
  variable: '--font-olga',
})

export const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  variable: '--font-lexend',
});
