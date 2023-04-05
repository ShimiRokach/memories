import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact Component={Home} />
                <Route path='/auth' exact Component={Auth} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
