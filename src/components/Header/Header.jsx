import React from "react";
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Container,Logo,LogoutBtn} from '../index'
import { useNavigate } from "react-router-dom";
import {BookOpenIcon} from "@heroicons/react/24/outline"
function Header(){
    const authStatus=useSelector((state)=>state.auth.status)
    const userData=useSelector((state)=>state.auth.userData)
    const navigate=useNavigate()
    
    const navItems=[
        {
            name:'Home',
            slug:"/",
            active:true
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
    ]
    return(
            <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <Container>
                    <nav className="flex items-center justify-between h-16">
                        {/* {logo section} */}
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
                        {/* {Navigation Links} */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item)=>
                                item.active && (
                                        <button
                                        key={item.name}
                                        onClick={()=> navigate(item.slug)}
                                        className='px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium rounded-md hover:bg-gray-50 transition-all'
                                        >{item.name}
                                        </button>
                                    
                                )
                            )}
                        </div>
                        {/* auth section */}

                        <div className="flex items-center gap-4">
                            {!authStatus ?(
                                <>
                                <button 
                                onClick={()=>navigate('/login')}
                                className="px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                 onClick={()=>navigate('/signup')}
                                 className="px-4 py-2 bg-indigo-600  text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    Sign up
                                </button>
                                </>
                            ):(
                                <div className="flex items-center gap-4">
                                    <button
                                    onClick={()=>navigate('/add-post')}
                                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        Create Post
                                    </button>
                                    {/* {usar avatar with dropdown} */}
                                    <div className="relative group">
                                        <button className="flex items-center gap-2 focus:outline-none">
                                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <span className="text-indigo-600 font-medium text-sm">
                                                    {userData?.name?.charAt(0).toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <span className="text-gray-700 text-sm font-medium  hidden md:inline-block">
                                                {userData?.name || 'user'}
                                            </span>
                                        </button>
                                        {/* {dropdown menu} */}

                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 border border-gray-100">
                                            <button
                                            onClick={()=>navigate('/profile')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Profile
                                            </button>
                                            <button
                                            onClick={()=>navigate('/settings')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Settings
                                            </button>
                                            <div className="border-t border-blue-100 my-1"></div>
                                            <LogoutBtn />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </Container>
            </header>
        )
}
export default Header