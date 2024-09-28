import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: `Finance - ${process.env.APP_NAME}`,
  description: process.env.APP_NAME || '',
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: process.env.APP_NAME,
    description,
    openGraph: openGraph ?? {
      title: process.env.APP_NAME,
      description,
      url: '',
      siteName: process.env.APP_NAME,
      images: {
        url: 'https://revsec-logo.s3.ap-south-1.amazonaws.com/rev.jpg',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
