import React from 'react';
import {Modal} from "react-bootstrap";

const ModalOffer = ({handleShow, handleClose, title}) => {
    return (
        <Modal show={handleShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
        </Modal>
    )
};

export default ModalOffer;