import React from 'react'
import Navbar from '../Components/Dashboard/Components/Navbar'
import Sidebar from '../Components/Dashboard/Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { tokenAtom, UserAtom } from '../State/UserState';
import { useNavigate, useLocation } from 'react-router-dom'
import { useColorMode } from '@/components/ui/color-mode';
import { Box } from '@chakra-ui/react';

export default function Dashboard() {
    const history = useNavigate();
    const location = useLocation();

    const [, setUser] = useRecoilState(UserAtom);
    const [, setToken] = useRecoilState(tokenAtom);

    const { toggleColorMode, colorMode } = useColorMode();

    React.useEffect(() => {
        if (colorMode === 'dark') {
            toggleColorMode()
        }
    }, [])

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
            <div className="flex-1 bg-white">
                <Navbar />
                <Box flex={1} overflowY={'auto'} overflowX={'hidden'} pt="20px" px="30px">
                    <Outlet />
                </Box>
            </div>
        </div>
    )
}
