import {Heading, HStack, IconButton, useColorMode} from "@chakra-ui/react";
import Movie from "../components/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function BrowseMovieSection(props: any) {
    const [width, setWidth] = useState(0)
    const [slider, setSlider] = useState<HTMLElement>()
    const [watchList, setWatchList] = useState([])

    const { colorMode, toggleColorMode } = useColorMode()

    useEffect(() => {
        setWatchList(props.watchList)
        setWidth(window.innerWidth)
        window.addEventListener("resize", () => { setWidth(window.innerWidth) })
        // @ts-ignore
        setSlider(document.getElementById("slider"))
    }, [])

    return <>
        <Heading ml="14" mt="4">{props.sectionName}</Heading>
        <HStack m="2">
            {/* Make buttons disapear smoothly when using small screen and fix screen issue */}
            {width >= 800 ? (
                    <IconButton aria-label="Slide left" icon={<FontAwesomeIcon icon={faChevronLeft} style={{color: colorMode == "light" ? "gray" : "white", fontSize: 50}} />} variant="link" onClick={() => {
                        slider!.scrollLeft = slider!.scrollLeft - 1000
                    }} /> ) : "" }
            <HStack h="full" id="slider" className="overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                {watchList.map((movie, index) => (
                    <Movie id={movie} key={index} />
                ))}
            </HStack>
            {width >= 800 ? (
                    <IconButton aria-label="Slide right" icon={<FontAwesomeIcon icon={faChevronRight} style={{color: colorMode == "light" ? "gray" : "white", fontSize: 50}} />} variant="link" onClick={() => {
                        slider!.scrollLeft = slider!.scrollLeft + 1000
                    }} /> ): "" }
        </HStack>
    </>
}

export default BrowseMovieSection