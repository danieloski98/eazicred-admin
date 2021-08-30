import React from 'react'
import { FiHome, FiActivity, FiClock, FiUsers } from 'react-icons/fi'
import { useLocation, NavLink } from 'react-router-dom'

const ACTIVECLASS = "w-full h-12 border-l-4 border-eazicred flex items-center mt-8 text-eazicred cursor-pointer"
const INACTIVECLASS = "w-full h-12 border-eazicred flex items-center mt-8 text-gray-500 cursor-pointer"

export default function Sidebar() {
    const location = useLocation()

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-20 flex items-center justify-center">
                <img src="/assets/eazicred-logo.svg" alt=""  />
            </div>

            <div className="flex-1 flex flex-col pt-10">
                <p className="font-semibold text-gray-600 text-md text-center">ADMIN MANAGEMENT</p>

                <NavLink
                to="/dashboard/users"
                >
                    <div className={location.pathname === '/dashboard/users' ? ACTIVECLASS:INACTIVECLASS}>
                        <FiHome size={20} className="ml-12" />
                        <p className="text-sm ml-2">Users</p>
                    </div>
                </NavLink>

                <NavLink
                    to="/dashboard/paydayloans"
                >
                    <div className={location.pathname === '/dashboard/paydayloans' ? ACTIVECLASS:INACTIVECLASS}>
                        <FiActivity size={20} className="ml-12" />
                        <p className="text-sm ml-2">Payday Loans</p>
                    </div>
                </NavLink>

                <NavLink
                    to="/dashboard/smeloans"
                >
                    <div className={location.pathname === '/dashboard/smeloans' ? ACTIVECLASS:INACTIVECLASS}>
                        <FiActivity size={20} className="ml-12" />
                        <p className="text-sm ml-2">SME Loans</p>
                    </div>
                </NavLink>

                <NavLink
                    to="/dashboard/agents"
                >
                    <div className={location.pathname === '/dashboard/agents' ? ACTIVECLASS:INACTIVECLASS}>
                        <FiClock size={20} className="ml-12" />
                        <p className="text-sm ml-2">Agents</p>
                    </div>
                </NavLink>

                <NavLink
                    to="/dashboard/admins"
                >
                    <div className={location.pathname === '/dashboard/admins' ? ACTIVECLASS:INACTIVECLASS}>
                        <FiUsers size={20} className="ml-12" />
                        <p className="text-sm ml-2">Admins</p>
                    </div>
                </NavLink>

            </div>

            <div className="w-full h-20 flex items-center justify-center">
                <p className="text-eazicred text-md font-sans cursor-pointer">Log out</p>
            </div>
        </div>
    )
}
