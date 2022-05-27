import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {Container} from "react-bootstrap";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Advert from "./components/Advert";
import AddElement from "./components/AddElement";
import Error404 from "./components/Error404";
import EditAdvert from "./components/EditAdvert";
import React from "react";
import EditUserInfo from "./components/EditUserInfo";
import NavbarMenu from "./components/NavbarMenu";
import {UserProvider} from "./components/context/UserContext";
import FavouritesList from "./components/FavouritesList";


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <UserProvider>
                    <NavbarMenu/>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/advert">
                                <Route path={':id'} element={<Advert/>}/>
                                <Route path={':id/edit'} element={<EditAdvert/>}/>
                            </Route>
                            {/*Kebab case*/}
                            <Route path="/addElement" element={<AddElement/>}/>
                            <Route path="/editUserInfo" element={<EditUserInfo/>}/>
                            <Route path="/myFavouritesList" element={<FavouritesList/>}/>
                            <Route path="/error404" element={<Error404/>}/>
                            <Route path="*" element={<Error404/>}/>
                        </Routes>
                    </Container>
                </UserProvider>
            </BrowserRouter>
        </div>

    )
}

export default App;
