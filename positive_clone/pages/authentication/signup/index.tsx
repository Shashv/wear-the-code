import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Backdrop, } from "@mui/material";
import uploader from "../../../components/assets/upload.png";
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSideProps, NextPage } from "next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import LoaderAnimate from "../../../components/loader";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import authorizeOptions from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close"
import { ISignup } from "@/modals";
import './index.css';
let passwordValue: string = "";
let confirmPassword: string = "";
let imageBuffer: any = "";

const Signup: NextPage = () => {
    const { register, handleSubmit, formState: { errors, defaultValues }, reset, setError, clearErrors } = useForm<ISignup>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        criteriaMode: "all"
    });
    const router = useRouter();
    const [loader, setLoader] = React.useState<boolean>(false);
    const [image, setImage] = useState<File | null | Blob>(null);
    const imageref = useRef<HTMLImageElement>(null);
    const [password, setPassword] = React.useState<{
        generalpassword: {
            show: boolean
        }, confirmPassword: {
            show: boolean
        }
    }>({
        generalpassword: {
            show: false
        },
        confirmPassword: {
            show: false,
        }
    });

    const discardProfile: (e: React.MouseEvent<HTMLSpanElement>) => void = e => {
        console.log("Event emitted");
        setImage(null);
        imageBuffer = ""
    }

    const { onChange, ...rest } = register("image", {
        required: true
    });

    // const formFields = [{
    //     type: "name",
    //     label: "Name"
    // }, {
    //     type: "emai",
    //     label: "Email"
    // }, {
    //     type: "passowrd",
    //     label: "Passowrd"
    // }, {
    //     type: "confirmPassword",
    //     label: "Confirm Password"
    // }];
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", e => {
                if (imageref.current && image) {
                    let result = fileReader.result?.toString().replace(/^data:image\/\w+;base64,/, "") || "";
                    let buffer = Buffer.from(result, "base64")
                    imageref.current.src = fileReader.result?.toString() || "";
                    imageBuffer = buffer;
                }
            }, false)
            fileReader.readAsDataURL(e.target.files[0]);
            setImage(e.target.files[0]);
        }

    }
    const details = (data: FieldValues) => {
        setLoader(true);
        if (data) {
            data["image"] = image;
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(`${key}`, data[`${key}`]);

            });

            fetch("/api/signup", {
                method: "POST",

                body: formData
            }).then(res => res.json()).then(res => {
                setLoader(false);
                if (res.message === "User created successfully") {
                    toast.success("Yay,account created successfully", {
                        position: "top-right",
                        autoClose: 4000,
                        draggable: false,
                    });
                    reset();
                    setImage(null);
                    router.replace("/", undefined, { shallow: false });
                }
                else if (res.message === "User already exists") {
                    toast.info("User with the matched credentials already exists , please enter different credentials or login with the same", {
                        autoClose: 2000,
                        theme: "colored"
                    });
                }
                else if (res.message === "Babaji Gangotri , please provide unique profile pic") {
                    toast.info("Babaji Gangotri , please provide unique profile pic", {
                        autoClose: 2000,
                        theme: "colored"
                    });
                }
            });

        }
    }
    return (
        <>
            {loader ? <Backdrop open>
                <LoaderAnimate />
            </Backdrop> :
                <>
                    <ToastContainer />
                    <section className="bg-pink-400 h-100">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-100">
                            <a href="#" className="flex items-center mb-6 text-3xl font-semibold text-pink-600">
                                <img className="w-17 h-14 mr-2" src="/codeswearcircle.png" alt="logo" />
                                CodeSwear - Sign up
                            </a>
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-pink-800 dark:border-pink-700 ">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold text-pink-500 md:text-2xl">
                                        Create an account
                                    </h1>
                                    <form className="space-y-4 md:space-y-7" autoComplete="off" onSubmit={handleSubmit(details)}>
                                        <input type="hidden" value={"prayer"} />

                                        <div className="position-relative">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-pink-500">Your Name</label>
                                            <input autoComplete="off" maxLength={40} type="text" id="name" {...register("name", {
                                                required: true, maxLength: 40, onChange(event) {
                                                    if (event.target.value === "") {
                                                        setError("name", { type: "required", message: "Name is required*" });
                                                    }
                                                    else {
                                                        clearErrors("name");
                                                    }
                                                },
                                            })} className="bg-pink-50 border border-pink-300 text-pink-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Name" />
                                            {errors.name && <span className="text-xs text-pink-600 absolute top-21 left-4">{"Name is required*"}</span>}
                                        </div>

                                        <div className="position-relative">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-pink-500">Your email</label>
                                            <input autoComplete="off" type="email" id="email" {...register("email", {
                                                required: true, maxLength: 40, onChange(event) {
                                                    let emailregexp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                                                    if (emailregexp.test(event.target.value) === false && event.target.value !== "") {
                                                        setError("email", { type: "validatemanual", message: "Email shoul be valid*" })
                                                    }
                                                    else {
                                                        clearErrors("email");
                                                    }
                                                },
                                            })} className="bg-pink-50 border border-pink-300 text-pink-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                                            {errors.email?.types?.required && <span className="text-pink-600 absolute left-4 top-21 text-xs">Email is required*</span>}
                                            {errors.email?.type === "validatemanual" && <span className="absolute text-xs text-pink-600 top-21 left-4">{"Email should be valid*"}</span>}
                                        </div>

                                        <div className="position-relative">
                                            <label className="block mb-2 text-sm font-medium text-pink-500">
                                                Set your profile pic
                                            </label>
                                            <div className="uploader-wrapper">
                                                <label htmlFor="file-upload" className="p-2">
                                                    {
                                                        !image ?
                                                            <Image className="w-[75px] h-[75px]" alt="Upload the image" src={uploader} width={60} height={60} /> :
                                                            <div className="image-holder relative">
                                                                <img ref={imageref} className="rounded-circle w-[140px] h-[140px]" id="file-upload"  />
                                                                <span onClick={discardProfile} className="cursor-pointer absolute top-[0px] right-[5px] border-pink-500">
                                                                    <CloseIcon color={"action"} sx={{ color: "magenta" }} className="" fontSize="large" />
                                                                </span>
                                                            </div>
                                                    }
                                                </label>
                                                <input id="file-upload" accept=".jpeg,.jpg,.png" multiple={false} className="profile-uploader d-none" type={"file"} onChange={handleFileChange} {...rest} />
                                            </div>
                                            {errors.image && <span className="absolute text-xs text-pink-600 top-[100px] left-4">
                                                {"Image is required*"}</span>}
                                        </div>

                                        <div className="position-relative">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-pink-500">Password</label>
                                            {password.generalpassword.show && <FaEye className={"absolute top-[60%] right-2 cursor-pointer"} onClick={e => setPassword({ ...password, generalpassword: { ...password.generalpassword, show: !password.generalpassword.show } })} />}
                                            {!password.generalpassword.show && <FaEyeSlash className={"absolute top-[60%] right-2 cursor-pointer"} onClick={e => setPassword({ ...password, generalpassword: { ...password.generalpassword, show: !password.generalpassword.show } })} />}
                                            <input type={password.generalpassword.show ? "text" : "password"} {...register("password", {
                                                required: true, maxLength: 40, onChange(event) {
                                                    passwordValue = event.target.value;
                                                    let regexp = new RegExp("^(?=.*[0-9])"
                                                        + "(?=.*[a-z])(?=.*[A-Z])"
                                                        + "(?=.*[@#$%^&+=])"
                                                        + "(?=\\S+$).{8,20}$");
                                                    if (regexp.test(event.target.value) && event.target.value !== "") {
                                                        clearErrors("password");
                                                    }
                                                    else if (!regexp.test(event.target.value)) {
                                                        setError("password", { type: "invalidepassword", message: "Password must contain atleast one uppercase letter , one lower case letter , atleast one numeric character , atleast one special character*" })
                                                    }
                                                    else {
                                                        setError("password", { type: "invalidepassword", message: "Password must contain atleast one uppercase letter , one lower case letter , atleast one numeric character , atleast one special character*" });
                                                    }
                                                }
                                            })} id="password" placeholder="••••••••" className="bg-pink-50 border border-pink-300 text-pink-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                            {errors.password?.types?.required && <span className="text-pink-600 absolute left-4 top-21 text-xs">{"Password is required"}*</span>}
                                            {errors.password?.type === "invalidepassword" && <span className="absolute top-21 left-4 text-pink-600 text-xs">{errors.password.message}</span>}
                                        </div>

                                        <div className="position-relative">
                                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-pink-500">Confirm password</label>
                                            {password.confirmPassword.show && <FaEye className="absolute top-[60%] right-2 cursor-pointer" onClick={e => setPassword({ ...password, confirmPassword: { ...password.confirmPassword, show: !password.confirmPassword.show } })} />}
                                            {!password.confirmPassword.show && < FaEyeSlash className="absolute top-[60%] right-2 cursor-pointer" onClick={e => setPassword({ ...password, confirmPassword: { ...password.confirmPassword, show: !password.confirmPassword.show } })} />}
                                            <input type={!password.confirmPassword.show ? "password" : "text"} {...register("confirmPassword", {
                                                required: true, maxLength: 40, onChange(event) {
                                                    confirmPassword = event.target.value;
                                                    let regexp = new RegExp("^(?=.*[0-9])"
                                                        + "(?=.*[a-z])(?=.*[A-Z])"
                                                        + "(?=.*[@#$%^&+=])"
                                                        + "(?=\\S+$).{8,20}$");
                                                    if (passwordValue !== "") {
                                                        if (regexp.test(event.target.value) && event.target.value !== "" && event.target.value === passwordValue) {
                                                            clearErrors("confirmPassword");
                                                        }
                                                        else if (event.target.value === "") {
                                                            setError("confirmPassword", { types: { required: "Confirm Password is required*" } })
                                                        }
                                                        else if (event.target.value !== passwordValue) {
                                                            setError("confirmPassword", { type: "mismatch", message: "Password and confirmPassword must match each other*" });
                                                        }
                                                        else {
                                                            setError("confirmPassword", { type: "invalidconfirmPassword", message: "Confirm Password is not valid*" })
                                                        }
                                                    }
                                                }
                                            })} id="confirm-password" placeholder="••••••••" className="bg-pink-50 border border-pink-300 text-pink-600 text-sm rounded-lg block w-full p-2.5" />
                                            {errors.confirmPassword?.types?.required && <span className="text-pink-600 absolute left-4 top-21 text-xs">{"Confirm Password is required"}*</span>}
                                            {errors.confirmPassword?.type === "mismatch" && <span className="text-pink-600 absolute left-4 top-21 text-xs">{"Confirm Password must match password*"}</span>}
                                        </div>

                                        <div className="flex items-start position-relative">
                                            <div className="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" style={{ accentColor: "pink" }} type="checkbox" {...register("checkStatus", {
                                                    required: true, onChange(event) {
                                                        event.target.checked ? clearErrors("checkStatus") : setError("checkStatus", { type: "required" })
                                                    },
                                                })} className="w-[3.5] h-[3.5] cursor-pointer border border-pink-300 rounded bg-pink-50 focus:ring-3 focus:ring-primary-300 dark:bg-pink-700 dark:border-pink-600 dark:focus:ring-primary-600 dark:ring-offset-pink-800" />
                                                {errors.checkStatus && <span className="text-pink-600 absolute left-4 top-[17px] text-[11.5px]">Please accept our terms and conditions*</span>}
                                            </div>
                                            <div className="ml-2 text-sm">
                                                <label htmlFor="terms" className="font-light text-pink-500 dark:text-pink-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</a></label>
                                            </div>
                                        </div>

                                        <button type="submit" className="w-full text-white bg-pink-400 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                        <p className="text-sm font-light text-pink-500 dark:text-pink-400">
                                            Already have an account? <a href="/authentication/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                </>
            }
        </>

    )

}
export default Signup;
// running on serverside session...//
export const getServerSideProps: GetServerSideProps = async context => {
    const serverSession = await getServerSession(context.req, context.res, authorizeOptions);
    if (serverSession) {
        return {
            redirect: {
                basePath: false,
                destination: "/",
                permanent: false
            }
        }
    }
    else {
        return {
            props: {

            }
        }
    }
}
// ....///