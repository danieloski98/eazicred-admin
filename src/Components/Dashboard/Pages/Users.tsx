import React from 'react'
import { FiSearch, FiRefreshCcw } from 'react-icons/fi'
import local from '../../../utils/url'
import { IApiReturnType } from '../../../Types/ApiReturnType'
import { useQuery } from 'react-query'
import UseDetails from '../../../Hooks/UseDetails'
import Lottie from 'react-lottie'
import { IUser } from '../../../Types/User'
import UserModal from '../Components/UserModal'

import { InputGroup } from "@/components/ui/input-group"
import { Input, Spinner, Table } from '@chakra-ui/react'

const getUsers = async (token: string) => {
    console.log(token);
    const res = await fetch(`${local}/admin/users`, {
        method: 'get',
        headers: {
            authorization: `Bearer ${token}`,
        },
    })

    const json = await res.json() as IApiReturnType;

    if (!res.ok) {
        return json;
    }
    return json;
}

export default function Users() {
    const { token } = UseDetails();
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([] as Array<IUser>);
    const [error, setError] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentUser, setCurrentUser] = React.useState({} as IUser)
    const [showModal, setShowModal] = React.useState(false);

    const { refetch } = useQuery(['getusers', token], () => getUsers(token), {
        onSuccess: (data) => {
            console.log(data);
            setUsers(data.data);
            setLoading(false);
            setError(false);
        },
        onError: (error) => {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    });

    const retry = async () => {
        setLoading(true);
        setError(false);
        await refetch()
    }

    return (
        <div className="w-full h-full flex flex-col">
            <UserModal user={currentUser} open={showModal} close={() => setShowModal(false)} />
            <div className="w-full h-24 flex justify-between items-center">

                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-gray-600">Users</h2>
                    <p className="text-md text-gray-500 mt-2 font-sans">List of users on EaziCred</p>
                </div>

                <div className="flex ">
                    <InputGroup className="h-12" width="sm" startElement={<FiSearch size={20} color="grey" />}>
                        <Input className="w-72" placeholder="Search by email or firstname" fontSize="sm" onChange={e => setSearchTerm(e.target.value)} />
                    </InputGroup>
                    <div onClick={retry} title="Refresh" className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center hover:scale-125 transition-all transform hover:text-eazicred cursor-pointer">
                        <FiRefreshCcw size={20} />
                    </div>
                </div>

            </div>
            {
                loading && (

                    <div className="w-full flex flex-col items-center mt-10">
                        <Spinner color="#29ABE2" size="xl" />
                        <p className="text-eazicred text-xl mt-6">Getting Users</p>
                    </div>
                )
            }
            {
                !loading && error && (
                    <div className="w-full flex flex-col items-center mt-10">
                        <Lottie options={{ animationData: require('../../../lottiefiles/error.json'), autoplay: true, loop: true }} width={150} height={150} />
                        <p className="text-center mt-6 font-sans text-sm">An Error Occured!</p>
                        <button className="w-24 h-10 rounded bg-eazicred text-sm text-white mt-6">Retry</button>
                    </div>
                )
            }

            {
                !loading && !error && (
                    <div style={{ height: '450px' }} className="w-full rounded-md border-2 border-gray-300 p-4 overflow-y-scroll">
                        <Table.Root className="h-auto overflow-y-auto w-full">

                            <Table.Row className="h-10  border-b-2 border-gray-200">
                                <Table.ColumnHeader className="w-20 text-left">S/N</Table.ColumnHeader>
                                <Table.ColumnHeader className="w-40 text-left">Name</Table.ColumnHeader>
                                <Table.ColumnHeader className="w-40 text-left">Email</Table.ColumnHeader>
                                <Table.ColumnHeader className="w-40 text-left">Phone</Table.ColumnHeader>
                                <Table.ColumnHeader className="w-40 text-left">Referral Code</Table.ColumnHeader>
                                <Table.ColumnHeader className="w-20 text-left">Action</Table.ColumnHeader>
                            </Table.Row>

                            {
                                users.filter((val) => {
                                    if (searchTerm === '') {
                                        return val
                                    } else if (val.email.toLowerCase().includes(searchTerm.toLowerCase()) || val.firstname.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val;
                                    }
                                }).map((items, index) => (
                                    <Table.Row className="pt-6" key={index.toString()}>
                                        <Table.Cell className="pt-6">{index + 1}</Table.Cell>
                                        <Table.Cell className="pt-6 text-sm">{items.firstname} {items.lastname}</Table.Cell>
                                        <Table.Cell className="pt-6 text-sm">{items.email}</Table.Cell>
                                        <Table.Cell className="pt-6 text-sm">{items.phone}</Table.Cell>
                                        <Table.Cell className="pt-6 text-sm">{items.referralCode}</Table.Cell>
                                        <Table.Cell className="pt-6 text-sm">
                                            <button onClick={() => { setCurrentUser(items); setShowModal(true) }} className="w-24 text-eazicred bg-blue-100 text-sm h-8 rounded">View User</button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }





                        </Table.Root>
                    </div>
                )
            }
        </div>
    )
}
