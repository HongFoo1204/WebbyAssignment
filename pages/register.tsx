//type
import { NextPage } from "next/types";

//library
import React, { ReactElement } from "react";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

//components
import { useAuth } from "../components/AuthContext";

const RegisterPage: NextPage = (): ReactElement => {
  const { register, errorMessage } = useAuth();

  const initialValues = {
    user_fullname: "",
    user_email: "",
    user_mobile: "",
    password: "",
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <title>Register</title>
      <div className="flex flex-col justify-center py-52">
        <h1 className="w-1/3 pb-5 text-5xl font-bold text-blue-400 self-center">
          Register
        </h1>
        <div className="w-1/3 self-center">
          <Formik
            initialValues={initialValues}
            validationSchema={yup.object({
              user_fullname: yup
                .string()
                .max(50, "Must be 50 characters or less")
                .min(2, "Must be 2 characters or more")
                .required("Required"),
              user_email: yup
                .string()
                .email("Invalid email address")
                .required("Required"),
              user_mobile: yup
                .number()
                .typeError("Please enter valid phone number (only digit)")
                .required("Required"),
              password: yup
                .string()
                .max(20, "Must be 20 characters or less")
                .min(8, "Must be 8 characters or more")
                .required("Required"),
              confirm_password: yup.string().when("password", {
                is: (val: any) => (val && val.length > 0 ? true : false),
                then: yup
                  .string()
                  .oneOf(
                    [yup.ref("password")],
                    "Both password need to be the same"
                  )
                  .required("Required"),
              }),
            })}
            onSubmit={async (values) => {
              await register(values);
            }}
          >
            <Form>
              <div className="my-3">
                <label
                  className="block text-xs font-bold uppercase"
                  htmlFor="fullname"
                >
                  Your Full Name
                </label>
                <Field
                  aria-label="user_fullname"
                  className="w-full h-12 mt-1 text-2xl font-normal leading-tight bg-transparent border-b-2 appearance-none text-blue-500 focus:outline-none focus:shadow-outline"
                  type="text"
                  name="user_fullname"
                  placeholder="Full Name"
                />
                <div className="text-xs italic text-blue-500">
                  <ErrorMessage name="user_fullname" />
                </div>
              </div>
              <div className="my-3">
                <label
                  className="block text-xs font-bold uppercase"
                  htmlFor="email"
                >
                  Your Email
                </label>
                <Field
                  aria-label="user_email"
                  className="w-full h-12 mt-1 text-2xl font-normal leading-tight bg-transparent border-b-2 appearance-none text-blue-500 focus:outline-none focus:shadow-outline"
                  type="email"
                  name="user_email"
                  placeholder="Email"
                />
                <div className="text-xs italic text-blue-500">
                  <ErrorMessage name="user_email" />
                </div>
              </div>
              <div className="my-3">
                <label
                  className="block text-xs font-bold uppercase"
                  htmlFor="phone"
                >
                  Your Mobile
                </label>
                <Field
                  aria-label="user_mobile"
                  className="w-full h-12 mt-1 text-2xl font-normal leading-tight bg-transparent border-b-2 appearance-none text-blue-500 focus:outline-none focus:shadow-outline"
                  type="text"
                  name="user_mobile"
                  placeholder="Phone Number (only digit)"
                />
                <div className="text-xs italic text-blue-500">
                  <ErrorMessage name="user_mobile" />
                </div>
              </div>
              <div className="my-3">
                <label
                  className="block text-xs font-bold uppercase"
                  htmlFor="password"
                >
                  Your Password
                </label>
                <Field
                  aria-label="password"
                  className="w-full h-12 mt-1 text-2xl font-normal leading-tight bg-transparent border-b-2 appearance-none text-blue-500 focus:outline-none focus:shadow-outline"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <div className="text-xs italic text-blue-500">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="my-3">
                <label
                  className="block text-xs font-bold uppercase"
                  htmlFor="confirm_password"
                >
                  Confirm Password
                </label>
                <Field
                  aria-label="confirm_password"
                  className="w-full h-12 mt-1 text-2xl font-normal leading-tight bg-transparent border-b-2 appearance-none text-blue-500 focus:outline-none focus:shadow-outline"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                />
                <div className="text-xs italic text-blue-500">
                  <ErrorMessage name="confirm_password" />
                </div>
              </div>
              <div className="flex justify-between">
                {errorMessage && (
                  <div className="mt-6 text-xs text-red-400">
                    {errorMessage}
                  </div>
                )}
                <Link href="/">
                  <a
                    className="mt-6 ml-auto text-xs font-bold text-right uppercase hover:underline text-blue-500"
                    onClick={() => {}}
                    type="button"
                  >
                    Login Here!
                  </a>
                </Link>
              </div>
              <button
                className="w-full px-3 mt-6 text-lg font-bold leading-tight text-center text-white rounded-full h-14 bg-gray-500 focus:outline-none hover:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
