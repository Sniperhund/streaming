import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs";
import { useState } from 'react';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <ChakraProvider>
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <Component {...pageProps} />
        </SessionContextProvider>
    </ChakraProvider>
  )
}

export default MyApp