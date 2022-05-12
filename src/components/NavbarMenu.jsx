import React, {useContext, useEffect, useState} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import axios from "axios";
import {UserContext} from "./context/Context";

const NavbarMenu = () => {

    const [user] = useContext(UserContext)

    return (
        <div>
            <Navbar bg="light" expand="lg" sticky="top">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Flea Market</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/addElement">
                                <Nav.Link>Add Element</Nav.Link>
                            </LinkContainer>
                            <NavDropdown title="My account">
                                <NavDropdown.Item disabled>{`${user?.firstName} ${user?.lastName}`}</NavDropdown.Item>
                                <LinkContainer to="/editUserInfo">
                                    <NavDropdown.Item>Edit info</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/myFavouritesList">
                                    <NavDropdown.Item>My favourites</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarMenu;