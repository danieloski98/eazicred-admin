import React from 'react'
import local from '../../../utils/url'
import { IApiReturnType } from '../../../Types/ApiReturnType'
import { useQuery } from 'react-query'
import UseDetails from '../../../Hooks/UseDetails'
import Lottie from 'react-lottie'
import { IPaydayLoan } from '../../../Types/PayDaylaon'
import { FiSearch, FiRefreshCcw, } from 'react-icons/fi'
import PaydaylaonModal from '../Components/PaydaylaonModal'
import xlsx from 'json-as-xlsx';

import { InputGroup } from "@/components/ui/input-group"
import { Input, Spinner, Table } from '@chakra-ui/react'


const getUsers = async (token: string) => {
    console.log(token);
    const res = await fetch(`${local}/admin/paydayloans`, {
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

export default function PaydayLoan() {
    const { token } = UseDetails();
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([] as Array<IPaydayLoan>);
    const [error, setError] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentloan, setCurrentLoan] = React.useState({} as IPaydayLoan);
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

    const settings = {
        fileName: 'Payday Loans', // Name of the spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
    }

    let data = [
        {
            sheet: 'Payday Loan',
            columns: [
                { label: 'firstname', value: (row: IPaydayLoan) => row.firstname },
                { label: 'lastname', value: (row: IPaydayLoan) => row.lastname },
                { label: 'phone', value: (row: IPaydayLoan) => row.phone },
                { label: 'DOB', value: (row: IPaydayLoan) => new Date(row.DOB).toDateString() },
                { label: 'BVN', value: (row: IPaydayLoan) => row.BVN },
                { label: 'means_of_ID', value: (row: IPaydayLoan) => row.Means_of_ID },
                { label: 'ID number', value: (row: IPaydayLoan) => row.ID_number },
                { label: 'Date Issued', value: (row: IPaydayLoan) => new Date(row.date_issued).toDateString() },
                { label: 'Expiry Date', value: (row: IPaydayLoan) => new Date(row.expiry_date).toDateString() },
                { label: 'Alternate Number', value: (row: IPaydayLoan) => row.alt_number },
                { label: 'Marital Status', value: (row: IPaydayLoan) => marital(row.marital_status) },
                { label: 'Next of Kin Surname', value: (row: IPaydayLoan) => row.next_of_kin_surname },
                { label: 'Next of Kin Firstname', value: (row: IPaydayLoan) => row.next_of_kin_firstname },
                //{ label: 'Next of Relationship', value: (row: IPaydayLoan) => row.next_of_kin_relationship || '' },
                { label: 'Next of Kin Phone', value: (row: IPaydayLoan) => row.next_of_kin_phone },
                { label: 'Next of Kin Address', value: (row: IPaydayLoan) => row.next_of_kin_address },
                { label: 'LGA of residence', value: (row: IPaydayLoan) => row.LGA_of_residence },
                { label: 'State', value: (row: IPaydayLoan) => row.state },
                { label: 'Landmark', value: (row: IPaydayLoan) => row.landmark },
                { label: 'Home Addresss', value: (row: IPaydayLoan) => row.home_address },
                { label: 'Employment Status', value: (row: IPaydayLoan) => employmemntStatus(row.employment_status) },
                { label: 'Current Employer', value: (row: IPaydayLoan) => row.current_employer },
                { label: 'Current Employer Address', value: (row: IPaydayLoan) => row.current_employer_address },
                { label: 'Current Employment Lnadmark', value: (row: IPaydayLoan) => row.current_employer_landmark },
                { label: 'Current Employer LGA', value: (row: IPaydayLoan) => row.current_employer_LGA },
                { label: 'Current Employer State', value: (row: IPaydayLoan) => row.current_employer_state },
                //{ label: 'Current Office Phone', value: (row: IPaydayLoan) => row.current_employer_office_number },
                { label: 'Staff ID Number', value: (row: IPaydayLoan) => row.staff_id },
                { label: 'Department', value: (row: IPaydayLoan) => row.department },
                { label: 'Job Title', value: (row: IPaydayLoan) => row.job_title },
                //{ label: 'Date Employed', value: (row: IPaydayLoan) => new Date(row.date_employed).toDateString() },
                //{ label: 'Previous Employer', value: (row: IPaydayLoan) => row.previous_employer },
                //{ label: 'Previous Employer Address', value: (row: IPaydayLoan) => row.previous_employer_address },
                //{ label: 'Job in 5 Years', value: (row: IPaydayLoan) => row.jobs_in_past_5_years },
                { label: 'Next Paydate', value: (row: IPaydayLoan) => new Date(row.current_paydate).toDateString() },
                { label: 'Existing Loan', value: (row: IPaydayLoan) => row.existing_loan ? 'yes' : 'no' },
                { label: 'Existing Loan Type', value: (row: IPaydayLoan) => loantype(row.existing_loan_type) },
                { label: 'Amount', value: (row: IPaydayLoan) => row.loan_amount },
                { label: 'Loan Tenure', value: (row: IPaydayLoan) => row.loan_tenure },
                { label: 'Account Number', value: (row: IPaydayLoan) => row.account_number },
                { label: 'Account Name', value: (row: IPaydayLoan) => row.account_name },
                { label: 'Bank', value: (row: IPaydayLoan) => row.bank_name },
                { label: 'Hear about us', value: (row: IPaydayLoan) => row.hear_about_us },
                { label: 'passport', value: (row: IPaydayLoan) => row.passport },
                { label: 'Government ID', value: (row: IPaydayLoan) => row.government_ID },
                { label: '6 months bank statement', value: (row: IPaydayLoan) => row.HR_letter_of_confirmation },
                { label: 'Utility Bill', value: (row: IPaydayLoan) => row.utility_bill },
                { label: 'Company ID', value: (row: IPaydayLoan) => row.company_id },
            ],
            content: users,
        },
    ]

    const statusSelector = (status: number) => {
        switch (status) {
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

    const employmemntStatus = (num: number) => {
        switch (num) {
            case 1: {
                return 'FullTime';
            }
            case 2: {
                return 'PartTime'
            }
            case 3: {
                return 'Retired'
            }
            case 4: {
                return 'SelfEmployed'
            }
            case 5: {
                return 'TemporaryContract'
            }
            case 6: {
                return 'OutSourcedContract'
            }
        }
    }

    const marital = (num: number) => {
        switch (num) {
            case 1: {
                return 'SINGLE'
            }
            case 2: {
                return 'MARRIED'
            }
            case 3: {
                return 'DIVORCED'
            }
            case 4: {
                return 'SEPERATED'
            }
            case 5: {
                return 'WIDOWED'
            }
        }
    }

    const loantype = (num: number) => {
        switch (num) {
            case 1: {
                return 'MORTGAGE'
            }
            case 2: {
                return 'OVERDRAFT'
            }
            case 3: {
                return 'CARLOAN'
            }
            case 4: {
                return 'BUSINESSLOAN'
            }
            case 5: {
                return 'CREDITCARDLOAN'
            }
            case 6: {
                return 'PERSONALLOAN'
            }
        }
    }

    return (
        <div className="w-full h-full flex flex-col">
            <PaydaylaonModal close={() => setShowModal(false)} open={showModal} loan={currentloan} />
            <div className="w-full h-24 flex justify-between items-center">

                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-gray-600">Payday Loans</h2>
                    <p className="text-md text-gray-500 mt-2 font-sans">List of Payday Loans on EaziCred</p>
                </div>

                <div className="flex">
                    <InputGroup className="h-12" width="sm" startElement={<FiSearch size={20} color="grey" />}>
                        <Input className="w-72" placeholder="Search by email or firstname" fontSize="sm" onChange={e => setSearchTerm(e.target.value)} />
                    </InputGroup>
                    <button onClick={() => xlsx(data as any, settings)} className="w-24 ml-6 text-white bg-green-300 text-sm h-10 rounded">To Excel</button>
                    <div onClick={retry} title="Refresh" className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center transform hover:scale-125 transition-all hover:text-eazicred cursor-pointer ml-6">
                        <FiRefreshCcw size={20} />
                    </div>
                </div>



            </div>
            {
                loading && (

                    <div className="w-full flex flex-col items-center mt-10">
                        {<Spinner color="#29ABE2" size="xl" />}
                        <p className="text-eazicred text-xl mt-6">Getting Payday Loans</p>
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
                    <div style={{ height: '450px' }} className="w-full rounded-md border-2 border-gray-300 p-4 overflow-y-scroll overflow-x-hidden">
                        <Table.Root className="h-auto overflow-y-auto w-full overflow-x-hidden">

                            <Table.Header>
                                <Table.Row className="h-10  border-b-2 border-gray-200">
                                    <Table.ColumnHeader className="w-20 text-left">S/N</Table.ColumnHeader>
                                    <Table.ColumnHeader className="w-40 text-left">Name</Table.ColumnHeader>
                                    {/* <Td className="w-40 text-left">User Email</Td> */}
                                    <Table.ColumnHeader className="w-40 text-left">Agent Email</Table.ColumnHeader>
                                    <Table.ColumnHeader className="w-40 text-left">Status</Table.ColumnHeader>
                                    <Table.ColumnHeader className="w-20 text-left">Action</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>

                            {
                                users.filter((val) => {
                                    if (searchTerm === '') {
                                        return val
                                    } else if (val.email.toLowerCase().includes(searchTerm.toLowerCase()) || val.LGA_of_residence.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val;
                                    }
                                }).map((items, index) => (
                                    <Table.Row className="pt-6" key={index.toString()}>
                                        <Table.Cell className="pt-6">{index + 1}</Table.Cell>
                                        <Table.Cell className="pt-6 text-sm">{items.firstname || ''} {items.lastname || ''}</Table.Cell>
                                        {/* <Td className="pt-6 text-sm">{items.email}</Td> */}
                                        <Table.Cell className="pt-6 text-sm">{items.agent?.email}</Table.Cell>
                                        <Table.Cell className="pt-6 text-sm">{statusSelector(items.status)}</Table.Cell>
                                        <Table.Cell className="pt-6 text-sm">
                                            <button onClick={() => { setCurrentLoan(items); setShowModal(true); console.log(items) }} className="w-24 text-eazicred bg-blue-100 text-sm h-8 rounded">View Details</button>
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
