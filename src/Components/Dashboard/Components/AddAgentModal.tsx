import React from 'react'
import local from '../../../utils/url';
import { IApiReturnType } from '../../../Types/ApiReturnType';
import { FiUser, FiMail } from 'react-icons/fi'
import * as yup from 'yup'
import { useFormik } from 'formik'
import UseDetails from '../../../Hooks/UseDetails';
import { useQueryClient } from 'react-query';

import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogRoot,
} from "@/components/ui/dialog"
import { InputGroup } from "@/components/ui/input-group"
import { Input, Spinner } from "@chakra-ui/react"

// validation Schema
const validationSchema = yup.object({
    firstname: yup.string().required('This field is required'),
    lastname: yup.string().required('This field is required'),
    email: yup.string().email('Invalid email').required('This field is required'),
    phone: yup.string().required('This field is required').min(11, 'minimium of 11 digits').max(11, 'minimium of 11 digit'),
})

interface IProps {
    open: boolean;
    close: Function;
}

export default function AddAgentModal({ open, close }: IProps) {
    const [loading, setLoading] = React.useState(false);
    const { token } = UseDetails();
    const queryClient = useQueryClient();


    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
        },
        validationSchema,
        onSubmit: () => { }
    })


    const createAgent = async () => {
        try {
            if (!formik.dirty) {
                alert('You have to fillin the form to continue');
                return;
            }
            if (!formik.isValid) {
                alert('You have to fillin the form properly');
                return;
            }
            setLoading(true);
            const request = await fetch(`${local}/admin/createagent`, {
                method: 'post',
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
                close();
            }
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    return (
        <DialogRoot open={open} onOpenChange={() => close()} placement={'center'}>
            <DialogContent>
                <DialogBody>
                    <p className="font-bold text-lg">Create Agent</p>

                    <div className="flex flex-col w-full h-auto justify-between mt-10">

                        <div className="flex flex-col">
                            <p className="text-sm text-black">
                                Firstname
                            </p>
                            <InputGroup startElement={<FiUser size={20} color="grey" />}>
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

                            <InputGroup startElement={<FiUser size={20} color="grey" />}>
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
                            <InputGroup startElement={<FiMail size={20} color="grey" />}>
                                <Input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </InputGroup>
                            {
                                formik.touched.email && formik.errors.email && <p className="mt-2 text-red-400 text-xs">{formik.errors.email}</p>
                            }
                        </div>

                        <div className="flex flex-col mt-3">
                            <p className="text-sm text-black">
                                Phone
                            </p>
                            <InputGroup startElement={<p>+234</p>}>
                                <Input name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </InputGroup>
                            {
                                formik.touched.phone && formik.errors.phone && <p className="mt-2 text-red-400 text-xs">{formik.errors.phone}</p>
                            }
                        </div>

                        {/* <div className="flex flex-col mt-3">
                       <p className="ttext-sm text-black">
                           Passowrd
                       </p>
                       <InputGroup>
                        <InputLeftElement children={<FiLock size={20} color="grey" />} />
                        <Input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                       </InputGroup>
                       {
                           formik.touched.password && formik.errors.password && <p className="mt-2 text-red-400 text-xs">{formik.errors.password}</p>
                       }
                   </div> */}

                    </div>


                </DialogBody>
                <DialogFooter>
                    <div className="w-full flex">
                        <button onClick={createAgent} className="bg-eazicred text-white text-sm h-10 rounded px-3">
                            {
                                loading ?
                                    <Spinner color="white" />
                                    :
                                    <span>Create Agent</span>
                            }
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}
