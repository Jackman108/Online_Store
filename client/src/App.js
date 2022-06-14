import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import {check} from "./http/userAPI";
import Auth from "./pages/Auth";

const App = observer(() => {
    const {data} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(user => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false));
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
            <Auth />
        </BrowserRouter>
    );
});

export default App;
