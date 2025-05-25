import React from "react";
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}){
    return(
        <Link to={`/post/${$id}`}
        className="group block hover:-translate-y-1 transition-transform duration-200 "
        >
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className=' inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />
                </div>

                <div className="p-5 flex-grow  flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
                >{title}</h2>
                </div>
            </div>
        </Link>
        )
}

export default PostCard