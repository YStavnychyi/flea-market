import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalWindow = ({handleShow, handleClose, handleSave, title, btnYes, btnNo}) => {
    return (
        <Modal show={handleShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button onClick={handleSave}>{btnYes}</Button>
                <Button variant='danger' onClick={handleClose}>{btnNo}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalWindow;