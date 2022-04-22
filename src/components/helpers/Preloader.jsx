import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Preloader = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }} >
        <RotatingLines width="100" strokeColor="#000000" strokeWidth="1" />
    </div >
}

export default Preloader;