import React from 'react'
import { useColorMode } from "@/components/ui/color-mode"
import LoginForm from '../Components/Login/Form'

export default function Login() {
    const { toggleColorMode, colorMode } = useColorMode();

    React.useEffect(() => {
        if (colorMode === 'dark') {
            toggleColorMode()
        }
    }, [])
    return (
        <div className="w-screen h-screen flex">
            <div className="flex-1 w-full h-full flex justify-center items-center">
                <LoginForm />
            </div>
            <div className="flex-1 bg-gray-300">
                <img src="/assets/hero-image.png" alt="" className="w-full h-full object-cover" />
            </div>
        </div>
    )
}
