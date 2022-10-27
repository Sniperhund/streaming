import {
    Box,
    Flex,
    IconButton,
    Image,
    Link,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    ModalFooter,
    useColorMode
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function Movie(props: any) {
    const [isHovering, setIsHovering] = useState(false)
    const router = useRouter()

    const [coverImage, setCoverImage] = useState<any>(null)
    const [name, setName] = useState<any>(null)
    const [description, setDescription] = useState<any>(null)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { colorMode, toggleColorMode } = useColorMode()

    useEffect(() => {
        fetch("api/getMovieData?id=" + props.id)
        .then((res) => res.json())
        .then((data) => {
            setCoverImage(data.data[0].coverUrl)
            setName(data.data[0].name)
            setDescription(data.data[0].description)
        })
    }, [props.id])

    return (
        <div>
            <Box pos="relative" className="h-fit w-72 hover:w-80 transition-all" borderWidth='1px' borderRadius='lg' overflow='hidden' zIndex="50"
                onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
                <Image src={coverImage} alt="Cover image" className="h-full w-full" />
                {isHovering ? (
                        <div className="absolute z-[100] top-0 right-0 h-40 w-72 hover:w-80 hover:h-[11.1rem] bg-[#0000004d]">
                            <IconButton aria-label="Play movie" pos="absolute" className="left-3 bottom-5"
                                icon={<FontAwesomeIcon icon={faPlay} style={{color: "white", fontSize: 50}} />} variant="link" onClick={() => {
                                    router.push("/watch?id=" + props.id)
                                }} />
                            <IconButton aria-label="More info" pos="absolute" className="right-3 bottom-5"
                                icon={<FontAwesomeIcon icon={faCircleInfo} style={{color: "white", fontSize: 50}} />} variant="link" onClick={onOpen} />
                        </div>
                ) : ""}
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="xl" mb="0.5">Description</Text>
                        <Text fontSize="sm">{description}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <IconButton aria-label="Play movie" mt="4"
                            icon={<FontAwesomeIcon icon={faPlay} style={{color: colorMode == "light" ? "gray" : "white", fontSize: 50}} />} variant="link" onClick={() => {
                                router.push("/watch?id=" + props.id)
                            }} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Movie