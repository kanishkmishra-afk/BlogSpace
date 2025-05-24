import React from "react";
import {Link} from 'react-router-dom'
import Logo from "../Logo";
import { BookOpenIcon, EnvelopeIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
const FooterLink=({to,children,icon})=>(
    <li>
        <Link
        to={to}
        className="text-sm text-gray-600 hover:text-indigo-600 flex items-center justify-center transition-colors"
        >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
        </Link>
    </li>
);

const SocialIcon=({plateform,path})=>{
    const icons={
        twitter:(
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.25c7.55 0 11.67-6.25 11.67-11.67 0-.18 0-.36-.01-.54A8.35 8.35 0 0022 5.92a8.2 8.2 0 01-2.36.65 4.12 4.12 0 001.8-2.27 8.2 8.2 0 01-2.61.99 4.1 4.1 0 00-6.99 3.74 11.65 11.65 0 01-8.46-4.29 4.1 4.1 0 001.27 5.48A4.07 4.07 0 012.8 9.72v.05a4.1 4.1 0 003.3 4.02 4.1 4.1 0 01-1.85.07 4.1 4.1 0 003.83 2.85A8.23 8.23 0 012 18.4a11.62 11.62 0 006.29 1.84"/>
      </svg>
        ),
        github:(
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.84c.85.01 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z" clipRule="evenodd"/>
                </svg>
        ),
    }
    return(
        <a 
        href={path}
        className="text-gray-400 hover:text-indigo-600 transition-colors"
        aria-label={plateform}
        >
            {icons[plateform]}
        </a>
    );
};

function Footer(){
    const currentYear=new Date().getFullYear();
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-12">
            <div className="mx-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Logo />
                        <p className=" flex text-sm text-gray-600">
                            A modern plateform for sharing knowlwdge and conecting through stories
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon plateform="twitter" path="https://x.com/home"/>
                            <SocialIcon plateform="github" path="https://github.com/kanishkmishra-afk/BlogSpace"/>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Explore
                        </h3>
                        <ul className="space-y-2">
                            <FooterLink to="/all-posts" icon={<BookOpenIcon className="h-4 w-4" />}>
                                All Posts
                            </FooterLink>
                            <FooterLink>Popular</FooterLink>
                            <FooterLink>Top Authors</FooterLink>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Community
                        </h3>
                        <ul className="space-y-2">
                            <FooterLink to="/about">About us</FooterLink>
                            <FooterLink to="/contact" icon={<EnvelopeIcon className="h-4 w-4" />}>Contact</FooterLink>
                            <FooterLink to="/contribute">Contribute</FooterLink>
                        </ul>
                    </div>
                        
                    <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Legal
                        </h3>
                        <ul className="space-y-2">
                            <FooterLink to="/privacy" icon={<ShieldCheckIcon  className="h-4 w-4"/>}>Privacy Policy</FooterLink>
                            <FooterLink to="/terms">Terms of Service</FooterLink>
                            <FooterLink to="/cookies">Cookie Policy</FooterLink>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-500">
                        &copy; {currentYear} BlogSpace. All rights resevered.
                    </p>
                </div>
            </div>
        </footer>
      )
    }

export default Footer