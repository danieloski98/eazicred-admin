import React from 'react'
import { InputGroup, InputLeftElement, Input, Spinner } from '@chakra-ui/react'
import local from '../../../utils/url'
import { IApiReturnType } from '../../../Types/ApiReturnType'
import { useQuery } from 'react-query'
import UseDetails from '../../../Hooks/UseDetails'
import Lottie from 'react-lottie'
import { ISMELoan } from '../../../Types/SMEloan'
import { FiSearch, FiRefreshCcw, } from 'react-icons/fi'
import SMEModal from '../Components/SMEModal'
const xlsx = require('json-as-xlsx')

const getUsers = async (token: string) => {
    console.log(token);
    const res = await fetch(`${local}/admin/SMEloans`, {
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

export default function SMELoan() {
    const { token, user } = UseDetails();
    const [loading, setLoading] = React.useState(true);
    const [users,setUsers] = React.useState([] as Array<ISMELoan>);
    const [error, setError] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [currentLoan, setCurrentLoan] = React.useState({} as ISMELoan);

    const settings = {
        fileName: 'MySpreadsheet', // Name of the spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
      }

const checkType = (type: number) => {
    switch(type) {
        case 1: {
            return 'Payday Loan'
        }
        case 2: {
            return 'SME loan'
        }
    }
}
    
const checkStatus = (type: number) => {
    switch(type) {
        case 1: {
            return 'Processing'
        }
        case 2: {
            return 'Approved'
        }
        case 3: {
            return 'Declined'
        }
    }
}

const checkDraft = (type: boolean) => {
    switch(type) {
        case true: {
            return 'true'
        }
        case false: {
            return 'false'
        }
    }
}

let data = [
    {
      sheet: 'Adults',
      columns: [
        { label: 'id', value: (row: ISMELoan) => row.id },
        { label: 'User_id', value: (row: ISMELoan) => row.user_id },
        { label: 'business_name', value: (row: ISMELoan) => row.business_name },
        { label: 'business_address', value: (row: ISMELoan) => row.business_address },
        { label: 'business_up_time', value: (row: ISMELoan) => row.business_up_time },
        { label: 'RC_number', value: (row: ISMELoan) => row.RC_number },
        { label: 'TIN_number', value: (row: ISMELoan) => row.TIN_number },
        { label: 'purpose_of_loan', value: (row: ISMELoan) => row.purpose_of_loan },
        { label: 'type', value: (row: ISMELoan) => checkType(row.type) },
        { label: 'status', value: (row: ISMELoan) => checkStatus(row.status) },
        { label: 'draft', value: (row: ISMELoan) => checkDraft(row.draft as any)  },
        { label: 'created_at', value: (row: ISMELoan) => new Date(row.created_at).toUTCString()  },
        { label: 'phone', value: (row: ISMELoan) => row.phone  },
        { label: 'email', value: (row: ISMELoan) => row.email  },
      ],
      content: users,
    }, 
  ]

    const { refetch } = useQuery(['getusers', token], () => getUsers(token), {
        onSuccess: (data) => {
            console.log(data);
            setUsers(data.data);
            console.log(data);
            setLoading(false);
            setError(false);
        },
        onError: (error) => {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    });
    const statusSelector = (status: number) => {
        switch(status) {
            case 1: {
                return (
                    <div className="w-24 text-sm font-bold h-8 flex justify-center items-center bg-yellow-100 text-yellow-400">
                        Pending
                    </div>
                )
            }
            case 2: {
                return (
                    <div className="w-24 text-sm font-bold h-8 flex justify-center items-center bg-green-100 text-green-400">
                        Approved
                    </div>
                )
            }
            case 3: {
                return (
                    <div className="w-24 text-sm font-bold h-8 flex justify-center items-center bg-red-100 text-red-400">
                        Rejected
                    </div>
                )
            }
        }
    }

    const retry = async () => {
        setLoading(true);
        setError(false);
        await refetch()
    }

    const openModal = (loan: ISMELoan) => {
        setCurrentLoan(loan);
        setShowModal(true);
    }

    return (
        <div className="w-full h-full flex flex-col">
            <SMEModal open={showModal} close={() => setShowModal(false)} loan={currentLoan} />
            <div className="w-full h-24 flex justify-between items-center">

                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-gray-600">SME Loans</h2>
                    <p className="text-md text-gray-500 mt-2 font-sans">List of SME Loans on EaziCred</p>
                </div>

                <div className="flex">
                    <InputGroup className="h-12" width="sm">
                        <InputLeftElement children={<FiSearch size={20} color="grey" />} />
                        <Input className="w-72" placeholder="Search by business name or user email" fontSize="sm" onChange={e => setSearchTerm(e.target.value)} />
                    </InputGroup>
                    <button onClick={() => xlsx(data, settings)} className="w-24 ml-6 text-white bg-green-300 text-sm h-10 rounded">To Excel</button>
                    <div onClick={retry} title="Refresh" className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center transform hover:scale-125 transition-all hover:text-eazicred cursor-pointer ml-6">
                        <FiRefreshCcw size={20}  />
                   </div>
                </div>

               

            </div>
            {
                loading && (
                   
                        <div className="w-full flex flex-col items-center mt-10">
                            <Spinner color="#29ABE2" size="xl" />
                            <p className="text-eazicred text-xl mt-6">Getting SME Loans</p>
                        </div>
                    )
            }
            {
                !loading && error && (
                    <div className="w-full flex flex-col items-center mt-10">
                        <Lottie options={{ animationData: require('../../../lottiefiles/error.json'), autoplay: true, loop: true}} width={150} height={150}  />
                        <p className="text-center mt-6 font-sans text-sm">An Error Occured!</p>
                        <button className="w-24 h-10 rounded bg-eazicred text-sm text-white mt-6">Retry</button>
                        
                    </div>
                )
            }

           {
               !loading && !error && (
                <div style={{ height: '450px' }} className="w-full rounded-md border-2 border-gray-300 p-4 overflow-y-scroll">
                <table className="h-auto overflow-y-auto w-full">
                    
                       <thead>
                        <tr className="h-10  border-b-2 border-gray-200">
                                <th className="w-20 text-left">S/N</th>
                                <th className="w-40 text-left">Business Name</th>
                                <th className="w-40 text-left">User Email</th>
                                <th className="w-40 text-left">Status</th>
                                
                                <th className="w-20 text-left">Action</th>
                            </tr>
                       </thead>
                   
                        {
                            users !== null && users.filter((val) => {
                                if (searchTerm === '') {
                                    return val
                                } else if (val.email.toLowerCase().includes(searchTerm.toLowerCase()) || val.business_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val;
                                }
                            }).map((items, index) => (
                                <tr className="pt-6" key={index.toString()}>
                                    <td className="pt-6">{index+1}</td>
                                    <td className="pt-6 text-sm">{items.business_name}</td>
                                    <td className="pt-6 text-sm">{items.email}</td>
                                    <td className="pt-6 text-sm">{statusSelector(items.status)}</td>
                                    <td className="pt-6 text-sm">
                                        <button onClick={() => openModal(items)} className="w-24 text-eazicred bg-blue-100 text-sm h-8 rounded">View Details</button>
                                    </td>
                                </tr>
                            ))
                        }
                  
                        
                        

                    
                    </table>
                </div>
               )
           }
        </div>
    )
}
