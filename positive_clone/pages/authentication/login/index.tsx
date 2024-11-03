// import React from "react";
// import { Container, Row, Col, Form } from "reactstrap";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Typography";
// import countryList from "../../countries/countries.json";
// import { ToastContainer, toast } from "react-toastify";
// import { Backdrop, CircularProgress } from "@mui/material";
// import { FaFacebook } from "react-icons/fa";
// import { IoMdArrowDropdown } from "react-icons/io";
// import 'react-toastify/dist/ReactToastify.css';
// import './index.css';
// import Loader from "@/components/loader";
// import Link from "next/link";
// import {redirect} from "next/navigation";
// type FormInputs = {
//     forgotPassword: {
//         error: boolean;
//         value: string;
//     };
//     login: {
//         email: {
//             value: string;
//             error: null | boolean;
//             emptyError: null | boolean;
//             validEmail: null | boolean
//         },
//         password?: {
//             value: string,
//             error: boolean,
//             visible: boolean;
//             type: string;
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
// class Login extends React.Component<{}, { name: string; flag: string; dial_code: string; code: string, toggleBox: boolean, signUp: boolean, countryList: { name: string, dial_code: string, code: string, flag: string }[], forgotPassword: boolean, formData: FormInputs, passwordArray: any[]; eyeVisible: boolean; loader: boolean; formSubmitted: boolean }> {
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
//                         value: "",
//                         visible: false,
//                         type: "password"
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
//             eyeVisible: true, loader: false,
//             formSubmitted: false
//         }
//         //signup process //
//         this.submitUser = this.submitUser.bind(this);
//         this.toggleCountryBox = this.toggleCountryBox.bind(this);
//         this.passwordReset = this.passwordReset.bind(this);
//         this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
//         this.handleWorkEmailChange = this.handleWorkEmailChange.bind(this);
//         this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
//         this.handlePasswordChange = this.handlePasswordChange.bind(this);
//         this.updateCountryCode = this.updateCountryCode.bind(this);
//         this.searchFlag = this.searchFlag.bind(this);
//         //login methods//
//         this.handleLoginEmailChange = this.handleLoginEmailChange.bind(this);
//         this.submitLogin = this.submitLogin.bind(this);
//         this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
//         this.togglePassword = this.togglePassword.bind(this);
//         // this.closetoast = this.closetoast.bind(this);
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
//             // fetch("https://localhost:3000/api/tshirts")
//         }
//         else {
//             console.log("Password Reset", e.preventDefault());
//             // fetch("/api/signup", { method: "POST", body: JSON.stringify({ email:"shashvat" }) });
//         }
//     }
//     handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         // console.log(e.target.value);
//         this.setState({
//             formData: { ...this.state.formData, forgotPassword: { ...this.state.formData.forgotPassword, value: e.target.value } }
//         });
//     }
//     //for the signup process//
//     submitUser(e: React.FormEvent<HTMLFormElement>): void {
//         e.preventDefault();
//         // console.log("Form Submitted", e.preventDefault());
//         // console.log(this.state.formData.signup.password.value);
//         // else if (this.state.formData.signup.email.value === "") {
//         //     this.setState({
//         //         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, error: true } } }
//         //     })
//         // }
//         // else if (this.state.formData.signup.password.value === "") {
//         //     this.setState({
//         //         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: true } } }
//         //     })
//         // }
//         // else if (this.state.formData.signup.phone.value.length === 0) {
//         //     this.setState({
//         //         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, phone: { ...this.state.formData.signup.phone, error: true } } }
//         //     })
//         // }
//         // else {
//         //     let toast = <div className="alert alert-danger">
//         //         Password fields are required
//         //     </div>
//         // }
//         if (this.state.formData.signup.email.value === "" && this.state.formData.signup.password.value === "")
//             this.setState({
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, error: true }, password: { ...this.state.formData.signup.password, error: true }, phone: { ...this.state.formData.signup.phone, error: true } } }
//             });
//         else if (!this.state.formData.signup.email.error && !this.state.formData.signup.password.error && !this.state.formData.signup.phone.error) {
//             // console.log(this.state.formData.signup.email.error);
//             this.setState({
//                 loader: true
//             });
//             // console.log(this.state.formData.signup.email.value, this.state.formData.signup.password.value, this.state.formData.signup.phone.value);
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
//             // setTimeout(() => {
//             //     this.setState({
//             //         formData: { ...this.state.formData, toast: { ...this.state.formData.toast, open: false } }
//             //     })
//             // }, 5000)
//             toast.success("Wow this is easy");
//         }
//         // this.state.formData.signup.password.value === "" && this.setState({
//         //     formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: true } } }
//         // });
//         //for the magical colors..
//         // this.state.formData.signup.password.value !== "" && this.setState({
//         //     formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, } } } }
//         // })
//     }
//     togglePassword(e: React.MouseEvent<HTMLSpanElement>): void {
//         this.setState({
//             formData: { ...this.state.formData, login: { ...this.state.formData.login, password: { ...this.state.formData.login.password, visible: !this.state.formData.login.password?.visible, value: this.state.formData.login.password?.value || "", error: this.state.formData.login.password?.error || false, type: this.state.formData.login.password?.type || "" } } }
//         })
//     }
//     handleWorkEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         //   console.log("event",e.target.value);
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
//         // console.log(e.target.value);
//         let numbers = /^[0-9]+$/;
//         // let stringified = e.target.value.toString();
//         // let expression = new RegExp("((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{6,18}\w)");
//         // let universalRegex = /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/;
//         if (e.target.value.toString().length === 0) {
//             this.setState({
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, phone: { ...this.state.formData.signup.phone, value: "", error: true } } }
//             })
//         }
//         else
//             numbers.test(e.target.value) && e.currentTarget.value.toString().length <= 15 && this.setState({
//                 formData: { ...this.state.formData, signup: { ...this.state.formData.signup, phone: { ...this.state.formData.signup.phone, value: e.target.value, error: false } } }
//             });
//         // if (stringified.length > 10) {
//         //     stringified = stringified.slice(0, 10);
//         //     this.setState({
//         //         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, phone: { ...this.state.formData.signup.phone, value: e.target.value } } }
//         //     });
//         //     console.log(expression.test(e.target.value));
//         // }

import Login from "./Login"

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
//         // console.log("Inside the function call", this.state.formData.signup.password.value);
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
//             // if (e.target.value.length > 0) {
//             // let passwordArray: any = [];Q
//             if (e.currentTarget.value.length === 1) {
//                 this.state.passwordArray.push(e.currentTarget.value[0]);
//                 passArray.push(e.currentTarget.value[0]);
//             }
//             // else {
//             //     // passArray = this.state.passwordArray;
//             //     if (e.key === "Backspace") {
//             //         // passArray = [];
//             //         // passArray = Array.from(e.currentTarget.value);
//             //         this.setState({
//             //             passwordArray: Array.from(e.currentTarget.value)
//             //         })
//             //     }
//             //     else {
//             //         passArray.push(e.currentTarget.value[e.currentTarget.value.length - 1]);
//             //         this.state.passwordArray.push(e.currentTarget.value[e.currentTarget.value.length - 1]);
//             //     }
//             // }
//             let upperCase = e.currentTarget.value.length === 1 ? e.currentTarget.value[0].toUpperCase() : e.currentTarget.value[e.currentTarget.value.length - 1].toUpperCase();
//             let lowerCase = e.currentTarget.value.length === 1 ? e.currentTarget.value[0].toLowerCase() : e.currentTarget.value[e.currentTarget.value.length - 1].toLowerCase();
//             let isUpperCased = e.currentTarget.value.length === 1 ? e.currentTarget.value[0] === upperCase : e.currentTarget.value[e.currentTarget.value.length - 1] === upperCase;
//             let isLowerCased = e.currentTarget.value.length === 1 ? e.currentTarget.value[0] === lowerCase : e.currentTarget.value[e.currentTarget.value.length - 1] === lowerCase;
//             // let numberedInout = numbers.test(e.currentTarget.value);
//             // console.log(numberedInout);
//             // let isNumbered = Array.from(e.currentTarget.value).some((keySome, indexSome) => !Number.isNaN(keySome));
//             let isNumbered = Array.from(e.currentTarget.value).some((keySome, index) => /^[+-]?\d+(\.\d+)?$/.test(keySome));
//             // console.log(isNumbered)
//             // if (e.target.value.length < 8 || e.target.value.length > 20) {
//             //     console.log("inside the length lesst than 8")
//             //     this.setState({
//             //         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, length: true } } } }
//             //     });
//             // }
//             // if (e.target.value.length >= 8 || e.target.value.length <= 20)
//             //     this.setState({
//             //         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, length: false } } } }
//             //     });
//             if (!isLowerCased) {
//                 // console.log("inside lowercase");
//                 // console.log(this.state.passwordArray);
//                 if (length < 8) {
//                     alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
//                     alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
//                     // console.log("already Lower Case", alreadyLowerCase, "numeric", isNumbered, "for wrong length");
//                     !alreadyLowerCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, length: true, numeric: true, upperCase: false } } } }
//                     });
//                     alreadyLowerCase && isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, numeric: false, upperCase: false, length: true } } } }
//                     });
//                     // alreadyUpperCase && this.setState({
//                     //     formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, length: true } } } }
//                     // }); 
//                     // !alreadyUpperCase && 
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
//                     // console.log("lower positive", alreadyLowerCase, "already Upper case", alreadyUpperCase);
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
//                     // !alreadyUpperCase && this.setState({
//                     //     formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, length: false } } } }
//                     // });
//                     // alreadyUpperCase && this.setState({
//                     //     formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, length: false } } } }
//                     // });
//                 }
//             }
//             if (!isUpperCased) {

//                 if (length < 8 || length > 20) {
//                     alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
//                     alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
//                     // console.log("already upper case", alreadyUpperCase, "numeric",isNumbered, "for wrong length");
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
//                     // alreadyLowerCase && this.setState({
//                     //     formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, length: true } } } }
//                     // });
//                     // !alreadyLowerCase && this.setState({
//                     //     formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, length: true } } } }
//                     // });
//                 }
//                 if (length >= 8 && length <= 20) {
//                     // console.log("inside uppercased", passArray);
//                     alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
//                     alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
//                     // console.log("upper positive", alreadyUpperCase, "for right length");
//                     !alreadyUpperCase && !isNumbered && this.setState({
//                         formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, numeric: true, lowerCase: false, length: false } } } }
//                     });
//                     // alreadyLowerCase && alreadyUpperCase && this.setState({
//                     //     formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, length: false } } } }
//                     // });
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
//                     // console.log("Inside the wrong length");
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
//             // }
//         }
//         // this.setState({
//         //     formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, value: e.currentTarget.value } } }
//         // });
//         password = e.currentTarget.value
//         // console.log(password);
//     }
//     componentDidUpdate(previousProps: Readonly<{}>, previousState: Readonly<any>): void {
//         // console.log(previousState.formData.toast.open, this.state.formData.toast.open);
//         // Array.from(this.state.countryList[0].flag).forEach((key: string, index: number) => {
//         //     console.log(key.toLowerCase());
//         // });
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
//         // console.log("event target", e);
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
//                 // str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
//                 //     return letter.toUpperCase();
//                 // });
//                 str = str[0].toUpperCase() + str.slice(1);
//                 filteredList = countryList.filter((key, index) => {
//                     // key.name.includes(e.currentTarget.value);
//                     let regexCapital = /[A-Z]/;
//                     return key.name.includes(str) || key.name.includes(e.currentTarget.value);
//                 });
//             }
//             else
//                 if (str.length === 1) {
//                     filteredList = countryList.filter(key => key.name.includes(str));
//                 }
//                 else filteredList = countryList;
//             // alert(str);
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
//         // let regexExpression:RegExp = new RegExp("/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
//         if (e.target.value !== "") {
//             let regexExpression: RegExp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
//             let pass: boolean = regexExpression.test(e.target.value);
//             // console.log(passed);
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
//         // console.log(e.currentTarget.value);
//         if (e.currentTarget.value !== "")
//             this.setState({
//                 formSubmitted: false,
//                 formData: { ...this.state.formData, login: { ...this.state.formData.login, password: { ...this.state.formData.login.password, value: e.currentTarget.value, error: false, visible: this.state.formData.login.password?.visible || false, type: this.state.formData.login.password?.type || "password" } } }
//             })
//         else if (e.currentTarget.value === "")
//             this.setState({
//                 formData: { ...this.state.formData, login: { ...this.state.formData.login, password: { ...this.state.formData.login.password, error: true, value: "", visible: this.state.formData.login.password?.visible || false, type: this.state.formData.login.password?.type || "" } } },
//                 formSubmitted: false
//             })
//     }
//     // closetoast(e: React.MouseEvent, timeout: ReturnType<typeof setTimeout>): void {
//     //     clearTimeout(timeout);
//     //     this.setState({
//     //         formData: { ...this.state.formData, toast: { ...this.state.formData.toast, open: false } }
//     //     })
//     // }
//     submitLogin(e: React.FormEvent<HTMLFormElement>): void {
//         // console.log("fccsdc");
//         e.preventDefault();
//         if (!this.state.formData.login.email.emptyError && !this.state.formData.login.email.error && this.state.formData.login.email.validEmail && !this.state.formData.login?.password?.error && this.state.formData.login.password?.value !== "" && this.state.formData.login.email.value !== "") {
//             this.setState({
//                 loader: true
//             })
//             fetch("/api/login", {
//                 method: "POST", body: JSON.stringify({
//                     email: this.state.formData.login.email.value,
//                     password: this.state.formData.login.password?.value
//                 })
//             })
//             .then(response => response.json()).then(response => {
//                 // console.log("Response",response);
//                 // localStorage.setItem("user", JSON.stringify({ email: response.findedResult.email, password: response.findedResult.password }))
//                 this.setState({
//                     loader: false,
//                     formData: { ...this.state.formData, login: { ...this.state.formData.login, email: { ...this.state.formData.login.email, value: "", error: null, emptyError: null, validEmail: null }, password: { ...this.state.formData.login.password, value: "", error: false, visible: false, type: "passwod" } } }
//                 })
//                 if (response.statusCode === 200) {
//                     toast.success(`${response.message}`, {
//                         position: "top-right",
//                         autoClose: 2500,
//                         theme: "dark",
//                         draggable: false,
//                     });
//                     // redirect("/");
//                 }
//                 else if (response.statusCode === 404) {
//                     this.setState({
//                         loader: false
//                     })
//                     toast.error(`${response.message}`, {
//                         position: "top-right",
//                         draggable: false,
//                         theme: "light",
//                         autoClose: 2500
//                     })
//                 }
//             }).catch(er => {
//                 toast.error("Something went wrong", {
//                     position: "top-right",
//                     autoClose: 2500,
//                     theme: "colored",
//                     draggable: false
//                 });
//                 console.log("ERROR", er);
//             });
//         }
//         else {
//             this.setState({
//                 formData: { ...this.state.formData, login: { ...this.state.formData.login, password: { ...this.state.formData.login.password, error: true, value: "", visible: false, type: "password" }, email: { ...this.state.formData.login.email, value: "", emptyError: true, error: null, validEmail: null } } }
//             })
//         }
//         // console.log(this.state.formData.login.email.value, this.state.formData.signup.password,this.state.formData.login.password?.value);
//     }
//     render(): JSX.Element {
//         return (
//             <>
//                 {this.state.loader ? <Loader /> :
//                     <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.submitLogin(e)}>
//                         <Container className="main-container" fluid style={{ height: "100vh" }}>
//                             <Row className="d-flex justify-content-center align-items-center h-100 p-2 pt-5">
//                                 <Col className="signup-container h-100 d-flex flex-column justify-content-evenly align-items-center gap-3" xs={6}>
//                                     <div className="logo d-flex justify-content-center">
//                                         <img className="rounded-4 penguin" width={80} height={80} src="/unnamed.png" />
//                                     </div>
//                                     <div className="head-text text-center my-1">
//                                         <Typography className="head-text" variant={"h4"}>
//                                             {/* Set up a FREE Account */}
//                                             Welcome Back to Botpenguin !
//                                         </Typography>
//                                     </div>
//                                     {/** as a part of the sign up page template */}
//                                     {/* <div className="checkboxes d-flex justify-content-evenly w-75">
//                                                 <div className="paytm d-flex align-items-center" style={{       gap: "6.8px" }}>
//                                                     <span className="fw-bold material-icons" style={{ backgroundColor: "#d0f0d2", padding: "1px", fontSize: "21.5px", borderRadius: "6px", color: "#3da144" }}>
//                                                         done
//                                                     </span>
//                                                     <Typography sx={{ fontSize: "14px", color: "#747474", paddingTop: "2px", fontFamily: "Matter Regular", }}>
//                                                         No credit card required
//                                                     </Typography>
//                                                 </div>
//                                                 <div className="googlepay d-flex align-items-center" style={{ gap: "6.8px" }}>
//                                                     <span className="fw-bold material-icons" style={{ backgroundColor: "#d0f0d2", padding: "1px", fontSize: "22px", borderRadius: "6px", color: "#3da144" }}>
//                                                         done
//                                                     </span>
//                                                     <Typography sx={{ fontSize: "13px", fontFamily: "Matter Regular", paddingTop: "2px", color: "#747474" }}>
//                                                         Cancel Anytime
//                                                     </Typography>
//                                                 </div>
//                                             </div> */}
//                                     {/* Similar pattern for the login approach */}
//                                     <div className="button-container d-flex w-75 gap-4">
//                                         <button className="label-button-facebook w-50 d-flex gap-2 align-items-center">
//                                             <span>
//                                                 <FaFacebook color="#226cf4" size={30} />
//                                             </span>
//                                             <span className="positive-text">
//                                                 Log in with Facebook
//                                             </span>
//                                         </button>
//                                         <button className="label-button-google d-flex gap-2 align-items-center w-50">
//                                             <span className="">
//                                                 <i className="fab fa-google"></i>
//                                             </span>
//                                             <span className="google-text">
//                                                 Log in with Google
//                                             </span>
//                                         </button>
//                                     </div>
//                                     <div className="marginal-block d-flex w-75 justify-content-center align-items-center my-4 mb-3 gap-3">
//                                         <div className="border border-top-0 border-start-0 w-50 border-end-0 border-bottom-1" style={{ border: "#bebebe" }}>
//                                             {/* EMPTY TEXT */}
//                                         </div>
//                                         <div>
//                                             <span className="" style={{ color: "#bebebe" }}>OR</span>
//                                         </div>
//                                         <div className="border border-top-0 border-start-0 w-50 border-end-0 border-bottom-1" style={{ border: "#bebebe" }}>
//                                             {/* EMPTY TEXT */}
//                                         </div>
//                                     </div>
//                                     <div className="input-container d-flex flex-column w-75 gap-4 align-items-center position-relative">
//                                         <div className="work-email w-100 justify-content-center d-flex">
//                                             <input className="w-100 border border-muted py-3 ps-3 rounded-1" placeholder="Work Email*" value={this.state.formData.login.email.value} onChange={this.handleLoginEmailChange} />
//                                         </div>
//                                         {!this.state.formData.login.email.validEmail && this.state.formData.login.email.validEmail !== null && <Typography position={"absolute"} className=""
//                                             fontSize={"12px"} top={"62px"} left={"15px"} color={"red"}>
//                                             Email Should be valid*
//                                         </Typography>}
//                                         {this.state.formData.login.email.emptyError && <Typography className="" fontSize={"12px"} color={"red"} position={"absolute"} top={"62px"} left={"15px"}>
//                                             Email is required*
//                                         </Typography>}
//                                         {this.state.formData.login.email.validEmail && <Typography className="" fontSize={"12.6px"} position={"absolute"} top={"62px"} left={"15px"} color={"green"}>
//                                             Email is valid*
//                                         </Typography>}
//                                         {/*As a part of the signup process*/}
//                                         {/* <div style={{ cursor: "pointer" }} className="phone position-relative d-flex justify-content-center w-100">
//                                             <div onClick={(e) => this.toggleCountryBox()} className="default-mulk gap-1 px-2 rounded-start-1 rounded-end-0 border border-muted border-start-1 border-top-1 border-bottom-1 border-end-0 d-flex align-items-center phone-container">
//                                                 <img className="" width={25} height={25} src={`https://flagcdn.com/48x36/${this.state.flag}.png`} />
//                                                 <Typography className="text-muted" variant={"subtitle2"}>{this.state.dial_code}</Typography>
//                                                 <IoMdArrowDropdown cursor={"pointer"} />
//                                             </div>
//                                             <div className={this.state.toggleBox ? "country-list w-100 position-absolute d-block" : "country-list position-absolute w-100 d-none"}>
//                                                 <div className="search-country w-100 position-relative rounded-top-2 border border-muted border-top-1 border-start-1 border-end-1 border-bottom-0">
//                                                     <CustomInput className="w-100 bg-light rounded--top-2 rounded-bottom-0" placeholder="Search Country" />
//                                                     <span className="material-icons text-muted position-absolute" style={{ top: "10px", right: "10px" }}>search</span>
//                                                 </div>
//                                                 <ul className="country-list border border-1-muted border-top-0" style={{ listStyle: "none", overflow: "auto", height: "140px", paddingLeft: "10px" }}>
//                                                     {countryList.map((key, index) => <li className="country-name my-1 px-1 py-2 d-flex gap-1 align-items-center" key={index}>
//                                                         <span>
//                                                             <img className="" width={25} height={25} src={`https://flagcdn.com/48x36/${key.flag}.png`} />
//                                                         </span>
//                                                         <Typography className="text-muted">
//                                                             {key.name}
//                                                         </Typography>
//                                                         <Typography className="text-muted">
//                                                             ({key.dial_code})
//                                                         </Typography>
//                                                     </li>)}
//                                                 </ul>
//                                             </div>
//                                             <input className="w-100 border border-muted border-start-0 py-3 ps-3 rounded-start-0 rounded-end-1" placeholder="Phone*" type="text" />
//                                         </div> */}
//                                         <div className="d-flex justify-content-center w-100 position-relative">
//                                             <input className="w-100 border border-muted py-3 ps-3 rounded-1" type={this.state.formData.login.password?.visible ?"text":"password"} value={this.state.formData.login.password?.value} placeholder="Password*" onChange={this.handleLoginPasswordChange} />
//                                             {/* <Tooltip title={"Show Password"}> */}
//                                             {
//                                                 this.state.formData.login.password?.visible &&
//                                             <span className="eye material-icons position-absolute cursor-pointer" onClick={this.togglePassword}>visibility</span>
//     }
//                                             {/* </Tooltip> */}
//                                             {/* <Tooltip title={"Hide Password"}> */}
//                                             {!this.state.formData.login.password?.visible &&
//                                             <span className="eye material-icons position-absolute cursor-pointer" onClick={this.togglePassword}> visibility_off</span>
//                 }
//                                             {/* </Tooltip> */}

//                                             <Typography position={"absolute"} top={"62px"} left={"15px"} color={"red"} fontSize={"12.6px"} display={this.state.formData.login.password?.error ? "block" : "none"}>Password is required*</Typography>
//                                         </div>
//                                         <div className="d-flex justify-content-between w-100">
//                                             <div className="d-flex align-items-center gap-1">
//                                                 <input className="" type="checkbox" style={{ accentColor: "#227cf6" }} />
//                                                 <span className="remember-choice">
//                                                     Remember Me
//                                                 </span>
//                                             </div>
//                                             <div className="">
//                                                 <button type={"button"} className="forgot-password bg-transparent border-0 px-0" onClick={(e) =>
//                                                     this.setState({
//                                                         forgotPassword: true,
//                                                         signUp: false
//                                                     })
//                                                 }>
//                                                     Forgot Password?
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="signbutton-container w-75">
//                                         <button className="sign-up-button w-100 text-light" type="submit">
//                                             Log In
//                                         </button>
//                                     </div>
//                                     <div className="signup-required">
//                                         <span className="no-account">
//                                             Don't have an account?
//                                         </span>
//                                         <Link className="bg-transparent text-decoration-nones signup px-0 border-0" href={"/authentication/signup"} onClick={
//                                             () => this.setState({
//                                                 signUp: true
//                                             })
//                                         }>
//                                             Sign Up
//                                         </Link>
//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Container>
//                     </Form>
//                 }
//             </>
//         )
//     }
// }
// export default Login;
import { useRouter } from "next/router";
import Head from "next/head";
const LoginF: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          Codeswear - Login
        </title>
      </Head>
      <Login router={router} />
    </>
  )
}
export default LoginF;