import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalFooter, Spinner } from '@chakra-ui/react'
import local from '../../../utils/url';
import { IApiReturnType } from '../../../Types/ApiReturnType';
import { queryClient } from '../../..';
import { IUser } from '../../../Types/User';

interface IProps {
    user: IUser;
    open: boolean;
    close: Function;
}


export default function UserModal({ user, open, close }: IProps) {
    return (
        <Modal onClose={() => close()} isOpen={open} size="sm" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton onClick={() => close()} />
                <ModalBody>
                    <p className="font-bold text-lg">Details of user</p>
                    
                    <div className="flex flex-col w-full h-auto justify-between mt-10">

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Firstname
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {user.firstname}
                        </p>
                       </div>

                       <div className="flex flex-col mt-6">
                           <p className="text-md text-eazicred font-semibold">
                               Lastname
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {user.lastname}
                        </p>
                       </div>

                       <div className="flex flex-col mt-6">
                           <p className="text-md text-eazicred font-semibold">
                               Email
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {user.email}
                        </p>
                       </div>

                    </div>

                    <div className="flex flex-col w-full h-auto justify-between mt-6 mb-6">

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Phone
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {user.phone}
                        </p>
                       </div>

                       <div className="flex flex-col mt-6">
                           <p className="text-md text-eazicred font-semibold">
                               Referral Code
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {user.id}
                        </p>
                       </div>

                    </div>


                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
