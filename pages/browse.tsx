import { IconButton, useColorMode } from "@chakra-ui/react";
import Movie from "../components/Movie";
import ColorMode from "../components/ColorMode";
import Header from "../components/Header";

function Browse() {
    return <>
        <Header />
        <Movie coverUrl="https://upload.wikimedia.org/wikipedia/en/6/68/Young_Sheldon_title_card.png" id="1" />
    </>
}

export default Browse