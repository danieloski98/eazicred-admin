import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalFooter, Spinner, Select } from '@chakra-ui/react'
import local from '../../../utils/url';
import { IApiReturnType } from '../../../Types/ApiReturnType';
import { queryClient } from '../../..';
import { ISMELoan } from '../../../Types/SMEloan';
import UseDetails from '../../../Hooks/UseDetails';

interface IProps {
    loan: ISMELoan;
    open: boolean;
    close: Function;
}

export default function SMEModal({ loan, open, close }: IProps) {
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
            
            const request = await fetch(`${local}/admin/status/sme/${loan.id}/${num}`, {
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

    return (
        <Modal onClose={() => close()} isOpen={open} size="2xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton onClick={() => close()} />
                <ModalBody>
                    <p className="font-bold text-lg">Details loan</p>
                    
                    <div className="flex w-full h-10 justify-between mt-10 text-left">

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Business Name
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {loan.business_name}
                        </p>
                       </div>

                       <div className="flex flex-col ml-6">
                           <p className="text-md text-eazicred font-semibold">
                               Business Address
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {loan.business_address}
                        </p>
                       </div>

                       <div className="flex flex-col ml-6">
                           <p className="text-md text-eazicred font-semibold">
                               RC Number
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {loan.RC_number}
                        </p>
                       </div>

                    </div>

                    <div className="flex w-full justify-between h-10 mt-8 mb-6">

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               TIN number
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {loan.TIN_number}
                        </p>
                       </div>

                       <div className="flex flex-col ml-6">
                           <p className="text-md text-eazicred font-semibold">
                               Business Up Time
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {loan.business_up_time}
                        </p>
                       </div>

                       <div className="flex flex-col ml-6">
                           <p className="text-md text-eazicred font-semibold">
                               Loan Status
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {loan.status}
                        </p>
                       </div>

                    </div>

                    <div className="flex w-full h-10 justify-between mt-8 mb-6">

                        <div className="flex flex-col">
                            <p className="text-md text-eazicred font-semibold">
                                Purpose of Loan
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.purpose_of_loan}
                        </p>
                        </div>

                        {/* <div className="flex flex-col ml-6">
                            <p className="text-md text-eazicred font-semibold">
                               User Email
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.user.email}
                        </p>
                        </div>

                        <div className="flex flex-col ml-6">
                            <p className="text-md text-eazicred font-semibold">
                                User Phone Number
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                            {loan.user.phone}
                        </p>
                        </div> */}

                    </div>


                </ModalBody>
                <ModalFooter>
                    <div className="w-full flex items-end">
                        <div className="w-32 flex flex-col">
                            <label>Status</label>
                            <Select className="text-xs" fontSize="xs" disabled={loading} value={status} style={{ color: color(status) }} onChange={(e) => changeStatus(parseInt(e.target.value))}>
                                <option value={1} disabled className="text-gold-400">Processing</option>
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
