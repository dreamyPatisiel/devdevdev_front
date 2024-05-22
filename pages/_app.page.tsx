import { useState } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from '@components/common/layout';

import useSetAxiosConfig from '@/api/useSetAxiosConfig';
import { DAY, HALF_DAY } from '@/constants/TimeConstants';
import '@/styles/globals.css';

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
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem={false} attribute='class'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
