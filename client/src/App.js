import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <div style={{ marginTop: '64px' }}>
                <Routes>
                    <Route path='/' exact Component={Home} />
                    <Route path='/auth' exact Component={Auth} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
