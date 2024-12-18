import React from "react";
import { Form, Container, Row, Col } from 'reactstrap';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
import { } from "react-hook-form";
import { Backdrop, CircularProgress } from "@mui/material";
interface IForgotPassword {
    value: string;
    error: boolean;
    syntaxError: boolean;
    loader: boolean;
}
const ForgotPassword: React.FC = () => {
    let [forgotPassword, setForgotPassword] = useState<IForgotPassword>({
        value: "",
        error: false,
        syntaxError: false,
        loader: false
    });
    let router = useRouter();
    const submitEmailForPasswordReset: (e: React.FormEvent) => void = (e) => {
        e.preventDefault();
        if (!forgotPassword.error && !forgotPassword.syntaxError && forgotPassword.value !== "") {
            setForgotPassword({ ...forgotPassword, loader: true });
            fetch("/api/resetPassword").then(response => response.json()).then(resp => {
                toast.info(resp.message, {
                    position: "top-right",
                    theme: "colored",
                    autoClose: 2000,
                    draggable: false
                });
                setForgotPassword({ ...forgotPassword, value: "", error: false, syntaxError: false, loader: false });
            }).catch(er => console.log(er))
        }
        else {
            if (forgotPassword.error) {
                return;
            }
            else
                forgotPassword.value === "" && setForgotPassword({ ...forgotPassword, error: true, syntaxError: false, loader: false });
        }
    };
    const handleConfirmEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        if (e.currentTarget.value !== "") {

            let regexExp: RegExp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
            if (regexExp.test(e.currentTarget.value)) {
                setForgotPassword({ ...forgotPassword, value: e.currentTarget.value, error: false, syntaxError: false })
            }
            else if (!regexExp.test("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))
                setForgotPassword({ ...forgotPassword, value: e.currentTarget.value, syntaxError: true, error: false });
        }
        else {
            setForgotPassword({ ...forgotPassword, value: e.currentTarget.value, error: true, syntaxError: false })
        }
    }
    return (
        <>
            {
                forgotPassword.loader ? <Backdrop open sx={{ opacity: 0.2 }}>
                    <Typography className="" variant="h3">
                        Please wait for a while we are sending the email
                    </Typography>
                    <CircularProgress color={"error"} size={100} />
                </Backdrop> :
                    <>
                        <Head>
                            <title>
                                CodeSwear - Forgot Password!
                            </title>
                        </Head>
                        <Form onSubmit={submitEmailForPasswordReset}>
                            <Container className="main-container" fluid style={{ height: "100vh" }}>
                                <Row className="d-flex justify-content-center align-items-center h-100 p-2 pt-5">
                                    <Col className="signup-container h-100 d-flex flex-column justify-content-evenly align-items-center gap-2" xs={6}>
                                        <div className="logo d-flex justify-content-center">
                                            <img className="rounded-4 penguin" width={80} height={80} src="/unnamed.png" />
                                        </div>
                                        <div className="head-text text-center my-1">
                                            <Typography className="head-text" variant={"h4"}>
                                                Forgot Password?
                                                <Typography className="head-text">
                                                    No worried we will send you the password reset confirmation
                                                </Typography>
                                            </Typography>
                                        </div>
                                        <div className="input-container d-flex flex-column w-75 gap-4 align-items-center">
                                            <div className="work-email position-relative w-100 justify-content-center d-flex flex-column">
                                                <Typography className="h6">
                                                    Work Email  <span className="fs-5" style={{ color: "red" }}>*</span>
                                                </Typography>
                                                <input className="w-100 border border-muted py-3 ps-3 rounded-1" value={forgotPassword.value} onChange={handleConfirmEmailChange} style={{ backgroundColor: "#f1f3f4" }} placeholder="Work Email*" />
                                                <Typography className="position-absolute" display={forgotPassword.error ? "block" : "none"} color={"red"} fontSize={"12px"} bottom={"-20px"} left={"10px"}>
                                                    Work email is required so that we can send the password reset link to that email*
                                                </Typography>
                                                <Typography className="" display={forgotPassword.syntaxError ? "block" : "none"} color={"red"} fontSize={"12px"} position={"absolute"} bottom={"-20px"} left={"10px"}>
                                                    Work email should be valid*
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="signbutton-container w-75">
                                            <button className="sign-up-button w-100 text-light" type="submit">

                                                Continue
                                            </button>
                                        </div>
                                        <div className="signup-required d-flex align-items-center gap-2">
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="material-icons" style={{ color: "#226cf4" }}>
                                                    west
                                                </span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center">
                                                <button onClick={(e) => router.push({
                                                    pathname: "/authentication/login"
                                                })} className="bg-white border-0" style={{ fontSize: "20px", color: "#226cf4", padding: "0px" }}>
                                                    Back to Login
                                                </button>
                                                <div className="w-100">
                                                    <div className="px-2 border border-bottom-2 border-top-0 border-end-0 border-start-0 border-primary w-100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </>
            }
        </>
    )
}
export default ForgotPassword;