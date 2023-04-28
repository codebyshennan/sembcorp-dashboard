import Head from 'next/head';
import Script from 'next/script';
import { ReactNode } from 'react';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Meteorological App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js"></Script>
    </>
  );
};
