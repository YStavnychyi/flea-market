import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalWindow = ({handleShow, handleClose, handleSave}) => {
    return (
        <Modal show={handleShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure wanted to delete ?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button onClick={handleSave}>Yes</Button>
                <Button variant='danger' onClick={handleClose}>No</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalWindow;