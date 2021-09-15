import React from 'react'
import UseDetails from '../../../Hooks/UseDetails'
import { FiBell } from 'react-icons/fi'

export default function Navbar() {
    const { user } = UseDetails();

    return (
        <div className="w-full h-20 border-b-2 border-gray-200 pl-8 flex items-center justify-between pr-8">
                <p className="font-bold text-black">Dashboard</p>
                <div className="flex w-64 justify-between items-center">
                    <p className="text-eazicred text-sm font-bold">{user.email.toUpperCase()}</p>
                    <div className="flex w-8 h-8 bg-gray-200 rounded-full justify-center items-center">
                        <FiBell size={20} className="text-eazicred cursor-pointer" />
                    </div>
                    {/* <div className="flex w-8 h-8 bg-gray-200 rounded-full justify-center items-center">
                        <FiMessageSquare size={20} className="text-eazicred cursor-pointer" />
                    </div> */}
                </div>
        </div>
    )
}
