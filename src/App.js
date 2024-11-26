import React from "react";
import { RouterProvider } from "react-router-dom";
import Routes from "./router";
import Bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.scss";


const App = () => {
    return (
        <RouterProvider router={Routes} />
    );
};

export default App;