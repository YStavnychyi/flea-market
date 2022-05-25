import {useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export const useModal = () => {
    const [visible, setVisible] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    const handleShow = () => {
        setVisible(true)
    }

    const handleClose = () => {
        setVisible(false)
    }

    const handleSave = async () => {
        await axios.delete(`/adverts/${id}`)
        handleClose()
        navigate('/')
    }

    return {handleShow, handleClose, handleSave, visible}
}