import React from "react";
import { Container, Row, Col, Form } from "reactstrap";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import countryList from "../../countries/countries.json";
import { ToastContainer, toast } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";
import { FaFacebook } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Loader from "@/components/loader";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextRouter } from "next/router";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
type FormInputs = {
    forgotPassword: {
        error: boolean;
        value: string;
    };
    login: {
        email: {
            value: string;
            error: null | boolean;
            emptyError: null | boolean;
            validEmail: null | boolean
        },
        password?: {
            value: string,
            error: boolean,
            visible: boolean;
            type: string;
        }
    },
    signup: {
        email: {
            error: boolean,
            value: string
        },
        phone: {
            error: boolean,
            value: number | string;
        },
        password: {
            value: string,
            error: boolean,
            errorVariantion: {
                upperCase: boolean;
                lowerCase: boolean;
                numeric: boolean;
                special: boolean;
                length: boolean
            }
        }
    },
    toast: {
        message: string;
        open: boolean;
    }
}
type ICountryDetails = {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
}
let password: any = "";
class Login extends React.Component<{ router: NextRouter }, { name: string; flag: string; dial_code: string; code: string, toggleBox: boolean, signUp: boolean, countryList: { name: string, dial_code: string, code: string, flag: string }[], forgotPassword: boolean, formData: FormInputs, passwordArray: any[]; eyeVisible: boolean; loader: boolean; formSubmitted: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "India",
            dial_code: "+91",
            flag: "in",
            code: "IN",
            toggleBox: false,
            signUp: true,
            countryList: [],
            forgotPassword: false,
            formData: {
                forgotPassword: {
                    error: false,
                    value: ""
                },
                login: {
                    email: {
                        value: "",
                        error: null,
                        emptyError: null,
                        validEmail: null
                    },
                    password: {
                        error: false,
                        value: "",
                        visible: false,
                        type: "password"
                    }
                },
                signup: {
                    email: {
                        value: "",
                        error: false
                    },
                    phone: {
                        value: "",
                        error: false
                    },
                    password: {
                        value: "",
                        error: false,
                        errorVariantion: {
                            upperCase: false,
                            lowerCase: false,
                            numeric: false,
                            special: false,
                            length: false
                        }
                    }
                },
                toast: {
                    message: "",
                    open: false
                },
            }, passwordArray: [],
            eyeVisible: true, loader: false,
            formSubmitted: false
        }
        this.submitUser = this.submitUser.bind(this);
        this.toggleCountryBox = this.toggleCountryBox.bind(this);
        this.passwordReset = this.passwordReset.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleWorkEmailChange = this.handleWorkEmailChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.updateCountryCode = this.updateCountryCode.bind(this);
        this.searchFlag = this.searchFlag.bind(this);
        this.handleLoginEmailChange = this.handleLoginEmailChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
        this.togglePassword = this.togglePassword.bind(this);

    }
    componentDidMount(): void {
        require("bootstrap/dist/js/bootstrap.bundle.js");
        this.setState({
            countryList: countryList.map((key, index) => {
                return {
                    name: key.name,
                    dial_code: key.dial_code,
                    flag: key.code.toLowerCase(),
                    code: key.code
                }
            })
        });
    }
    toggleCountryBox(): void {
        this.setState({
            toggleBox: !this.state.toggleBox
        })
    }
    passwordReset(e: React.FormEvent<HTMLFormElement>): void {
        if (this.state.formData.forgotPassword.value === "") {
            e.preventDefault();
            this.setState({
                formData: { ...this.state.formData, forgotPassword: { ...this.state.formData.forgotPassword, error: true } }
            });

        }
        else {
            console.log("Password Reset", e.preventDefault());

        }
    }
    handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {

        this.setState({
            formData: { ...this.state.formData, forgotPassword: { ...this.state.formData.forgotPassword, value: e.target.value } }
        });
    }
    //for the signup process//
    submitUser(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (this.state.formData.signup.email.value === "" && this.state.formData.signup.password.value === "")
            this.setState({
                formData: { ...this.state.formData, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, error: true }, password: { ...this.state.formData.signup.password, error: true }, phone: { ...this.state.formData.signup.phone, error: true } } }
            });
        else if (!this.state.formData.signup.email.error && !this.state.formData.signup.password.error && !this.state.formData.signup.phone.error) {

            this.setState({
                loader: true
            });

            fetch("/api/signup", { method: "POST", body: JSON.stringify({ email: this.state.formData.signup.email.value, phone: this.state.formData.signup.phone.value, password: password }) }).then(response => response.json()).then(response => {
                this.setState({
                    formData: { ...this.state.formData, toast: { ...this.state.formData.toast, message: response.message, open: true }, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, value: "" }, password: { ...this.state.formData.signup.password, value: "" }, phone: { ...this.state.formData.signup.phone, value: "" } } },
                    loader: false
                });
                toast.success("Signed Up Successfully", {
                    position: "top-right",
                    autoClose: 4000,
                    draggable: false,
                    theme: "dark"
                })
            });
            toast.success("Wow this is easy");
        }
    }
    togglePassword(e: React.MouseEvent<HTMLSpanElement>): void {
        this.setState({
            formData: { ...this.state.formData, login: { ...this.state.formData.login, password: { ...this.state.formData.login.password, visible: !this.state.formData.login.password?.visible, value: this.state.formData.login.password?.value || "", error: this.state.formData.login.password?.error || false, type: this.state.formData.login.password?.type || "" } } }
        })
    }
    handleWorkEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.value === "") {
            this.setState({
                formData: { ...this.state.formData, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, error: true, value: e.currentTarget.value } } }
            })
        }
        else {
            this.setState({
                formData: { ...this.state.formData, signup: { ...this.state.formData.signup, email: { ...this.state.formData.signup.email, error: false, value: e.target.value } } }
            })
        }
    }
    handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let numbers = /^[0-9]+$/;

        if (e.target.value.toString().length === 0) {
            this.setState({
                formData: { ...this.state.formData, signup: { ...this.state.formData.signup, phone: { ...this.state.formData.signup.phone, value: "", error: true } } }
            })
        }
        else
            numbers.test(e.target.value) && e.currentTarget.value.toString().length <= 15 && this.setState({
                formData: { ...this.state.formData, signup: { ...this.state.formData.signup, phone: { ...this.state.formData.signup.phone, value: e.target.value, error: false } } }
            });

    }
    handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
        let expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let upperCaseRegexp = /[A-Z]/;
        let lowerCaseRegexp = /[a-z]/;
        let numbers = /^[0-9]+$/;
        let alreadyUpperCase = false;
        let alreadyLowerCase = false;
        this.setState({
            formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, value: e.currentTarget.value } } }
        });

        if (e.currentTarget.value.length === 0) {
            this.setState({
                passwordArray: [],
                formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: true, value: e.currentTarget.value, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, upperCase: false, numeric: false, special: false, length: false } } } }
            });
        }
        else {
            let length = e.currentTarget.value.length;
            let passArray: string[] = [];
            this.setState({
                formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, value: e.currentTarget.value } } }
            })
            if (e.currentTarget.value.length === 1) {
                this.state.passwordArray.push(e.currentTarget.value[0]);
                passArray.push(e.currentTarget.value[0]);
            }

            let upperCase = e.currentTarget.value.length === 1 ? e.currentTarget.value[0].toUpperCase() : e.currentTarget.value[e.currentTarget.value.length - 1].toUpperCase();
            let lowerCase = e.currentTarget.value.length === 1 ? e.currentTarget.value[0].toLowerCase() : e.currentTarget.value[e.currentTarget.value.length - 1].toLowerCase();
            let isUpperCased = e.currentTarget.value.length === 1 ? e.currentTarget.value[0] === upperCase : e.currentTarget.value[e.currentTarget.value.length - 1] === upperCase;
            let isLowerCased = e.currentTarget.value.length === 1 ? e.currentTarget.value[0] === lowerCase : e.currentTarget.value[e.currentTarget.value.length - 1] === lowerCase;

            let isNumbered = Array.from(e.currentTarget.value).some((keySome, index) => /^[+-]?\d+(\.\d+)?$/.test(keySome));

            if (!isLowerCased) {

                if (length < 8) {
                    alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
                    alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));

                    !alreadyLowerCase && !isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, length: true, numeric: true, upperCase: false } } } }
                    });
                    alreadyLowerCase && isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, numeric: false, upperCase: false, length: true } } } }
                    });

                    alreadyLowerCase && !isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, numeric: true, upperCase: false, length: true } } } }
                    });
                    !alreadyLowerCase && isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, length: true, numeric: false, upperCase: false } } } }
                    });

                }
                if (length >= 8 && length <= 20) {
                    alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
                    alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));

                    !alreadyLowerCase && !isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, numeric: true, upperCase: false, length: false } } } }
                    });
                    !alreadyLowerCase && isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: true, numeric: false, upperCase: false, length: false } } } }
                    });
                    alreadyLowerCase && !isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, numeric: true, upperCase: false, length: false } } } }
                    });
                    alreadyLowerCase && isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, lowerCase: false, numeric: false, upperCase: false, length: false } } } }
                    });

                }
            }
            if (!isUpperCased) {

                if (length < 8 || length > 20) {
                    alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
                    alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));

                    !alreadyUpperCase && isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, numeric: true, lowerCase: false, length: true } } } }
                    });
                    alreadyUpperCase && !isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, numeric: true, lowerCase: false, length: true } } } }
                    });
                    alreadyUpperCase && isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, numeric: false, lowerCase: false, length: true } } } }
                    });

                    !alreadyUpperCase && !isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, numeric: true, lowerCase: false, length: true } } } }
                    });

                }
                if (length >= 8 && length <= 20) {

                    alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
                    alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));

                    !alreadyUpperCase && !isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, numeric: true, lowerCase: false, length: false } } } }
                    });

                    !alreadyUpperCase && isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: true, numeric: false, lowerCase: false, length: false } } } }
                    });
                    alreadyUpperCase && !isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, numeric: true, lowerCase: false, length: false } } } }
                    });
                    alreadyUpperCase && isNumbered && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, numeric: false, lowerCase: false, length: false } } } }
                    });
                }
            }
            if (isNumbered) {
                if (length < 8 || length > 20) {

                    alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
                    alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
                    !alreadyLowerCase && !alreadyUpperCase && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, numeric: false, lowerCase: true, upperCase: true, length: true } } } }
                    });
                    alreadyLowerCase && !alreadyUpperCase && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, numeric: false, lowerCase: false, upperCase: true, length: true } } } }
                    });
                    !alreadyLowerCase && alreadyUpperCase && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, lowerCase: true, length: true, numeric: false } } } }
                    })
                    alreadyLowerCase && alreadyUpperCase && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, error: false, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, lowerCase: false, length: true, numeric: false } } } }
                    })
                }
                if (length >= 8 && length <= 20) {
                    alreadyUpperCase = Array.from(e.currentTarget.value).some((key: any) => upperCaseRegexp.test(key));
                    alreadyLowerCase = Array.from(e.currentTarget.value).some((key: any) => lowerCaseRegexp.test(key));
                    !alreadyLowerCase && !alreadyUpperCase && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, numeric: false, lowerCase: true, upperCase: true, length: false } } } }
                    });
                    alreadyLowerCase && !alreadyUpperCase && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, numeric: false, lowerCase: false, upperCase: true, length: false } } } }
                    });
                    !alreadyLowerCase && alreadyUpperCase && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, lowerCase: true, length: false, numeric: false } } } }
                    })
                    alreadyLowerCase && alreadyUpperCase && this.setState({
                        formData: { ...this.state.formData, signup: { ...this.state.formData.signup, password: { ...this.state.formData.signup.password, errorVariantion: { ...this.state.formData.signup.password.errorVariantion, upperCase: false, lowerCase: false, length: false, numeric: false } } } }
                    })
                }
            }

        }

        password = e.currentTarget.value

    }
    componentDidUpdate(previousProps: Readonly<{}>, previousState: Readonly<any>): void {

    }
    updateCountryCode(e: React.MouseEvent<HTMLLIElement>, contactDetails: { name: string; dial_code: string; flag: string; code: string }): void {
        this.setState({
            dial_code: contactDetails.dial_code,
            name: contactDetails.name,
            flag: contactDetails.flag,
            code: contactDetails.code,
            toggleBox: !this.state.toggleBox
        });
    }
    searchFlag(e: React.KeyboardEvent<HTMLInputElement>): void {

        if (e.currentTarget.value === "") {
            this.setState({
                countryList: countryList.map((key, index) => {
                    return {
                        name: key.name,
                        flag: key.code.toLowerCase(),
                        code: key.code,
                        dial_code: key.dial_code
                    }
                })
            })
        }
        else {
            let str = e.currentTarget.value;
            let filteredList: any[] = [];
            if (str.length > 1) {

                str = str[0].toUpperCase() + str.slice(1);
                filteredList = countryList.filter((key, index) => {

                    let regexCapital = /[A-Z]/;
                    return key.name.includes(str) || key.name.includes(e.currentTarget.value);
                });
            }
            else
                if (str.length === 1) {
                    filteredList = countryList.filter(key => key.name.includes(str));
                }
                else filteredList = countryList;

            this.setState({
                countryList: filteredList.map((key, index) => {
                    return {
                        name: key.name,
                        flag: key.code.toLowerCase(),
                        code: key.code,
                        dial_code: key.dial_code
                    }
                })
            })
        }
    }
    handleLoginEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {

        if (e.target.value !== "") {
            let regexExpression: RegExp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
            let pass: boolean = regexExpression.test(e.target.value);

            this.setState({
                formData: { ...this.state.formData, login: { ...this.state.formData.login, email: { ...this.state.formData.login.email, value: e.target.value, error: !pass, validEmail: pass, emptyError: false } } }
            })
        }
        else if (e.target.value === "") {
            this.setState({
                formData: { ...this.state.formData, login: { ...this.state.formData.login, email: { ...this.state.formData.login.email, value: e.target.value, emptyError: true, error: false, validEmail: null } } }
            })
        }
    }
    handleLoginPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {

        if (e.currentTarget.value !== "")
            this.setState({
                formSubmitted: false,
                formData: { ...this.state.formData, login: { ...this.state.formData.login, password: { ...this.state.formData.login.password, value: e.currentTarget.value, error: false, visible: this.state.formData.login.password?.visible || false, type: this.state.formData.login.password?.type || "password" } } }
            })
        else if (e.currentTarget.value === "")
            this.setState({
                formData: { ...this.state.formData, login: { ...this.state.formData.login, password: { ...this.state.formData.login.password, error: true, value: "", visible: this.state.formData.login.password?.visible || false, type: this.state.formData.login.password?.type || "" } } },
                formSubmitted: false
            })
    }

    submitLogin(e: React.FormEvent<HTMLFormElement>): void {

        e.preventDefault();
        if (!this.state.formData.login.email.emptyError && !this.state.formData.login.email.error && this.state.formData.login.email.validEmail && !this.state.formData.login?.password?.error && this.state.formData.login.password?.value !== "" && this.state.formData.login.email.value !== "") {
            this.setState({
                loader: true
            })
            fetch("/api/login", {
                method: "POST", body: JSON.stringify({
                    email: this.state.formData.login.email.value,
                    password: this.state.formData.login.password?.value
                })
            })
                .then(response => response.json()).then(response => {
                    this.setState({
                        loader: false,
                        formData: { ...this.state.formData, login: { ...this.state.formData.login, email: { ...this.state.formData.login.email, value: "", error: null, emptyError: null, validEmail: null }, password: { ...this.state.formData.login.password, value: "", error: false, visible: false, type: "passwod" } } }
                    })
                    if (response.statusCode === 200) {
                        toast.success(`${response.message}`, {
                            position: "top-right",
                            autoClose: 2500,
                            theme: "dark",
                            draggable: false,
                        });
                        this.props.router.push("/")
                    }
                    else if (response.statusCode === 404) {
                        this.setState({
                            loader: false
                        })
                        toast.error(`${response.message}`, {
                            position: "top-right",
                            draggable: false,
                            theme: "light",
                            autoClose: 2500
                        })
                    }
                }).catch(er => {
                    toast.error("Something went wrong", {
                        position: "top-right",
                        autoClose: 2500,
                        theme: "colored",
                        draggable: false
                    });
                    console.log("ERROR", er);
                });
        }
        else {
            this.setState({
                formData: { ...this.state.formData, login: { ...this.state.formData.login, password: { ...this.state.formData.login.password, error: this.state.formData.login.email.value === "" ? true : false, value: this.state.formData.login.password?.value || "", visible: false, type: "password" }, email: { ...this.state.formData.login.email, value: this.state.formData.login.email.value, emptyError: this.state.formData.login.email.value === "" ? true : false, error: null } } }
            })
        }
    }
    render(): JSX.Element {
        return (
            <>
                {this.state.loader ? <Backdrop open> <CircularProgress sx={{ color: "#e41edc" }} size={100} /></Backdrop> :
                    <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.submitLogin(e)}>
                        <Container className="main-container" fluid style={{ height: "100vh" }}>
                            <Row className="d-flex justify-content-center align-items-center h-100 p-2 pt-5">
                                <Col className="signup-container h-100 d-flex flex-column justify-content-evenly align-items-center gap-3" xs={6}>
                                    <div className="logo d-flex justify-content-center">
                                        <img className="rounded-4 penguin" width={80} height={80} src="/unnamed.png" />
                                    </div>
                                    <div className="head-text text-center my-1">
                                        <Typography className="head-text" variant={"h4"}>
                                            {/* Set up a FREE Account */}
                                            Welcome Back to Botpenguin !
                                        </Typography>
                                    </div>

                                    <div className="button-container d-flex w-75 gap-4">
                                        <button className="label-button-facebook w-50 d-flex gap-2 align-items-center">
                                            <span>
                                                <FaFacebook color="#226cf4" size={30} />
                                            </span>
                                            <span className="positive-text">
                                                Log in with Facebook
                                            </span>
                                        </button>
                                        <button className="label-button-google d-flex gap-2 align-items-center w-50">
                                            <span className="">
                                                <i className="fab fa-google"></i>
                                            </span>
                                            <span className="google-text">
                                                Log in with Google
                                            </span>

                                        </button>
                                    </div>
                                    <div className="marginal-block d-flex w-75 justify-content-center align-items-center my-4 mb-3 gap-3">
                                        <div className="border border-top-0 border-start-0 w-50 border-end-0 border-bottom-1" style={{ border: "#bebebe" }}>

                                        </div>
                                        <div>
                                            <span className="" style={{ color: "#bebebe" }}>OR</span>
                                        </div>
                                        <div className="border border-top-0 border-start-0 w-50 border-end-0 border-bottom-1" style={{ border: "#bebebe" }}>

                                        </div>
                                    </div>
                                    <div className="input-container d-flex flex-column w-75 gap-4 align-items-center position-relative">
                                        <div className="work-email w-100 justify-content-center d-flex">
                                            <input className="w-100 border border-muted py-3 ps-3 rounded-1" placeholder="Work Email*" maxLength={50} value={this.state.formData.login.email.value} onChange={this.handleLoginEmailChange} />
                                        </div>
                                        {!this.state.formData.login.email.validEmail && this.state.formData.login.email.validEmail !== null && !this.state.formData.login.email.emptyError && <Typography position={"absolute"} className=""
                                            fontSize={"12px"} top={"62px"} left={"15px"} color={"red"}>
                                            Email Should be valid*
                                        </Typography>}
                                        {this.state.formData.login.email.emptyError && <Typography className="" fontSize={"12px"} color={"red"} position={"absolute"} top={"62px"} left={"15px"}>
                                            Email is required*
                                        </Typography>}
                                        {this.state.formData.login.email.validEmail && <Typography className="" fontSize={"12.6px"} position={"absolute"} top={"62px"} left={"15px"} color={"green"}>
                                            Email is valid*
                                        </Typography>}

                                        <div className="d-flex justify-content-center w-100 position-relative">
                                            <input className="w-100 border border-muted py-3 ps-3 rounded-1" type={this.state.formData.login.password?.visible ? "text" : "password"} value={this.state.formData.login.password?.value} placeholder="Password*" onChange={this.handleLoginPasswordChange} />

                                            {
                                                this.state.formData.login.password?.visible &&
                                                <span className="eye material-icons position-absolute cursor-pointer" onClick={this.togglePassword}>visibility</span>
                                            }

                                            {!this.state.formData.login.password?.visible &&
                                                <span className="eye material-icons position-absolute cursor-pointer" onClick={this.togglePassword}> visibility_off</span>
                                            }


                                            <Typography position={"absolute"} top={"62px"} left={"15px"} color={"red"} fontSize={"12.6px"} display={this.state.formData.login.password?.error ? "block" : "none"}>Password is required*</Typography>
                                        </div>
                                        <div className="d-flex justify-content-between w-100">
                                            <div className="d-flex align-items-center gap-1">
                                                <input className="" type="checkbox" style={{ accentColor: "#227cf6" }} />
                                                <span className="remember-choice">
                                                    Remember Me
                                                </span>
                                            </div>
                                            <div className="">
                                                <button type={"button"} className="forgot-password bg-transparent border-0 px-0" onClick={(e) =>
                                                    this.setState({
                                                        forgotPassword: true,
                                                        signUp: false
                                                    })
                                                }>
                                                    Forgot Password?
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="signbutton-container w-75">
                                        <button className="sign-up-button w-100 text-light" type="submit">
                                            Log In
                                        </button>
                                    </div>
                                    <div className="signup-required">
                                        <span className="no-account">
                                            Don't have an account?
                                        </span>
                                        <Link className="bg-transparent text-decoration-nones signup px-0 border-0" href={"/authentication/signup"} onClick={
                                            () => this.setState({
                                                signUp: true
                                            })
                                        }>
                                            Sign Up
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                }
            </>
        )
    }
}
export default Login;