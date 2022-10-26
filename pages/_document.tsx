import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from './../lib/theme'

export default class Document extends NextDocument {
    render() {
        return (
                <Html style={{scrollBehavior: 'smooth'}} lang='en'>
                    <Head />
                    <body>
                        {/* 👇 Here's the script */}
                        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                        <Main />
                        <NextScript />
                    </body>
                </Html>
                )
    }
}