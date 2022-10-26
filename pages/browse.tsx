import {HStack, IconButton, useColorMode} from "@chakra-ui/react";
import Movie from "../components/Movie";
import ColorMode from "../components/ColorMode";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Browse() {
    const movies = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    return <>
        <Header />
        <HStack>
            {/* Make buttons disapear when using small screens and fix screen issue */}
            <IconButton className="" aria-label="Play movie" icon={<FontAwesomeIcon icon={faArrowLeft} style={{color: "white", fontSize: 50}} />} variant="link" onClick={() => {
                var slider = document.getElementById("slider")
                slider!.scrollLeft = slider!.scrollLeft - 1000
            }} />
            <HStack h="full" id="slider" className="overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                {movies.map(movie => (
                        <Movie id="1" />
                        ))}
            </HStack>
            <IconButton aria-label="Play movie" icon={<FontAwesomeIcon icon={faArrowRight} style={{color: "white", fontSize: 50}} />} variant="link" onClick={() => {
                var slider = document.getElementById("slider")
                slider!.scrollLeft = slider!.scrollLeft + 1000
            }} />
        </HStack>
    </>
}

export default Browse