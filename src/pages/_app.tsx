import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { theme } from '../styles/theme.style';
import { createEmotionCache } from '../lib/emotion.lib';
import { ReactQueryClientProvider } from '../providers/react-query.provider';
import { SnackbarProvider } from '../providers/snackbar.provider';
import { AuthProvider } from '../modules/auth';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactQueryClientProvider>
          <SnackbarProvider>
            <AuthProvider>
              {getLayout(<Component {...pageProps} />)}
            </AuthProvider>
          </SnackbarProvider>
        </ReactQueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
