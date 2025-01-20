import { useEffect, useState } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider ,HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from '@components/common/layout';

import useSetAxiosConfig from '@/api/useSetAxiosConfig';
import { DAY, HALF_DAY } from '@/constants/TimeConstants';
import '@/styles/globals.css';

import * as gtag from '../lib/gtag';

export default function MyApp({ Component, pageProps }: AppProps) {
  useSetAxiosConfig();
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  console.log('process.env.NEXT_PUBLIC_VERCEL_ENV', process.env.NEXT_PUBLIC_VERCEL_ENV);
  // || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
  if (process.env.NODE_ENV !== 'production') {
    const MockServer = () => import('@/_tests_/mocks/Index');
    MockServer();
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: HALF_DAY,
            gcTime: DAY,
            retry: 1,
            throwOnError: true,
          },
        },
      }),
  );

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
      <ThemeProvider enableSystem={false} attribute='class'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
