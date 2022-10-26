import {Box, IconButton, Image, Link} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function Movie(props: any) {
    const [isHovering, setIsHovering] = useState(false)

    const supabase = useSupabaseClient()
    const router = useRouter()

    const [movieData, setMovieData] = useState<any>(null)

    useEffect(() => {
        fetch("api/getMovieData?id=" + props.id)
        .then((res) => res.json())
        .then((data) => {
            setMovieData(data)
            console.log(data)
        })
    }, [props.id])

    return (
        <div className="cursor-pointer" onClick={(e) => {

        }}>
            <Box pos="relative" className="h-fit w-72 hover:w-80 transition-all" borderWidth='1px' borderRadius='lg' overflow='hidden' zIndex="50"
                onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} onClick={() => { router.push("/watch?id=" + props.id) }}>
                <Image src={props.coverUrl} alt="Cover image" className="h-full w-full" />
                {isHovering ? (
                        <div className="absolute z-[100] top-0 right-0 h-40 w-72 hover:w-80 hover:h-[11.1rem] bg-[#0000004d]">
                            <IconButton aria-label="Play movie" pos="absolute" className="left-3 bottom-5"
                                icon={<FontAwesomeIcon icon={faPlay} style={{color: "white", fontSize: 50}} />} variant="link" onClick={() => {
                                    router.push("/watch?id=" + props.id)
                                }} />
                            <IconButton aria-label="More info" pos="absolute" className="right-3 bottom-5"
                                icon={<FontAwesomeIcon icon={faCircleInfo} style={{color: "white", fontSize: 50}} />} variant="link" onClick={() => {

                                }} />
                        </div>
                ) : ""}
            </Box>
        </div>
    )
}

export default Movie