import React, { FC } from "react";
import LeXinData from '../apps/lexin/ctrl'
import { Routes, Route } from "react-router-dom";

const RouteIndexConfig: FC = () => {
    return (
        <Routes>
            <Route path={'/lexin'} element={LeXinData}></Route>
        </Routes>
    )
}

export default RouteIndexConfig