import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

function ColorMode() {
    const { colorMode, toggleColorMode } = useColorMode()

    return <IconButton pos="absolute" m="5" className="right-0" aria-label="Dark/light mode switch" icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} onClick={() => toggleColorMode()} />
}

export default ColorMode