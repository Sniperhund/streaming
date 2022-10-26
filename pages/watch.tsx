import {useRouter} from "next/router";
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Slider,
    SliderFilledTrack, SliderThumb, SliderTrack, Spacer
} from "@chakra-ui/react";
import {useRef, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faVolumeHigh,
    faVolumeMute,
    faExpand,
    faCompress,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


function Watch() {
    const router = useRouter()
    const id = router.query.id

    const [movieData, setMovieData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    // @ts-ignore
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const websiteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoading(true)
        fetch("api/getMovieData?id=" + id)
        .then((res) => res.json())
        .then((data) => {
            setMovieData(data.data)
            setLoading(false)
            videoRef.current!.src = data.data[0].movieUrl
        })

        videoRef.current?.addEventListener("play", () => {
            setIsVideoPlaying(true)
        })

        videoRef.current?.addEventListener("pause", () => {
            setIsVideoPlaying(false)
        })

        videoRef.current?.addEventListener("volumechange", () => {
            if (videoRef.current != null)
            {
                setIsVideoMuted(videoRef.current.muted)
                if (!videoRef.current.muted)
                    if (videoRef.current.volume == 0)
                        setIsVideoMuted(true)
            }
        })

        document.addEventListener('fullscreenchange', () => {
            setIsFullscreen(document.fullscreenElement);
        });
    }, [])

    return <>
        <Flex ref={websiteRef}>
            <Box pos="absolute" zIndex="-10" className="h-screen w-screen bg-black" />
            <Flex pos="absolute" className="h-screen w-screen">
                <Box
                    as="video"
                    autoPlay
                    src={""}
                    className="m-auto h-screen"
                    sx={{ aspectRatio: '16/9' }}
                    ref={videoRef}
                    onClick={(e) => {
                        if (videoRef.current?.paused)
                            videoRef.current?.play()
                        else
                            videoRef.current?.pause()
                    }}
                />
                <Flex pos="absolute" zIndex="100" className="right-6 top-6">
                    <IconButton aria-label={"Go back"} className="hover:scale-100 lg:hover:scale-125 scale-75 lg:scale-100"
                        icon={<FontAwesomeIcon icon={faXmark} style={{color: "white", fontSize: 50}} />} variant="link" onClick={() => { router.push("../browse") }} />
                </Flex>
                <Flex pos="absolute" zIndex="75" className="w-full h-[200px] bottom-0">
                    <Slider mb="60px" ml="25px" mr="25px" max={videoRef.current?.duration} defaultValue={0} onChange={(num) => {
                        videoRef.current!.currentTime = num
                    }}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Flex>
                <Flex pos="absolute" zIndex="100" className="w-full h-[100px] bottom-0">
                    <HStack spacing="12" ml="12" mb="10">
                        <IconButton className="hover:scale-100 lg:hover:scale-125 scale-75 lg:scale-100" aria-label="Play icon" variant="link"
                            icon={isVideoPlaying ? <FontAwesomeIcon icon={faPause} style={{color: "white", fontSize: 50}} /> : <FontAwesomeIcon icon={faPlay} style={{color: "white", fontSize: 50}} />} onClick={(e) => {
                                if (videoRef.current?.paused)
                                    videoRef.current?.play()
                                else
                                    videoRef.current?.pause()
                            }} />
                        <IconButton className="hover:scale-100 lg:hover:scale-125 scale-75 lg:scale-100" aria-label="Volume icon" variant="link"
                            icon={<FontAwesomeIcon icon={isVideoMuted ? faVolumeMute : faVolumeHigh} style={{color: "white", fontSize: 50}} />} onClick={(e) => {
                                if (videoRef.current?.muted)
                                    videoRef.current!.muted = false
                                else
                                    videoRef.current!.muted = true
                            }} />
                        <div className="absolute left-[9rem] md:left-[10rem] lg:left-[11rem] scale-75 lg:scale-100">
                            <Slider w="100px" defaultValue={videoRef.current?.volume} onChange={(num) => {
                                videoRef.current!.volume = num / 100
                                videoRef.current!.muted = false
                            }}>
                                <SliderTrack>
                                    <SliderFilledTrack/>
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </div>
                        <IconButton pos="absolute" className="hover:scale-100 lg:hover:scale-125 scale-75 lg:scale-100 right-[2rem]" aria-label="Volume icon" variant="link"
                            icon={<FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} style={{color: "white", fontSize: 50}} />} onClick={(e) => {
                                if (!isFullscreen)
                                    websiteRef.current?.requestFullscreen()
                                else
                                    document.exitFullscreen()
                            }} />
                    </HStack>
                </Flex>
            </Flex>
        </Flex>
    </>
}

export default Watch