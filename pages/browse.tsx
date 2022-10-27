import {Flex, Heading, HStack, IconButton, useColorMode} from "@chakra-ui/react";
import Movie from "../components/Movie";
import ColorMode from "../components/ColorMode";
import Header from "../components/Header";
import BrowseMovieSection from "../components/BrowseMovieSection"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Browse() {
    return <>
        <Header />
        <BrowseMovieSection sectionName="Movies" watchList={[1, 2, 2, 2, 2, 2, 2, 2, 2]} />
    </>
}

export default Browse