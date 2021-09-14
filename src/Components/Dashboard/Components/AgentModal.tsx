import React from 'react'
import { IAgent } from '../../../Types/Agents'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalFooter, Spinner } from '@chakra-ui/react'
import local from '../../../utils/url';
import { IApiReturnType } from '../../../Types/ApiReturnType';
import { queryClient } from '../../..';

interface IProps {
    agent: IAgent;
    open: boolean;
    close: Function;
}

export default function AgentModal({ agent, open, close }: IProps) {
    const [loading, setLoading] = React.useState(false);

    const deleteAgent = async () => {
        try {
            setLoading(true);
            const request = await fetch(`${local}/admin/agent/${agent.id}`, {
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
    return (
        <Modal onClose={() => close()} isOpen={open} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton onClick={() => close()} />
                <ModalBody>
                    <p className="font-bold text-lg">Details Agent</p>
                    
                    <div className="flex w-full h-10 justify-between mt-10">

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Firstname
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {agent.firstname}
                        </p>
                       </div>

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Lastname
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {agent.lastname}
                        </p>
                       </div>

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Email
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {agent.email}
                        </p>
                       </div>

                    </div>

                    <div className="flex w-full h-10 justify-between mt-8 mb-6">

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Phone
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {agent.phone}
                        </p>
                       </div>

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Referral Code
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {agent.id}
                        </p>
                       </div>

                    </div>


                </ModalBody>
                <ModalFooter>
                    <div className="w-full flex">
                        <button onClick={deleteAgent} className="bg-red-400 text-white text-sm h-10 rounded px-3">
                            {
                                loading ?
                                <Spinner color="white" />
                                :
                                <span>Delete Agent</span>
                            }
                        </button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
