import {
    Flex,
    Box,
    Spacer,
    Avatar,
    useColorMode,
    IconButton,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem, AvatarProps, Button
} from "@chakra-ui/react"
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"

function Header() {
    const { colorMode, toggleColorMode } = useColorMode()
    const router = useRouter()

    const supabase = useSupabaseClient()
    const [avatar, setAvatar] = useState<string>("")

    useEffect(() => {
        async function GetUserData() {
            const { data: { user } } = await supabase.auth.getUser()
            setAvatar(user?.user_metadata.avatar)
        }

        GetUserData()
    }, [supabase])

    return (
        <Box w="100%" h="16">
            <Flex>
                {/* TODO: Spørg Loui, hvad der skal være her */}
                <Spacer />
                <HStack spacing="8" m="4">
                    <IconButton aria-label="Dark/light mode switch" icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} onClick={() => toggleColorMode()} />
                    <Menu>
                        <MenuButton as={IconButton} icon={<Avatar src={avatar} />} variant="link" />
                        <MenuList>
                            <MenuItem as={Button} onClick={() => {
                                router.push("/profile")
                            }}>Profile</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </Flex>
        </Box>
    )
}

export default Header