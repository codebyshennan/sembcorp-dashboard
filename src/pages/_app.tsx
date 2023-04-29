import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { DefaultLayout } from '~/components/layouts/DefaultLayout';
import { trpc } from '~/utils/trpc';
import './globals.css';
import { SWRConfig } from 'swr';
import { useCacheProvider } from '@piotr-cz/swr-idb-cache';
import { ClerkProvider } from '@clerk/nextjs';
import 'flowbite';
import { Analytics } from '@vercel/analytics/react';
// https://github.com/piotr-cz/swr-idb-cache

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const cacheProvider = useCacheProvider({
    dbName: 'swr-cache',
    storeName: 'swr-cache',
  });

  if (!cacheProvider) {
    return <div>loading...</div>;
  }

  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <ClerkProvider {...pageProps}>
      <SWRConfig value={{ provider: cacheProvider }}>
        <Component {...pageProps} />
        <Analytics />
      </SWRConfig>
    </ClerkProvider>,
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
