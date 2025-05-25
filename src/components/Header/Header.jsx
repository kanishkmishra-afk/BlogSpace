import React, { useState } from "react";
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Container,Logo,LogoutBtn} from '../index'
import { useNavigate } from "react-router-dom";
import {BookOpenIcon, ChevronDownIcon, ChevronUpIcon, Cog6ToothIcon, UserCircleIcon} from "@heroicons/react/24/outline"
function Header(){
    const authStatus=useSelector((state)=>state.auth.status)
    const userData=useSelector((state)=>state.auth.userData)
    const navigate=useNavigate()
    const [isDropdownOpen,setIsDropdownOpen]=useState(false)

    const colors = {
        primary: 'bg-indigo-600',
        primaryHover: 'hover:bg-indigo-700',
        secondary: 'bg-indigo-100',
        textPrimary: 'text-indigo-600',
        textHover: 'hover:text-indigo-700',
        border: 'border-indigo-200'
      };
    
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
            <header className="sticky top-0 z-50 bg-sky-900/10 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <Container>
                    <nav className="flex items-center justify-between h-16">
                        {/* {logo section} */}
                        <Logo />
                        {/* {Navigation Links} */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item)=>
                                item.active && (
                                        <button
                                        key={item.name}
                                        onClick={()=> navigate(item.slug)}
                                        className='px-3 py-1 text-gray-600 hover:text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-all'
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
                                    <div className="relative h-full flex item-center"
                                    onMouseEnter={()=>setIsDropdownOpen(true)}
                                    onMouseLeave={()=>setIsDropdownOpen(false)}
                                    >
                                        <button
                                        onClick={()=>setIsDropdownOpen(!isDropdownOpen)}
                                        className={`flex items-center gap-2 focus:outline-none group px-2 py-1 rounded-md ${isDropdownOpen?'bg-indigo-50':''}`}>
                                            <div className={`h-8 w-8 rounded-full ${colors.secondary} flex items-center justify-center border ${colors.border}`}>
                                                <span className={`${colors.textPrimary} font-medium text-sm`}>
                                                    {userData?.name?.charAt(0).toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <span className="text-gray-700 text-sm font-medium  hidden md:inline-block">
                                                {userData?.name || 'user'}
                                            </span>
                                                <ChevronDownIcon className={`h-4 w-4 ${colors.textPrimary} transition-transform duration-200 ${isDropdownOpen?'rotate-180':''}`}/>
                                
                                        </button>
                                        {/* {dropdown menu} */}

                                        {isDropdownOpen && (
                                            
                                        <div className={`absolute right-0 top-full w-[175px] bg-indigo-50 rounded-lg shadow-lg z-50 border border-indigo-200 transition-all duration-300}`}>

                                        <div className="py-1.5 space-y-1">
                                        <button
                                        onClick={()=>{
                                            navigate('/profile')
                                            setIsDropdownOpen(false)
                                    }}
                                        className={`flex items-center w-full px-3 py-2 hover:bg-gray-200 text-sm text-gray-700 rounded-md ${colors.textHover} transition-colors`}
                                        >
                                            <UserCircleIcon className={`h-5 w-5 mr-2 ${colors.textPrimary}`} />
                                            Profile
                                        </button>
                                        <button
                                        onClick={()=>{
                                            navigate('/settings')
                                            setIsDropdownOpen(false)
                                        }}
                                        className={`flex items-center w-full  hover:bg-gray-200 px-3 py-2 text-sm text-gray-700 rounded-md ${colors.textHover} transition-colors`}
                                        >
                                            <Cog6ToothIcon className={`h-5 w-5 mr-2 ${colors.textPrimary}`} />
                                            Settings
                                        </button>
                                        <div className={`border-t ${colors.border} my-1`}></div>
                                        <LogoutBtn />
                                        </div>
                                    </div>
                                        )}
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