"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBars, FaTimes, FaUserAlt } from 'react-icons/fa'; // Hamburger and close icons

const Header = () => {
    const { data: session } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.error(error);
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }

    return (
        <header className=" text-white shadow-md py-4">
            <div className="container flex justify-between items-center mx-auto px-6 md:px-20">
                {/* Logo */}
                <Link href="/">
                    <h1 className="text-3xl font-semibold tracking-tight hover:text-primary transition duration-300">ReelsPro</h1>
                </Link>

                {/* Hamburger Menu Icon (Visible on small screens) */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu}>
                        <FaBars size={30} />
                    </button>
                </div>

                {/* Desktop Menu (Visible on medium and larger screens) */}
                <div className="hidden md:flex items-center space-x-4">
                    {session?.user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-lg">{session.user.name}</span>
                            <button
                                onClick={handleSignOut}
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link href="/login">
                                <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300">
                                    Login
                                </button>
                            </Link>
                            <Link href="/register">
                                <button className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition duration-300">
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu (Visible on small screens) */}
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-end p-4">
                        <button onClick={toggleMenu}>
                            <FaTimes size={30} className="text-white" />
                        </button>
                    </div>
                    <div className="flex justify-center flex-col items-center space-y-4 text-lg">
                        {session?.user ? (
                            <button
                                onClick={handleSignOut}
                                className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300"
                            >
                                Sign out
                            </button>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/register">
                                    <button className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition duration-300">
                                        Register
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

