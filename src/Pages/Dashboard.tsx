import React from 'react'
import Navbar from '../Components/Dashboard/Components/Navbar'
import Sidebar from '../Components/Dashboard/Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { tokenAtom, UserAtom } from '../State/UserState';
import { useNavigate, useLocation } from 'react-router-dom'

export default function Dashboard() {
    const history = useNavigate();
    const location = useLocation();

    const [, setUser] = useRecoilState(UserAtom);
    const [, setToken] = useRecoilState(tokenAtom);

    React.useMemo(() => {
        const userState = localStorage.getItem('eazi-user');
        const tokenData = localStorage.getItem('eazi-token');

        if (userState === null || tokenData === null) {
            history('/');
        } else {
            setToken(tokenData);
            console.log(userState);
            const serializedUser = JSON.parse(userState);
            setUser(serializedUser);

            if (location.pathname !== '/') {
                return;
            } else {
                history(location.pathname);
            }
        }
    }, []);
    return (
        <div className="w-screen h-screen flex">
            <div className="w-72 h-full bg-gray-200 z-20 shadow-lg">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Navbar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden pt-10 pl-8 pr-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
