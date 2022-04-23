import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Advert from "./components/Advert";
import AddElement from "./components/AddElement";
import Error404 from "./components/Error404";
import EditAdvert from "./components/EditAdvert";
import React, {useEffect, useState} from "react";
import EditUserInfo from "./components/EditUserInfo";
import axios from "axios";


function App() {

    const [data, setData] = useState([])

    useEffect(() =>{
        const fetchData = async () =>{
            const response = await axios.get(`/user/`)
            setData(response.data)
        }
        fetchData()
    },[])

    return (
        <div className="App">
            <BrowserRouter>
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
                                    <NavDropdown.Item disabled onChange>{`${data.firstName} ${data.lastName}`}</NavDropdown.Item>
                                    <LinkContainer to="/editUserInfo">
                                        <NavDropdown.Item>Edit info</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/advert">
                            <Route path={':id/edit'} element={<EditAdvert/>}/>
                            <Route path={':id'} element={<Advert/>}/>
                        </Route>
                        <Route path="/addElement" element={<AddElement/>}/>
                        <Route path="/editUserInfo" element={<EditUserInfo/>}/>
                        <Route path="/error404" element={<Error404/>}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </div>

    )
}

export default App;
