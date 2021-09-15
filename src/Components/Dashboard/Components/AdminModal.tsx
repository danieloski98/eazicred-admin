import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalFooter, Spinner, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import local from '../../../utils/url';
import { IApiReturnType } from '../../../Types/ApiReturnType';
import { queryClient } from '../../..';
import { IAdmin } from '../../../Types/Admin';
import * as yup from 'yup'
import { useFormik } from 'formik'
import UseDetails from '../../../Hooks/UseDetails';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const validationSchema = yup.object({
    firstname: yup.string().required('This field is required'),
    lastname: yup.string().required('This field is required'),
    email: yup.string().email('Invalid email').required('This field is required'),
    password: yup.string().required('This field is required').min(8, 'Minimium of 8 alpha-numeric characters'),
    role: yup.number().required('This field is required'),
})

interface IProps {
    admin: IAdmin;
    open: boolean;
    close: Function;
}


export default function AdminModal({ admin, open, close }: IProps) {
    const [loading, setLoading] = React.useState(false);
    const [step, setStep] = React.useState(1);
    // const [loading, setLoading] = React.useState(false);
    const { token } = UseDetails()

    const formik = useFormik({
        initialValues: {
            firstname: admin.firstname,
            lastname: admin.lastname,
            email: admin.email,
            password: admin.password,
            role: admin.role,
        },
        validationSchema,
        onSubmit: () => {}
    })

    const deleteadmin = async () => {
        try {
            setLoading(true);
            const request = await fetch(`${local}/admin/${admin.id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
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

    const updateAgent = async () => {
        try {
            if (!formik.dirty) {
                alert('You have to fillin the form to continue');
                return;
            }
            if (!formik.isValid) {
                console.log(formik.values);
                alert('You have to fillin the form properly');
                return;
            }
            setLoading(true);
            const request = await fetch(`${local}/admin/${admin.id}`, {
                method: 'put',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formik.values)
            });

            const json = await request.json() as IApiReturnType;
            setLoading(false);

            if (json.statusCode !== 200) {
                alert(json.errorMessage)
            } else {
                alert(json.successMessage);
                queryClient.invalidateQueries();
                formik.resetForm();
                setStep(1);
                close();
            }
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    return (
        <Modal onClose={() => { close(); formik.resetForm(); setStep(1) }} isOpen={open} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton onClick={() => close()} />
                {
                    step === 1 ?
                    <ModalBody>
                    <p className="font-bold text-lg">Details admin</p>
                    
                    <div className="flex w-full h-10 justify-between mt-10">

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Firstname
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {admin.firstname}
                        </p>
                       </div>

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Lastname
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {admin.lastname}
                        </p>
                       </div>

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Email
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {admin.email}
                        </p>
                       </div>

                    </div>

                    <div className="flex w-full h-10 justify-between mt-8 mb-6">
{/* 
                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Phone
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {admin.phone}
                        </p>
                       </div> */}

                       <div className="flex flex-col">
                           <p className="text-md text-eazicred font-semibold">
                               Role
                           </p>
                           <p className="text-sm font-medium text-gray-500">
                            {admin.role === 1 ? 'Super Admin': 'Admin'}
                        </p>
                       </div>

                    </div>


                </ModalBody>
                : 
                <ModalBody>
                <p className="font-bold text-lg">Create Agent</p>
                
                <div className="flex flex-col w-full h-auto justify-between mt-10">

                   <div className="flex flex-col">
                       <p className="text-sm text-black">
                           Firstname
                       </p>
                       <InputGroup>
                        <InputLeftElement children={<FiUser size={20} color="grey" />} />
                        <Input name="firstname" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                       </InputGroup>
                       {
                           formik.touched.firstname && formik.errors.firstname && <p className="mt-2 text-red-400 text-xs">{formik.errors.firstname}</p>
                       }
                   </div>

                   <div className="flex flex-col mt-3">
                       <p className="text-sm text-black">
                           Lastname
                       </p>
                      
                       <InputGroup>
                        <InputLeftElement children={<FiUser size={20} color="grey" />} />
                        <Input name="lastname" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                       </InputGroup>
                       {
                           formik.touched.lastname && formik.errors.lastname && <p className="mt-2 text-red-400 text-xs">{formik.errors.lastname}</p>
                       }
                    
                   </div>

                   <div className="flex flex-col mt-3">
                       <p className="text-sm text-black">
                           Email
                       </p>
                       <InputGroup>
                        <InputLeftElement children={<FiMail size={20} color="grey" />} />
                        <Input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                       </InputGroup>
                       {
                           formik.touched.email && formik.errors.email && <p className="mt-2 text-red-400 text-xs">{formik.errors.email}</p>
                       }
                   </div>

                   <div className="flex flex-col mt-3">
                       <p className="text-sm text-black">
                           Password
                       </p>
                       <InputGroup>
                        <InputLeftElement children={<FiLock size={20} color="grey" />} />
                        <Input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                       </InputGroup>
                       {
                           formik.touched.password && formik.errors.password && <p className="mt-2 text-red-400 text-xs">{formik.errors.password}</p>
                       }
                   </div>

                   <div className="flex flex-col mt-3">
                       <p className="ttext-sm text-black">
                           Role
                       </p>

                        <Select type="role" name="role" value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur} >
                            <option value={1}>Super Admin</option>
                            <option value={2}>Admin</option>
                        </Select>
                 
                       {
                           formik.touched.role && formik.errors.role && <p className="mt-2 text-red-400 text-xs">{formik.errors.role}</p>
                       }
                   </div>

                </div>


            </ModalBody>
                }
                <ModalFooter>
                    {
                        step === 1 ?
                        <div className="w-full flex">
                        <button onClick={deleteadmin} className="bg-red-400 text-white text-sm h-10 rounded px-3">
                            {
                                loading ?
                                <Spinner color="white" />
                                :
                                <span>Delete admin</span>
                            }
                        </button>
                        <button onClick={() => { formik.setValues(admin); setStep(2) }} className="bg-blue-400 text-white text-sm h-10 rounded px-3 ml-4">
                            <span>update admin</span>
                        </button>
                    </div>
                    :
                    <div className="w-full flex">
                        <button onClick={updateAgent} className="bg-eazicred text-white text-sm h-10 rounded px-3">
                            {
                                loading ?
                                <Spinner color="white" />
                                :
                                <span>Update</span>
                            }
                        </button>
                        <button onClick={() => { formik.resetForm(); setStep(1)} } className="bg-red-400 text-white text-sm h-10 rounded px-3 ml-4">
                            Cancel
                        </button>
                    </div>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
