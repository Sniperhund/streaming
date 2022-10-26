import {useRouter} from "next/router";

function Redirect(props: any) {
    useRouter().push(props.dest)

    return <></>
}

export default Redirect