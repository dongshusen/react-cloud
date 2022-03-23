import React from 'react'
import ReactDOM from 'react-dom'
import RouteIndexConfig from './base.route'
import LeXinData from '../apps/lexin/ctrl'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'

ReactDOM.render(
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LeXinData />}></Route>
            </Routes>
        </BrowserRouter>
    </div>,
    document.getElementById('root')
)

