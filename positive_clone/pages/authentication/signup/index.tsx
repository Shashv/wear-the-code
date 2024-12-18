import React from "react";
import { Container, Row, Col, Form } from "reactstrap";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import countryList from "../../countries/countries.json";
import { ToastContainer, toast } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";
import { FaFacebook } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import './index.css';
import Loader from "../../../components/loader";
import 'react-toastify/dist/ReactToastify.css';
import { NextPage } from "next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import LoaderAnimate from "../../../components/loader";
interface ISignup {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    checkStatus?: boolean;
}
let passwordValue: string = "";
let confirmPassword: string = "";
//botpenguin...
// type FormInputs = {
//     forgotPassword: {
//         error: boolean;
//         value: string;
//     };
//     login: {
//         email: {
//             value: null | string;
//             error: null | boolean;
//             emptyError: null | boolean;
//             validEmail: null | boolean
//         },
//         password?: {
//             value: string,
//             error?: boolean
//         }
//     },
//     signup: {
//         email: {
//             error: boolean,
//             value: string
//         },
//         phone: {
//             error: boolean,
//             value: number | string;
//         },
//         password: {
//             value: string,
//             error: boolean,
//             errorVariantion: {
//                 upperCase: boolean;
//                 lowerCase: boolean;
//                 numeric: boolean;
//                 special: boolean;
//                 length: boolean
//             }
//         }
//     },
//     toast: {
//         message: string;
//         open: boolean;
//     }
// }
// type ICountryDetails = {
//     name: string;
//     flag: string;
//     code: string;
//     dial_code: string;
// }
// let password: any = "";
// class SignUp extends React.Component<{}, { name: string; flag: string; dial_code: string; code: string, toggleBox: boolean, signUp: boolean, countryList: { name: string, dial_code: string, code: string, flag: string }[], forgotPassword: boolean, formData: FormInputs, passwordArray: any[]; eyeVisible: boolean; loader: boolean }> {
//     constructor(props: {}) {
//         super(props);
//         this.state = {
//             name: "India",
//             dial_code: "+91",
//             flag: "in",
//             code: "IN",
//             toggleBox: false,
//             signUp: true,
//             countryList: [],
//             forgotPassword: false,
//             formData: {
//                 forgotPassword: {
//                     error: false,
//                     value: ""
//                 },
//                 login: {
//                     email: {
//                         value: "",
//                         error: null,
//                         emptyError: null,
//                         validEmail: null
//                     },
//                     password: {
//                         error: false,
//                         value: ""
//                     }
//                 },
//                 signup: {
//                     email: {
//                         value: "",
//                         error: false
//                     },
//                     phone: {
//                         value: "",
//                         error: false
//                     },
//                     password: {
//                         value: "",
//                         error: false,
//                         errorVariantion: {
//                             upperCase: false,
//                             lowerCase: false,
//                             numeric: false,
//                             special: false,
//                             length: false
//                         }
//                     }
//                 },
//                 toast: {
//                     message: "",
//                     open: false
//                 },
//             }, passwordArray: [],
//             eyeVisible: true, loader: false
//         }
//         this.submitUser = this.submitUser.bind(this);
//         this.toggleCountryBox = this.toggleCountryBox.bind(this);
//         this.passwordReset = this.passwordReset.bind(this);
//         this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
//         this.handleWorkEmailChange = this.handleWorkEmailChange.bind(this);
//         this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
//         this.handlePasswordChange = this.handlePasswordChange.bind(this);
//         this.updateCountryCode = this.updateCountryCode.bind(this);
//         this.searchFlag = this.searchFlag.bind(this);
//         this.handleLoginEmailChange = this.handleLoginEmailChange.bind(this);
//         this.submitLogin = this.submitLogin.bind(this);
//     }
//     componentDidMount(): void {
//         require("bootstrap/dist/js/bootstrap.bundle.js");
//         this.setState({
//             countryList: countryList.map((key, index) => {
//                 return {
//                     name: key.name,
//                     dial_code: key.dial_code,
//                     flag: key.code.toLowerCase(),
//                     code: key.code
//                 }
//             })
//         });
//     }
//     toggleCountryBox(): void {
//         this.setState({
//             toggleBox: !this.state.toggleBox
//         })
//     }
//     passwordReset(e: React.FormEvent<HTMLFormElement>): void {
//         if (this.state.formData.forgotPassword.value === "") {
//             e.preventDefault();
//             this.setState({
//                 formData: { ...this.state.formData, forgotPassword: { ...this.state.formData.forgotPassword, error: true } }
//             });
//         }
//         else {
//             console.log("Password Reset", e.preventDefault());
//         }
//     }
//     handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         this.setState({
//             formData: { ...this.state.formData, forgotPassword: { ...this.state.formData.forgotPassword, value: e.target.value } }
//         });
//     }
//     submitUser(e: React.FormEvent<HTMLFormElement>): void {
//         e.preventDefault();
//         if (this.state.formData.signup.email.value === "" && this.state.formData.signup.password.value === "")
//             this.setState({
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, error: true }, password: { ...this.state.formData.signup.password, error: true }, phone: { ...this.state.formData.signup.phone, error: true } } }
//             });
//         else if (!this.state.formData.signup.email.error && !this.state.formData.signup.password.error && !this.state.formData.signup.phone.error) {
//             this.setState({
//                 loader: true
//             });
//             fetch("/api/signup", { method: "POST", body: JSON.stringify({ email: this.state.formData.signup.email.value, phone: this.state.formData.signup.phone.value, password: password }) }).then(response => response.json()).then(response => {
//                 this.setState({
//                     formData: { ...this.state.formData, toast: { ...this.state.formData.toast, message: response.message, open: true }, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, value: "" }, password: { ...this.state.formData.signup.password, value: "" }, phone: { ...this.state.formData.signup.phone, value: "" } } },
//                     loader: false
//                 });
//                 toast.success("Signed Up Successfully", {
//                     position: "top-right",
//                     autoClose: 4000,
//                     draggable: false,
//                     theme: "dark"
//                 })
//             });
//             toast.success("Wow this is easy");
//         }

//     }
//     handleWorkEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         if (e.target.value === "") {
//             this.setState({
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, error: true, value: e.currentTarget.value } } }
//             })
//         }
//         else {
//             this.setState({
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, error: false, value: e.target.value } } }
//             })
//         }
//     }
//     handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         let numbers = /^[0-9]+$/;
//         if (e.target.value.toString().length === 0) {
//             this.setState({
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, phone: { ...this.state.formData.signup.phone, value: "", error: true } } }
//             })
//         }
//         else
//             numbers.test(e.target.value) && e.currentTarget.value.toString().length <= 15 && this.setState({
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, phone: { ...this.state.formData.signup.phone, value: e.target.value, error: false } } }
//             });
//     }
//     handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         let expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         let upperCaseRegexp = /[A-Z]/;
//         let lowerCaseRegexp = /[a-z]/;
//         let numbers = /^[0-9]+$/;
//         let alreadyUpperCase = false;
//         let alreadyLowerCase = false;
//         this.setState({
//             formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, value: e.currentTarget.value } } }
//         });
//         if (e.currentTarget.value.length === 0) {
//             this.setState({
//                 passwordArray: [],
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: true, value: e.currentTarget.value, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, upperCase: false, numeric: false, special: false, length: false } } } }
//             });
//         }
//         else {
//             let length = e.currentTarget.value.length;
//             let passArray: string[] = [];
//             this.setState({
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, value: e.currentTarget.value } } }
//             })

//             if (e.currentTarget.value.length === 1) {
//                 this.state.passwordArray.push(e.currentTarget.value[0]);
//                 passArray.push(e.currentTarget.value[0]);
//             }

//             let upperCase = e.currentTarget.value.length === 1 ? e.currentTarget.value[0].toUpperCase() : e.currentTarget.value[e.currentTarget.value.length - 1].toUpperCase();
//             let lowerCase = e.currentTarget.value.length === 1 ? e.currentTarget.value[0].toLowerCase() : e.currentTarget.value[e.currentTarget.value.length - 1].toLowerCase();
//             let isUpperCased = e.currentTarget.value.length === 1 ? e.currentTarget.value[0] === upperCase : e.currentTarget.value[e.currentTarget.value.length - 1] === upperCase;
//             let isLowerCased = e.currentTarget.value.length === 1 ? e.currentTarget.value[0] === lowerCase : e.currentTarget.value[e.currentTarget.value.length - 1] === lowerCase;

//             let isNumbered = Array.from(e.currentTarget.value).some((keySome, index) => /^[+-]?\d+(\.\d+)?$/.test(keySome));
//             if (!isLowerCased) {
//                 if (length < 8) {
//                     alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
//                     alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));

//                     !alreadyLowerCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, length: true, numeric: true, upperCase: false } } } }
//                     });
//                     alreadyLowerCase && isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, numeric: false, upperCase: false, length: true } } } }
//                     });
//                     alreadyLowerCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, numeric: true, upperCase: false, length: true } } } }
//                     });
//                     !alreadyLowerCase && isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, length: true, numeric: false, upperCase: false } } } }
//                     });

//                 }
//                 if (length >= 8 && length <= 20) {
//                     alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
//                     alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
//                     !alreadyLowerCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, numeric: true, upperCase: false, length: false } } } }
//                     });
//                     !alreadyLowerCase && isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, numeric: false, upperCase: false, length: false } } } }
//                     });
//                     alreadyLowerCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, numeric: true, upperCase: false, length: false } } } }
//                     });
//                     alreadyLowerCase && isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, numeric: false, upperCase: false, length: false } } } }
//                     });
//                 }
//             }
//             if (!isUpperCased) {

//                 if (length < 8 || length > 20) {
//                     alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
//                     alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
//                     !alreadyUpperCase && isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, numeric: true, lowerCase: false, length: true } } } }
//                     });
//                     alreadyUpperCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, numeric: true, lowerCase: false, length: true } } } }
//                     });
//                     alreadyUpperCase && isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, numeric: false, lowerCase: false, length: true } } } }
//                     });

//                     !alreadyUpperCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, numeric: true, lowerCase: false, length: true } } } }
//                     });
//                 }
//                 if (length >= 8 && length <= 20) {
//                     alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
//                     alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
//                     !alreadyUpperCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, numeric: true, lowerCase: false, length: false } } } }
//                     });
//                     !alreadyUpperCase && isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, numeric: false, lowerCase: false, length: false } } } }
//                     });
//                     alreadyUpperCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, numeric: true, lowerCase: false, length: false } } } }
//                     });
//                     alreadyUpperCase && isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, numeric: false, lowerCase: false, length: false } } } }
//                     });
//                 }
//             }
//             if (isNumbered) {
//                 if (length < 8 || length > 20) {
//                     alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
//                     alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
//                     !alreadyLowerCase && !alreadyUpperCase && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, numeric: false, lowerCase: true, upperCase: true, length: true } } } }
//                     });
//                     alreadyLowerCase && !alreadyUpperCase && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, numeric: false, lowerCase: false, upperCase: true, length: true } } } }
//                     });
//                     !alreadyLowerCase && alreadyUpperCase && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, lowerCase: true, length: true, numeric: false } } } }
//                     })
//                     alreadyLowerCase && alreadyUpperCase && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, lowerCase: false, length: true, numeric: false } } } }
//                     })
//                 }
//                 if (length >= 8 && length <= 20) {
//                     alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
//                     alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
//                     !alreadyLowerCase && !alreadyUpperCase && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, numeric: false, lowerCase: true, upperCase: true, length: false } } } }
//                     });
//                     alreadyLowerCase && !alreadyUpperCase && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, numeric: false, lowerCase: false, upperCase: true, length: false } } } }
//                     });
//                     !alreadyLowerCase && alreadyUpperCase && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, lowerCase: true, length: false, numeric: false } } } }
//                     })
//                     alreadyLowerCase && alreadyUpperCase && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, lowerCase: false, length: false, numeric: false } } } }
//                     })
//                 }
//             }
//         }
//         password = e.currentTarget.value
//     }
//     componentDidUpdate(previousProps: Readonly<{}>, previousState: Readonly<any>): void {
//     }
//     updateCountryCode(e: React.MouseEvent<HTMLLIElement>, contactDetails: { name: string; dial_code: string; flag: string; code: string }): void {
//         this.setState({
//             dial_code: contactDetails.dial_code,
//             name: contactDetails.name,
//             flag: contactDetails.flag,
//             code: contactDetails.code,
//             toggleBox: !this.state.toggleBox
//         });
//     }
//     searchFlag(e: React.KeyboardEvent<HTMLInputElement>): void {
//         if (e.currentTarget.value === "") {
//             this.setState({
//                 countryList: countryList.map((key, index) => {
//                     return {
//                         name: key.name,
//                         flag: key.code.toLowerCase(),
//                         code: key.code,
//                         dial_code: key.dial_code
//                     }
//                 })
//             })
//         }
//         else {
//             let str = e.currentTarget.value;
//             let filteredList: any[] = [];
//             if (str.length > 1) {
//                 str = str[0].toUpperCase() + str.slice(1);
//                 filteredList = countryList.filter((key, index) => {
//                     let regexCapital = /[A-Z]/;
//                     return key.name.includes(str) || key.name.includes(e.currentTarget.value);
//                 });
//             }
//             else
//                 if (str.length === 1) {
//                     filteredList = countryList.filter(key => key.name.includes(str));
//                 }
//                 else filteredList = countryList;
//             this.setState({
//                 countryList: filteredList.map((key, index) => {
//                     return {
//                         name: key.name,
//                         flag: key.code.toLowerCase(),
//                         code: key.code,
//                         dial_code: key.dial_code
//                     }
//                 })
//             })
//         }
//     }
//     handleLoginEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {

//         if (e.target.value !== "") {
//             let regexExpression: RegExp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
//             let pass: boolean = regexExpression.test(e.target.value);
//             this.setState({
//                 formData: { ...this.state.formData, login: { ...this.state.formData.login, email: { ...this.state.formData.login.email, value: e.target.value, error: !pass, validEmail: pass, emptyError: false } } }
//             })
//         }
//         else if (e.target.value === "") {
//             this.setState({
//                 formData: { ...this.state.formData, login: { ...this.state.formData.login, email: { ...this.state.formData.login.email, value: e.target.value, emptyError: true, error: false, validEmail: null } } }
//             })
//         }
//     }
//     handleLoginPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         console.log(e.currentTarget.value);
//         this.setState({
//             formData: { ...this.state.formData, login: { ...this.state.formData.login, password: { ...this.state.formData.login.password, value: e.currentTarget.value } } }
//         })
//     }
//     submitLogin(e: React.FormEvent<HTMLFormElement>): void {
//         e.preventDefault();
//     }
//     render(): JSX.Element {
//         return (
//             <>
//                 {this.state.loader ?
//                     <Loader />
//                     :
//                     <>
//                         <ToastContainer pauseOnHover closeButton />
//                         <Form onSubmit={this.submitUser} method="post">
//                             <Container className="main-container" fluid style={{ height: "100vh" }}>
//                                 <Row className="d-flex justify-content-center align-items-center h-100 p-2 pt-5">
//                                     <Col className="signup-container h-100 d-flex flex-column justify-content-evenly align-items-center gap-3" xs={6}>
//                                         <div className="logo d-flex justify-content-center">
//                                             <img className="rounded-4 penguin" width={80} height={80} src="/unnamed.png" />
//                                         </div>
//                                         <div className="head-text text-center my-1">
//                                             <Typography className="head-text" variant={"h4"}>
//                                                 Set up a FREE Account
//                                             </Typography>
//                                         </div>
//                                         <div className="checkboxes d-flex justify-content-evenly w-75">
//                                             <div className="paytm d-flex align-items-center" style={{ gap: "6.8px" }}>
//                                                 <span className="fw-bold material-icons" style={{ backgroundColor: "#d0f0d2", padding: "1px", fontSize: "21.5px", borderRadius: "6px", color: "#3da144" }}>
//                                                     done
//                                                 </span>
//                                                 <Typography sx={{ fontSize: "14px", color: "#747474", paddingTop: "2px", fontFamily: "Matter Regular", }}>
//                                                     No credit card required
//                                                 </Typography>
//                                             </div>
//                                             <div className="googlepay d-flex align-items-center" style={{ gap: "6.8px" }}>
//                                                 <span className="fw-bold material-icons" style={{ backgroundColor: "#d0f0d2", padding: "1px", fontSize: "22px", borderRadius: "6px", color: "#3da144" }}>
//                                                     done
//                                                 </span>
//                                                 <Typography sx={{ fontSize: "13px", fontFamily: "Matter Regular", paddingTop: "2px", color: "#747474" }}>
//                                                     Cancel Anytime
//                                                 </Typography>
//                                             </div>
//                                         </div>
//                                         <div className="button-container d-flex w-75 gap-4">
//                                             <button className="label-button-facebook w-50 d-flex gap-2 align-items-center">
//                                                 <span>
//                                                     <FaFacebook color="#226cf4" size={30} />
//                                                 </span>
//                                                 <span className="positive-text">
//                                                     Sign Up with Facebook
//                                                 </span>
//                                             </button>
//                                             <div className="label-button-google d-flex gap-2 align-items-center w-50">
//                                                 <span className="">
//                                                     <i className="fab fa-google"></i>
//                                                 </span>
//                                                 <span className="google-text">
//                                                     Sign Up with Google
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="marginal-block d-flex w-75 justify-content-center align-items-center my-4 mb-3 gap-3">
//                                             <div className="border border-top-0 border-start-0 w-50 border-end-0 border-bottom-1" style={{ border: "#bebebe" }}>

//                                             </div>
//                                             <div>
//                                                 <span className="" style={{ color: "#bebebe" }}>OR</span>
//                                             </div>
//                                             <div className="border border-top-0 border-start-0 w-50 border-end-0 border-bottom-1" style={{ border: "#bebebe" }}>

//                                             </div>
//                                         </div>
//                                         <div className="input-container d-flex flex-column w-75 gap-4 align-items-center">
//                                             <div className="work-email w-100 justify-content-center d-flex position-relative">
//                                                 <input value={this.state.formData.signup.email.value} className="w-100 border border-muted py-3 ps-3 rounded-1" placeholder="Work Email*" onChange={this.handleWorkEmailChange} />
//                                                 {
//                                                     this.state.formData.signup.email.error &&
//                                                     <Typography className="" fontSize={"12px"} color={"red"} position={"absolute"} top={"60px"} left={"10px"}>Work email is required*</Typography>}
//                                             </div>
//                                             <div style={{ cursor: "pointer" }} className="phone position-relative d-flex justify-content-center w-100">
//                                                 <div onClick={(e) => this.toggleCountryBox()} className="default-mulk gap-1 px-2 rounded-start-1 rounded-end-0 border border-muted border-start-1 border-top-1 border-bottom-1 border-end-0 d-flex align-items-center phone-container">
//                                                     <img className="" width={23} height={23} src={`https://flagcdn.com/48x36/${this.state.flag}.png`} />
//                                                     <Typography className="text-muted" sx={{ fontSize: "19px" }}>{this.state.dial_code}</Typography>
//                                                     <IoMdArrowDropdown cursor={"pointer"} size={20} />
//                                                 </div>
//                                                 <div className={this.state.toggleBox ? "country-list w-100 position-absolute d-block" : "country-list position-absolute w-100 d-none"}>
//                                                     <div className="search-country w-100 position-relative rounded-top-2 border border-muted border-top-1 border-start-1 border-end-1 border-bottom-0">
//                                                         <span className="material-icons text-muted position-absolute" style={{ top: "17px", right: "10px" }}>search</span>
//                                                     </div>
//                                                     <ul className="country-list border border-1-muted border-top-0 ps-0" style={{ listStyle: "none", overflow: "auto", height: "140px", paddingLeft: "10px" }}>
//                                                         {this.state.countryList != null && this.state.countryList.map((key, index) => <li className="country-name my-1 p-2 d-flex gap-1 align-items-center" key={index} onClick={(e: React.MouseEvent<HTMLLIElement>) => this.updateCountryCode(e, { dial_code: key.dial_code, code: key.code, name: key.name, flag: key.flag })}>
//                                                             <span>
//                                                                 <img className="" width={25} height={25} src={`https://flagcdn.com/48x36/${key.flag}.png`} />
//                                                             </span>
//                                                             <Typography className="country-text">
//                                                                 {key.name}
//                                                             </Typography>
//                                                             <Typography className="text-muted">
//                                                                 ({key.dial_code})
//                                                             </Typography>
//                                                         </li>)}
//                                                     </ul>
//                                                 </div>
//                                                 <input className="w-100 border border-muted border-start-0 py-3 ps-3 rounded-start-0 rounded-end-1" placeholder="Phone*" type="text" value={this.state.formData.signup.phone.value} onChange={this.handlePhoneNumberChange} />
//                                                 {this.state.formData.signup.phone.error && <Typography className="" fontSize={"12px"} top={"60px"} left={"10px"} color={"red"} position={"absolute"}>
//                                                     Phone number is required*
//                                                 </Typography>}
//                                             </div>
//                                             <div className="d-flex justify-content-center w-100 position-relative">
//                                                 <input className="w-100 border border-muted py-3 ps-3 rounded-1" type={this.state.eyeVisible ? "text" : "password"} onChange={this.handlePasswordChange} placeholder="Password*" />

//                                                 <span className={this.state.eyeVisible ? "eye text-muted material-icons position-absolute" : "d-none"} onClick={(e) => this.setState({
//                                                     eyeVisible: !this.state.eyeVisible
//                                                 })}>visibility</span>

//                                                 <span onClick={(e) => this.setState({
//                                                     eyeVisible: !this.state.eyeVisible
//                                                 })} className={!this.state.eyeVisible ? "eye material-icons text-muted position-absolute" : "d-none"}>
//                                                     visibility_off
//                                                 </span>

//                                                 {
//                                                     this.state.formData.signup.password.error &&
//                                                     <Typography className="" fontSize={"12px"} position={"absolute"} top={"60px"} left={"10px"} color={"red"}>
//                                                         Password is required*
//                                                     </Typography>
//                                                 }
//                                                 {
//                                                     (this.state.formData.signup.password.errorVariantion.length || this.state.formData.signup.password.errorVariantion.lowerCase || this.state.formData.signup.password.errorVariantion.numeric ||
//                                                         this.state.formData.signup.password.errorVariantion.special || this.state.formData.signup.password.errorVariantion.upperCase) &&

//                                                     <Box component={"div"} className="w-100 gap-2 container d-flex justify-content-evenly p-0" position={"absolute"} top={"60px"} left={"0px"}>
//                                                         <Typography className="text-infQo d-inline" fontStyle={"12px"} variant="subtitle2">
//                                                             Password must be
//                                                         </Typography>
//                                                         <Typography className={this.state.formData.signup.password.errorVariantion.length ? "text-danger" : "text-success"} style={{ fontSize: "13px" }}>
//                                                             atleast 8-20 characters long,
//                                                         </Typography>
//                                                         <Typography className={this.state.formData.signup.password.errorVariantion.upperCase ? "text-danger" : "text-success"} style={{ fontSize: "13px" }}>
//                                                             with atleast one uppercase letter,
//                                                         </Typography>
//                                                         <Typography className={this.state.formData.signup.password.errorVariantion.lowerCase ? "text-danger" : "text-success"} style={{ fontSize: "13px" }}>
//                                                             with atleast one lower case letter,
//                                                         </Typography>
//                                                         <Typography className={this.state.formData.signup.password.errorVariantion.numeric ? "text-danger" : "text-success"} style={{ fontSize: "13px" }}>
//                                                             with atleast one numeric alphabet
//                                                         </Typography>
//                                                     </Box>

//                                                 }
//                                             </div>
//                                         </div>
//                                         <div className="signbutton-container w-75" style={{ marginTop: "35px" }}>
//                                             <button className="sign-up-button w-100 text-light" type="submit">
//                                                 Sign Up
//                                             </button>
//                                         </div>
//                                         <div className="account-existance d-flex">
//                                             <Typography className="already-account" variant={"subtitle1"}>
//                                                 Already have an account?
//                                             </Typography>
//                                             <button className="border-0 bg-white login-link" onClick={(e) => this.setState({
//                                                 signUp: false,
//                                                 forgotPassword: false
//                                             })}>

//                                                 Login
//                                             </button>
//                                         </div>
//                                         <div className="privacy-policy d-flex">
//                                             <span className="">
//                                                 <a className="links">
//                                                     Privacy Policy
//                                                 </a>
//                                             </span>
//                                             <span style={{ color: "#c2c6cf" }}>
//                                                 and
//                                             </span>
//                                             <span>
//                                                 <a className="links">
//                                                     Terms and Conditions
//                                                 </a>
//                                             </span>
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </Container>
//                         </Form>
//                     </>
//                 }
//             </>)
//     }
// }
// export default SignUp;
//botpenguin ennd.//
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
    const [loader, setLoader] = React.useState<boolean>(false);
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
    const details = (data: FieldValues) => {
        setLoader(true);
        if (data) {
            fetch("/api/signup", {
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => res.json()).then(res => {
                setLoader(false);
                toast.success("Yay,account created successfully", {
                    position: "top-right",
                    autoClose: 4000,
                    draggable: false,
                })
            });
            reset();
        }
    }
    return (
        <>
            {loader ? <Backdrop open><LoaderAnimate /></Backdrop> :

                <>
                    <ToastContainer />
                    <section className="bg-pink-300">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <a href="#" className="flex items-center mb-6 text-3xl font-semibold text-pink-500">
                                <img className="w-17 h-14 mr-2" src="/codeswearcircle.png" alt="logo" />
                                CodeSwear - Sign up
                            </a>
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-pink-800 dark:border-pink-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold text-pink-500 md:text-2xl">
                                        Create an account
                                    </h1>
                                    <form className="space-y-4 md:space-y-7" onSubmit={handleSubmit(details)}>
                                        <div className="position-relative">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-pink-500">Your Name</label>
                                            <input maxLength={40} type="text" id="name" {...register("name", {
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
                                            <input type="email" id="email" {...register("email", {
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
                                            {errors.email?.type === "validatemanual" && <span className="absolute text-xs text-pink-600 absolute top-21 left-4">{"Email should be valid*"}</span>}
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
                                                            setError("confirmPassword", { type: "mismatch", message: "Password and confirmPassword must match each other*" })
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
                                                    onChange(event) {
                                                        console.log("Event target", event.target.checked);
                                                    },
                                                })} className="w-[3.5] h-[3.5] cursor-pointer border border-pink-300 rounded bg-pink-50 focus:ring-3 focus:ring-primary-300 dark:bg-pink-700 dark:border-pink-600 dark:focus:ring-primary-600 dark:ring-offset-pink-800" />
                                                {errors.checkStatus && <span className="text-pink-600 absolute left-4 top-21 text-xs">Email is required*</span>}
                                            </div>
                                            <div className="ml-2 text-sm">
                                                <label htmlFor="terms" className="font-light text-pink-500 dark:text-pink-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</a></label>
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full text-white bg-pink-400 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                        <p className="text-sm font-light text-pink-500 dark:text-pink-400">
                                            Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
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