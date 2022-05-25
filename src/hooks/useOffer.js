import {useState} from "react";

export const useOffer = () => {
    const [viewable, setViewable] = useState(false)

    const offerShow = () => {
        setViewable(true)
    }

    const offerClose = () => {
        setViewable(false)
    }

    return {offerShow, offerClose, viewable}
}