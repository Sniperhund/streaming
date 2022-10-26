import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import {
    Button,
    Flex,
    useColorMode,
    IconButton,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import {useRouter} from "next/router";
import Redirect from "../components/Redirect";
import ColorMode from "../components/ColorMode";

const Home: NextPage = () => {
    let session = useSession()
    const supabase = useSupabaseClient()

    const router = useRouter()

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>
            <ColorMode />
            <Flex className="h-screen">
                <Flex className="m-auto">
                    {!session ? (
                        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme={colorMode} />
                        ) : (
                        <>
                            <Redirect dest="browse" />
                        </>
                    )}
                </Flex>
            </Flex>
        </>
      )
}

export default Home