import React, {  useEffect } from "react";

import {  toast } from "react-toastify";
import { Backdrop, } from "@mui/material";

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { NextPage } from "next";

import { IForm } from "@/modals";
import { FieldValues, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import LoaderAnimate from "@/components/loader";



const Login: NextPage = () => {
    
    const [loader, setLoader] = React.useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, clearErrors, reset, setError } = useForm<IForm>({
        defaultValues: {
            email: "",
            password: "",
            checkStatus: false
        },
        criteriaMode: "all"
    });
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        if (session.status === "authenticated") {
            router.replace("/")
        }
    }, [session]);
    
    const details = async (data: FieldValues) => {
        setLoader(true);
       
        let response = await signIn("credentials", { ...data, redirect: false });
      
        if (response) {
            if (response.error) {

                if (response.status === 401 && response.error.includes("auth")) {
                    toast.info("Please provide correct credentials", {
                        autoClose: 2000,
                        theme: "colored"
                    })
                }
                else if (!response.error.includes("ECONNREFUSED")) {
                    setLoader(false);
                    response.error === "CredentialsSignin" ?
                        toast.error("Invalid credentials , please try again,", {
                            autoClose: 2000,
                            theme: "colored"
                        }) : toast.error(`${response.error}`, {
                            autoClose: 2000,
                            theme: "colored"
                        })
                }
                else if (response.error.includes("ECONNREFUSED")) {
                    toast.error("Oops please connection failed ,please try again", {
                        autoClose: 2000,
                        theme: "colored"
                    })
                }
            }
        }
        else {
            setLoader(false);
            toast.success("Loggined Successfully");
            router.replace("/");
        }
    }
  
    
    const [password, setPassword] = React.useState<boolean>(false);
    const registerEmail = register("email", {
        required: true, onChange(event) {
            let regexp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            if (!regexp.test(event.target.value) && event.target.value !== "") {
                setError("email", { type: "invalideemail", message: "Email should be valid*" })
            }
            else if (event.target.value === "") setError("email", {
                types: {
                    required: 'Email is rrequired*'
                }
            })
            else {
                clearErrors('email');
            }
        },
    });
    const registerPassword = register("password", {
        required: true, maxLength: 40, onChange(event) {
            let regexp = new RegExp("^(?=.*[0-9])"
                + "(?=.*[a-z])(?=.*[A-Z])"
                + "(?=.*[@#$%^&+=])"
                + "(?=\\S+$).{8,20}$");
            if (!regexp.test(event.target.value) && event.target.value !== "") {
                setError("password", { type: "mismatch", message: "Password must contain atleast one uppercase letter , one lower case letter , atleast one numeric character , atleast one special character*" })
            }
            else if (event.target.value === "") setError("password", {
                types: {
                    required: "Password is required"
                }
            })
            else {
                clearErrors("password");
            }
        },
    });
    
    const rememberCheck = register("checkStatus", {
        required: true, onChange(event) {

        },
    });
    return (
        <>
            {loader ? <Backdrop open ><LoaderAnimate /></Backdrop> :
                <section className={"bg-pink-400"}>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <p className="flex items-center text-3xl font-semibold text-pink-700">
                            <img className="w-21 h-14 mr-2" src={"/codeswearcircle.png"} alt="logo" />
                            CodeSwear - Wear the code.
                        </p>
                        <p className="m-0 text-pink-600 text-lg my-2">Sign in to your account!</p>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="lg:text-3xl sm:text-xl md:text-2xl">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(details)}>
                                    <div className="form-group position-relative">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-pink-500">Your email</label>
                                        <input type="email" id="email" {...registerEmail} className="border border-pink-300 text-pink-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                                        {errors.email?.types?.required && <span className="absolute top-25 left-3 text-[11.5px] text-pink-700">Email is required*</span>}
                                        {errors.email?.type === "invalideemail" && <span className="absolute text-[11.5px] text-pink-700 top-25 left-3">{"Email should be valid*"}</span>}
                                    </div>
                                    <div className="form-group position-relative">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-pink-500">Password</label>
                                        <input type={password ? "text" : "password"} id="password" placeholder="••••••••" {...registerPassword} className="border border-pink-300 text-pink-500 rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5" />
                                        {errors.password?.types?.required && <span className="position-absolute text-[11px] text-pink-700 left-3 top-21">{"Password is required"}*</span>}
                                        {errors?.password?.type === "mismatch" && <span className="absolute text-[10px] text-pink-600 top-25 left-3">{errors.password.message}</span>}
                                        {password && <FaEye className="absolute top-[45px] right-3 cursor-pointer" onClick={e => setPassword(!password)} />}
                                        {!password && <FaEyeSlash className="absolute top-[45px] right-3 cursor-pointer" onClick={e => setPassword(!password)} />}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start relative">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" {...rememberCheck} type="checkbox" className="w-3.5 h-3.5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                            </div>
                                            <div className="mx-1 text-sm">
                                                <label htmlFor="remember" className="text-pink-600">Remember me</label>
                                            </div>
                                            {errors.checkStatus?.types?.required && <span className="text-pink-700 absolute top-[19px] left-3 text-[10.8px]">{"Remember ?"}</span>}
                                        </div>
                                        <a className="text-sm font-medium text-pink-600" href="/authentication/forgotPassword">Forgot password?</a>
                                    </div>
                                    <button type="submit" disabled={loader} className="w-full text-light bg-pink-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-xl px-3 py-2 text-center">Sign in</button>
                                    <p className="text-sm font-light text-center text-pink-500">
                                        Don’t have an account yet? <a href="/authentication/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}
export default Login;

  