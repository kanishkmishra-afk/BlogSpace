import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowLeftIcon, PencilSquareIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading,setLoading]=useState(true)
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setLoading(false)
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
            if(window.confirm("Are you sure you want to delete this post?")){
                appwriteService.deletePost(post.$id).then((status) => {
                    if (status) {
                        appwriteService.deleteFile(post.featuredImage);
                        navigate("/");
                    }
        })
        }
    };

    if(loading){
        return(
            <Container>
                <div className="justify-center py-12">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[...Array(6)].map((_,i)=>(
                                    <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }

    return post ? (
        <div className="py-8">
            <Container>
                <button
                onClick={()=>navigate(-1)}
                className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
                >
                    <ArrowLeftIcon  className="h-5 w-5 mr-2"/>
                    Back to posts
                </button>
                <article className="max-w-4xl mx-auto">
                <header className="mb-8">

                <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-auto mx-h-[400px] object-cover"
                    />


                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button  
                                bgColor="bg-white/90 hover:bg-white"
                                textColor="text-gray-800"
                                className="shadow-md px-3 py-2">
                                    <PencilSquareIcon className="h-5 w-5"/>
                                </Button>
                            </Link>
                            <Button  
                            bgColor="bg-red-500/90 hover:bg-red-600"
                            className="shadow-md px-3 py-2"
                            onClick={deletePost}>
                                <TrashIcon className="h-5 w-5"/>
                            </Button>
                        </div>
                    )}
                </div>       

                    <h1 className="text-3xl font-bold md:text-4xl text-gray-900 mb-4">{post.title}</h1>
    
                </header>
                <div className="prose max-w-none prose-lg prose-headings:font-medium prose-a:text-indigo-600 hover:prose-a:text-indigo-800 prose-img:shadow-md">
                    {parse(post.content)}
                    </div>
                </article>
                    
            </Container>
        </div>
    ) : null;
}