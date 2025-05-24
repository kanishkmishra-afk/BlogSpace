import { ArrowRightIcon, BookOpenIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from '../appwrite/config'
import { PostCard } from "../components";
import Container from "../components/container/Container";
import { Link } from 'react-router-dom'

function Home(){
    const [posts,setPosts]=useState([])
    const [loading,setLoading]=useState(true)
    const authStatus=useSelector((state)=>state.auth.status);

    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    },[])
    
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setLoading(false)
        },1000);
        return()=>clearTimeout(timer);
    },[]);

    if(loading){
        return(
            <Container>
                <div className="justify-center py-12">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[...Array(3)].map((_,i)=>(
                                    <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }


    if(posts.length === 0){
        return(
            <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
                <Container>
                    <div className="max-w-3xl mx-auto text-center px-4 py-12">
                        <BookOpenIcon  className="h-16 w-16 mx-auto text-indigo-600 mb-6"/>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {authStatus ? "No Posts Yet":"Discover Amazing Stories"}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            {authStatus 
                               ?"Be the first to share your story with the community!"
                               :"join our community of readers and writers. sign in to explore posts or create your own"
                        }
                        </p>
                        <div>
                            {authStatus ?(
                                <Link
                                    to="/add-post"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base rounded-md font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                                >
                                    <PencilSquareIcon  className="mr-2 h-5 w-5"/>
                                    Create First Post
                                </Link>
                            ):(
                                <>
                                    <Link
                                    to="/login"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium  rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                                    >
                                       Sign in
                                       <ArrowRightIcon className="ml-2 h-5 w-5"/>
                                    </Link>

                                    <Link
                                    to="/signup"
                                    className="inline-flex mx-2 items-center px-6 py-3 border border-transparent text-base font-medium  rounded-md shadow-sm text-indig0-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        <div>
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Posts</h2>
                    <p className="text-lg text-gray-600  mx-w-2xl mx-auto">
                        Discover the latest stories from our community
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post)=>(
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
                {authStatus && (
                    <div className="mt-8 text-center">
                        <Link
                        to="/add-post"
                        className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium  rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                        <PencilSquareIcon className="mr-2 h-5 w-5"/>
                        Create New Post
                        </Link>
                    </div>
                )}

                {posts.length > 6 &&(
                    <div className="mt-8 text-center">
                        <Link
                        to="/posts"
                        className="inline-flex items-center px-5 py-3 border border-gray-300 text-base font-medium  rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                        View All Posts
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home