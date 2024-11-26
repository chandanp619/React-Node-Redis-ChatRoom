import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";
import HomeComponent from "./components/HomeComponent";
import RoomComponent from "./components/RoomComponent";
import ErrorComponent from "./components/ErrorComponent";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <HomeComponent />,
        errorElement: <ErrorComponent />,
    },
    {
        'path': '/login',
        'element': <LoginComponent />,
        'errorElement': <ErrorComponent />
    },
    {
        path: "/rooms",
        element: <RoomComponent />,
    },
    {
        path: "/logout",
        element: <LogoutComponent />,
    },
    {
        path: "*",
        element: <div>404</div>,
    }
]);

export default Routes;