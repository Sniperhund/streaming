import {HStack, IconButton, useColorMode} from "@chakra-ui/react";
import Movie from "../components/Movie";
import ColorMode from "../components/ColorMode";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Browse() {
    const movies = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    const [width, setWidth] = useState(0)

    useEffect(() => {
        window.addEventListener("resize", () => { setWidth(window.innerWidth) })
    })

    return <>
        <Header />
        <HStack>
            {/* Make buttons disapear smoothly when using small screen and fix screen issue */}
            {width >= 800 ? (
                    <IconButton aria-label="Play movie" icon={<FontAwesomeIcon icon={faArrowLeft} style={{color: "white", fontSize: 50}} />} variant="link" onClick={() => {
                        const slider = document.getElementById("slider")
            slider!.scrollLeft = slider!.scrollLeft - 1000
                    }} /> ) : "" }
            <HStack h="full" id="slider" className="overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                {movies.map(movie => (
                        // Edit key values to be unique
                        <Movie id="1" key="1" />
                        ))}
            </HStack>
            {width >= 800 ? (
                    <IconButton aria-label="Play movie" icon={<FontAwesomeIcon icon={faArrowRight} style={{color: "white", fontSize: 50}} />} variant="link" onClick={() => {
                        const slider = document.getElementById("slider")
                        slider!.scrollLeft = slider!.scrollLeft + 1000
                    }} /> ) : "" }
        </HStack>
    </>
}

export default Browse