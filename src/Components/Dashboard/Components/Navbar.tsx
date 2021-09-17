import React from 'react'
import UseDetails from '../../../Hooks/UseDetails'
import { FiBell, FiRefreshCcw, FiTrash2 } from 'react-icons/fi'
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerHeader, Divider, DrawerCloseButton, Spinner, Checkbox } from '@chakra-ui/react'
import { useQuery } from 'react-query'
//import url from '../../../utils/url'
import { IApiReturnType } from '../../../Types/ApiReturnType'
import { INotification } from '../../../Types/Notification'
import Lottie from 'react-lottie'
import local from '../../../utils/url'

// gettings notifications
const getMessages = async() => {
    const request = await fetch(`${local}/notifications/admin`, {
        method: 'get'
    });
    const json = await request.json() as IApiReturnType;
    console.log(json);
    if (!request.ok) {
        throw new Error("An error occured");
    } else {
        return json;
    }
}

export default function Navbar() {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [messages, setMessages] = React.useState([] as INotification[]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const { user } = UseDetails();

    // query
    const { refetch } = useQuery('getnotifications', () => getMessages(), {
        onSuccess: (data) => {
            console.log(data);
            const read = (data.data as INotification[]).filter((item) => item.read).sort((a,b) => {
                let x = a.created_at.toLowerCase();
                let y = b.created_at.toLowerCase();

                if (x > y) { return -1 }
                if (x < y) { return 1 }
                return 0;
            });
            const notread = (data.data as INotification[]).filter((item) => !item.read).sort((a,b) => {
                let x = a.created_at.toLowerCase();
                let y = b.created_at.toLowerCase();

                if (x > y) { return -1 }
                if (x < y) { return 1 }
                return 0;
            });
            const newarr: INotification[] = [];
            newarr.unshift(...read);
            newarr.unshift(...notread)
            setMessages(newarr);
            setLoading(false);
            setError(false);
        },
        onError: (error) => {
            setLoading(false);
            setError(true);
        }
    })

    const deletenoti = async(id: string) => {
        setLoading(true);
        setError(false);
        const request = await fetch(`${local}/notifications/${id}`, {
            method: 'delete'
        });
        const json = await request.json() as IApiReturnType;
        setLoading(false);
        if (json.statusCode !== 200) {
            alert(json.errorMessage);
        } else {
            alert(json.successMessage);
        }
    }

    const markasread = async(id: string) => {
        setLoading(true);
        setError(false);
        const request = await fetch(`${local}/notifications/read/${id}`, {
            method: 'post'
        });
        const json = await request.json() as IApiReturnType;
        setLoading(false);
        if (json.statusCode !== 200) {
            alert(json.errorMessage);
        } else {
            alert(json.successMessage);
        }
    }

    return (
        <div className="w-full h-20 border-b-2 border-gray-200 pl-8 flex items-center justify-between pr-8">
                <p className="font-bold text-black">Dashboard</p>
                <div className="flex w-auto justify-between items-center">
                    <p className="text-eazicred text-sm font-bold mr-4">{user.email.toUpperCase()}</p>
                    <div onClick={() => setOpenDrawer(true)} className="flex w-8 h-8 bg-gray-200 rounded-full justify-center items-center">
                        <FiBell size={20} className="text-eazicred cursor-pointer" />
                    </div>
                    {/* <div className="flex w-8 h-8 bg-gray-200 rounded-full justify-center items-center">
                        <FiMessageSquare size={20} className="text-eazicred cursor-pointer" />
                    </div> */}
                </div>

                {/* header section */}
                <Drawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)} >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton onClick={() => setOpenDrawer(false)} />
                        <DrawerHeader>
                            <div className="flex">
                                <p className="text-md text-eazicred font-semibold mb-4">Notifications <span className="mb-6 text-white text-xs bg-red-500 p-1 rounded-full">{messages.filter((item)=> !item.read).length}</span></p>
                                <div className="w-8 h-8 ml-6 rounded-full transition-all hover:scale-125 transform hover:bg-gray-200 flex justify-center items-center">
                                    <FiRefreshCcw className="text-eazicred" size={20} onClick={() => { setLoading(true); refetch()}} />
                                </div>
                            </div>
                            <Divider />
                        </DrawerHeader>

                        <DrawerBody>
                            {
                                !loading && error && (
                                    <div className="w-full h-64 bg-gray-100 flex flex-col justify-center items-center">
                                         <Lottie options={{ animationData: require('../../../lottiefiles/error.json'), autoplay: true, loop: true}} width={150} height={150}  />
                                        An error occured!
                                    </div>
                                )
                            }
                            {
                                loading && (
                                    <div className="w-full h-64 flex flex-col justify-center items-center">
                                       <Spinner size="xl" color="#29ABE2" />
                                       <p className="text-md">Loading Notifications</p>
                                    </div>
                                )
                            }
                            {
                                !loading && !error &&
                                (
                                    <div className="w-full">

                                        {
                                            messages.map((item, index) => (
                                                <div className="flex flex-col mb-4">
                                                    <div className="w-full flex justify-between mb-1 ">
                                                        
                                                        <p className="text-sm pr-2 mr-4">{item.message}</p>
                                                        <div className="text-red-400 flex items-center justify-center">
                                                            <FiTrash2 size={20} onClick={() => deletenoti(item.id)} className="cursor-pointer"  />
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex justify-between items-center">
                                                        <span className="text-xs mt-2 text-black">{new Date(item.created_at).toUTCString()}</span>
                                                        {!item.read && <Checkbox title="mark as read" checked={item.read} onChange={() => markasread(item.id)}/>}
                                                        {item.read && <div className="bg-green-100 text-green-400 w-16 h-6 rounded flex justify-center items-center text-xs mt-2"><p>opened</p></div> }
                                                    </div>
                                                    <Divider  className="mt-4" />
                                                </div>
                                            ))
                                        }

                                    </div>
                                )
                            }
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
        </div>
    )
}
