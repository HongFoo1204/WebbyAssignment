//library
import React, { ReactElement } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { NextPage } from "next";

//components
import { useAuth } from "../components/AuthContext";

const LoginPage: NextPage = (): ReactElement => {
  const { login, errorMessage } = useAuth();

  const initialValues = {
    user_mobile: "",
    password: "",
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <title>Login</title>
      <div className="flex flex-col justify-center py-52">
        <h1 className="w-1/3 pb-5 text-5xl font-bold text-blue-400 self-center">
          Login
        </h1>
        <div className="w-1/3 self-center">
          <Formik
            initialValues={initialValues}
            validationSchema={yup.object({
              user_mobile: yup
                .number()
                .typeError("Please enter valid phone number (only digit)")
                .required("Required"),
              password: yup
                .string()
                .max(20, "Must be 20 characters or less")
                .min(8, "Must be 8 characters or more")
                .required("Required"),
            })}
            onSubmit={(values) => {
              login(values);
            }}
          >
            <Form>
              <div>
                <label
                  className="block text-xs font-bold uppercase"
                  htmlFor="username"
                >
                  Your Mobile
                </label>
                <Field
                  aria-label="email"
                  className="w-full h-12 mt-1 text-2xl font-normal leading-tight bg-transparent border-b-2 appearance-none text-blue-500 focus:outline-none focus:shadow-outline"
                  type="text"
                  name="user_mobile"
                  placeholder="Phone Number (only digit)"
                />
                <div className="text-xs italic text-blue-500">
                  <ErrorMessage name="user_mobile" />
                </div>
              </div>
              <div>
                <label
                  className="block mt-6 text-xs font-bold uppercase"
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
              <div className="flex justify-between">
                {errorMessage && (
                  <div className="mt-6 text-xs text-red-400">
                    {errorMessage}
                  </div>
                )}
                <Link href="/register">
                  <a
                    className="mt-6 ml-auto text-xs font-bold text-right uppercase hover:underline text-blue-500"
                    onClick={() => {}}
                    type="button"
                  >
                    Register Here!
                  </a>
                </Link>
              </div>
              <button
                className="w-full px-3 mt-6 text-lg font-bold leading-tight text-center text-white rounded-full h-14 bg-gray-500 focus:outline-none hover:shadow-outline"
                type="submit"
              >
                Sign in
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
