import React from "react";
import image from '../assets/image.jpeg'
import logo from '../assets/logo.svg'
function Logo({width='100px'}){
    return(
        <img src={logo} alt="logo" style={{width}} />
    )
}
export default Logo