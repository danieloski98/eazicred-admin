import React from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Formik } from "formik";
import * as yup from "yup";
import local from "../../utils/url";
import { IApiReturnType } from "../../Types/ApiReturnType";
import { useRecoilState } from "recoil";
import { tokenAtom, UserAtom } from "../../State/UserState";
import { useHistory } from 'react-router-dom'

const validationSchema = yup.object({
  email: yup.string().email("Invalid Email").required("This field is required"),
  password: yup.string().required("This field is required"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [, setAdmin] = useRecoilState(UserAtom);
  const [, setToken] = useRecoilState(tokenAtom);
  const history = useHistory()

  const submit = async (isValid: boolean, dirty: boolean, values: any) => {
      if (!dirty) {
          alert('Please fillin the form to continue');
          return;
      }
      if (!isValid) {
          alert('Please fillin the form properly');
          return;
      }
      setLoading(true);
      // make request
      const res = await fetch(`${local}/admin/login`, {
          method: 'post',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(values),
      });

      const json = await res.json() as IApiReturnType;

      if (json.statusCode === 200) {
        localStorage.setItem('eazi-user', JSON.stringify(json.data.amdin));
        localStorage.setItem('eazi-token', json.data.token);

          setAdmin(json.data.amdin);
          setToken(json.data.token);
          setLoading(false);
          alert(json.successMessage);
          console.log(json);
          history.push('/dashboard/users');
         
      }

      if (json.statusCode !== 200) {
          setLoading(false);
          alert(json.errorMessage);
      }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: "", password: "" }}
      onSubmit={() => {}}
      children={({
        values,
        handleBlur,
        handleChange,
        touched,
        isValid,
        errors,
        dirty,
      }) => (
        <div className="w-72 h-auto flex flex-col">
          <div>
            <img src="/assets/eazicred-logo.svg" alt="" className="w-40 h-10" />
          </div>

          <div className="mt-6">
            <p className="font-bold text-2xl text-gray-600">Admin Login</p>
            <p className="mt-2 font-sans text-sm text-gray-500">
              Enter your credentials to contunue
            </p>
          </div>

          <div className="w-72 mt-6">
            <p className="mb-2 font-sans text-sm text-gray-500">
              Email Address
            </p>
            <Input
              type="text"
              name="email"
              className="w-40 h-12 rounded border-2 border-gray-500 text-sm"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fontSize="sm"
            />
            {touched.email && errors.email && <p className="mt-2 text-red-400 text-xs">{errors.email}</p>}
          </div>

          <div className="w-72 mt-6">
            <p className="mb-2 font-sans text-sm text-gray-500">Password</p>
            <InputGroup>
              <InputRightElement
                children={
                  showPassword ? (
                    <FiEye
                      color="grey"
                      size={20}
                      className="cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FiEyeOff
                      color="grey"
                      size={20}
                      className="cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )
                }
              />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-40 h-12 rounded border-2 border-gray-500"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                fontSize="sm"
                />
            </InputGroup>
            {touched.password && errors.password && <p className="mt-2 text-red-400 text-xs">{errors.password}</p>}
          </div>

          <button 
          onClick={() => submit(isValid, dirty, values)}
          className="mt-8 bg-eazicred text-white text-md font-sans h-12 rounded w-72">
            {!loading && <span>Login</span>}
            {loading && <Spinner color="white" size="md" />}
          </button>
        </div>
      )}
    />
  );
}
