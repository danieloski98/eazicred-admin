import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalFooter, Spinner, Select, Divider } from '@chakra-ui/react'
import local from '../../../utils/url';
import { IApiReturnType } from '../../../Types/ApiReturnType';
import { queryClient } from '../../..';
import { ISMELoan } from '../../../Types/SMEloan';
import UseDetails from '../../../Hooks/UseDetails';
import { IPaydayLoan } from '../../../Types/PayDaylaon';

interface IProps {
    loan: IPaydayLoan;
    open: boolean;
    close: Function;
}

export default function PaydaylaonModal({ loan, open, close }: IProps) {
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState(parseInt(loan.status as any))
    const { token } = UseDetails();


    const deleteloan = async () => {
        try {
            setLoading(true);
            const request = await fetch(`${local}/admin/loan/${loan.id}`, {
                method: 'delete',
            });

            const json = await request.json() as IApiReturnType;
            setLoading(false);

            if (json.statusCode !== 200) {
                alert(json.errorMessage)
            } else {
                alert(json.successMessage);
                queryClient.invalidateQueries();
                close();
            }
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    const color = (num: number) => {
        switch(num) {
            case 1: {
                return 'gold'
            }
            case 2: {
                return 'green'
            }
            case 3: {
                return 'red'
            }
        }
    }

    const changeStatus = async(num: number) => {
        try {
            setLoading(true)
            
            const request = await fetch(`${local}/admin/status/paydayloan/${loan.id}/${num}`, {
                method: 'put',
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            const json = await request.json() as IApiReturnType;

            setLoading(false);
            if (json.statusCode !== 200) {
                alert(json.errorMessage);
            } else {
                setStatus(num);
                alert(json.successMessage);
            }
        } catch (error) {
            
        }
    }

    const statusCheck = (status: number) => {
        switch(status) {
            case 1: {
                return 'Pending';
            }
            case 2: {
                return 'Approved';
            }
            case 3: {
                return 'Declined'
            }
        }
    }


    return (
        <Modal onClose={() => close()} isOpen={open} size="lg" isCentered scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton onClick={() => close()} />
            <ModalBody>
                <p className="font-bold text-lg">Details loan</p>

                <p className="text-md font-semibold mt-8">Personal Information</p>
                
                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                   <div className="flex flex-col text-left flex-1">
                       <p className="text-md text-eazicred font-semibold">
                           Firstname
                       </p>
                       <p className="text-sm font-medium text-gray-500">
                        {/* {loan.user.firstname} */}
                    </p>
                   </div>

                   <div className="flex flex-col text-left flex-1">
                       <p className="text-md text-eazicred font-semibold">
                          Lastname
                       </p>
                       <p className="text-sm font-medium text-gray-500">
                        {/* {loan.user.lastname} */}
                    </p>
                   </div>


                </div>


                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                   <div className="flex flex-col text-left flex-1">
                       <p className="text-md text-eazicred font-semibold">
                           DOB
                       </p>
                       <p className="text-sm font-medium text-gray-500">
                        {loan.DOB}
                    </p>
                   </div>

                   <div className="flex flex-col text-left flex-1">
                       <p className="text-md text-eazicred font-semibold">
                           BVN
                       </p>
                       <p className="text-sm font-medium text-gray-500">
                        {loan.BVN}
                    </p>
                   </div>

                </div>


                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                    <div className="flex flex-col text-left flex-1">
                        <p className="text-md text-eazicred font-semibold">
                            Means of ID
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                        {loan.Means_of_ID}
                    </p>
                    </div>

                    <div className="flex flex-col text-left flex-1">
                        <p className="text-md text-eazicred font-semibold">
                            ID number
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                        {loan.ID_number}
                    </p>
                    </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Date Issued
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.date_issued}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Expiry Date
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.expiry_date}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                phone
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {/* {loan.user.phone} */}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Alternate Number
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.alt_number}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Marital Status
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.marital_status}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Next of Kin Surname
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.next_of_kin_surname}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Next of Kin Firstname
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.next_of_kin_firstname}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Next of Kin Relationship
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.next_of_kin_relationship}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Next of Kin Phone
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.next_of_kin_phone}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Next of Kin Address
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.next_of_kin_address}
                        </p>
                        </div>

                </div>

                <Divider colorScheme="teal" className="mt-6" />

                <p className="text-md font-semibold mt-8">Location Information</p>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                LGA of residence
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.LGA_of_residence}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                State
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.state}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Landmark
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.landmark}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Home Address
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.home_address}
                        </p>
                        </div>

                </div>

                <Divider colorScheme="teal" className="mt-6" />

                <p className="text-md font-semibold mt-8">Employment Information</p>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Employment Status
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.employment_status}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Current Employer
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.current_employer}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Current Employer Address
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.current_employer_address}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Current Employer Landmark
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.current_employer_landmark}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Current Employer LGA
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.current_employer_LGA}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Current Employer State
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.current_employer_state}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Current Employer Phone
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.current_employer_office_number}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Staff ID
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.staff_id}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Department
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.department}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Job Title
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.job_title}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Date Employed
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.date_employed}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Previous Employer
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.previous_employer}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Previous employer Address
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.previous_employer_address}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                job in last 5 years
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.jobs_in_past_5_years}
                        </p>
                        </div>

                </div>

                <Divider colorScheme="teal" className="mt-6" />

                <p className="text-md font-semibold mt-8">Loan Details</p>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Next Payday
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.current_paydate}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Existing Loan
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.existing_loan}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Existing Loan Type
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.existing_loan_type}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                               Amount Applied for
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.loan_amount}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Loan Tenure
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.loan_tenure}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Account Numnber
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.account_number}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Account Name
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.account_name}
                        </p>
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Bank
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.bank_name}
                        </p>
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Hear of us
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.hear_about_us}
                        </p>
                        </div>

                </div>

                <Divider colorScheme="teal" className="mt-6" />

                <p className="text-md font-semibold mt-8">Files</p>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Passport Photograph
                            </p>
                            <a href={loan.passport} rel="noreferrer" download className="w-32 h-10 rounded bg-eazicred text-white flex justify-center items-center">Download</a> 
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Givernment ID
                            </p>
                            <a href={loan.government_ID} rel="noreferrer" download className="w-32 h-10 rounded bg-eazicred text-white flex justify-center items-center">Download</a> 
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                6 Month Bank Statement
                            </p>
                            <a href={loan.HR_letter_of_confirmation} rel="noreferrer" download className="w-32 h-10 rounded bg-eazicred text-white flex justify-center items-center">Download</a> 
                        </div>

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Utility Bill
                            </p>
                            <a href={loan.utility_bill} rel="noreferrer" download className="w-32 h-10 rounded bg-eazicred text-white flex justify-center items-center">Download</a> 
                        </div>

                </div>

                <div className="flex w-full justify-between h-auto mt-4 mb-6">

                        <div className="flex flex-col text-left flex-1">
                            <p className="text-md text-eazicred font-semibold">
                                Company ID
                            </p>
                            <a href={loan.company_id} rel="noreferrer" download className="w-32 h-10 rounded bg-eazicred text-white flex justify-center items-center">Download</a>                        
                        </div>

                </div>


            </ModalBody>
            <ModalFooter>
                <div className="w-full flex items-end">
                    <div className="w-32 flex flex-col">
                        <label>Status</label>
                        <Select className="text-xs" fontSize="xs" disabled={loading} value={status} style={{ color: color(status) }} onChange={(e) => changeStatus(parseInt(e.target.value))}>
                            <option value={1} className="text-gold-400">Processing</option>
                            <option value={2}>Approved</option>
                            <option value={3}>Declined</option>
                        </Select>
                    </div>
                    {
                        loading && (
                            <div className="ml-6 bg-red">
                                <Spinner size="lg" color="blue" />
                            </div>
                        )
                    }
                </div>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}
