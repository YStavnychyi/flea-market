import {createContext, useCallback, useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const UserContext = createContext([null, () => undefined]);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null)

    const fetchData = useCallback(async () => {
        const response = await axios.get(`/user`)
        setUser(response.data)
    },[])

    useEffect(() =>{
        fetchData().then()
    },[fetchData])

    return (
        <UserContext.Provider value={[user,fetchData]}>
            {props.children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node
}