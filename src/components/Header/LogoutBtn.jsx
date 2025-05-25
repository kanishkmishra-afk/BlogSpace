import React from "react";
import {useDispatch} from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from "../../appwrite/auth";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function LogoutBtn(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
            navigate('/')
            window.location.reload();
        }).catch((error)=>{
            throw error;
        })
    }
    return(
        <button className={`flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:text-red-600 transition-colors`}
        iconClassName={`h-5 w-5 mr-2 text-gray-400 hover:text-red-400`}
        onClick={logoutHandler}
        
        >
            <ArrowDownCircleIcon className="h-5 w-5 mr-2" />
            Sign Out</button>
    )
}

export default LogoutBtn