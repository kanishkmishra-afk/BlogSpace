import React from "react";
import {Link} from 'react-router-dom'
import {BookOpenIcon} from "@heroicons/react/24/outline"

import logo from '../assets/logo.svg'
function Logo(){
    return(
        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-1.5 rounded-lg bg-indigo-600 group-hover:bg-indigo-700 transition-colors">
                                <BookOpenIcon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 hidden sm:inline-block">
                                BlogSpace
                            </span>
                            </Link>
                        </div>
    )
}
export default Logo