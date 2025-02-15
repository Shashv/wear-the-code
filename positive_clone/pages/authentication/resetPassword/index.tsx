import { TextField, Backdrop, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import LoaderAnimate from "@/components/loader";
import { useSearchParams } from "next/navigation";
const ResetPassword: NextPage = () => {
    const { control, handleSubmit } = useForm();
    const [loader, setLoader] = useState<boolean>(false);
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false
    });
    const passwordFields = [{
        name: "reset_password",
        positive: "Enter password"
    }, {
        name: "confirm_reset_password",
        positive: "Enter confirm password"
    }]
    const params = useSearchParams();
    const submitForm = async (data: FieldValues) => {
        setLoader((loaderState) => !loaderState);
        // let reset_password = data.reset_password;
        
        let response = await fetch("/api/updatePassword", {
            method: "POST",
            body: JSON.stringify({ email: params?.get("email") || "", password: data.password, confirmPassword: data.confirmPassword })
        });
        let parsedResponse = await response.json();
        // console.log("babaji", parsedResponse);
        if (parsedResponse) {
            setLoader((loaderState) => !loaderState);
            toast.warning(parsedResponse.message, {
                autoClose: 2000,
                theme: "colored"
            })
        }
    }
    return (
        <>
            {loader ? <Backdrop open><LoaderAnimate /></Backdrop> :
                <Container fluid className="bg-sky-500 h-[100vh]">

                    <Row className="flex justify-center align-center h-[80%]">
                        <Col xs={12} className="text-header flex justify-center align-center">
                            <Typography className="text-light my-auto" variant="h4">
                                Reset Password Form
                            </Typography>
                        </Col>
                        <Col md={12} className="flex justify-center">
                            <form className="w-[75%] bg-light gap-3 d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit(submitForm)}>
                                <div className="form-header text-center">
                                    <Typography className="text-sky-500" variant="h3">
                                        Forgot Password
                                    </Typography>
                                    <Typography className="text-sky-500" variant={"subtitle1"}>
                                        No worries you can reset your password below!
                                    </Typography>
                                </div>
                                <div className="email-holder position-relative w-100 flex flex-column gap-3 justify-center" style={{ alignItems: "center" }}>
                                    {passwordFields.map((fieldType: any, index) => <Controller key={index} name={fieldType.name} control={control} render={(props) => {
                                        const { field } = props;
                                        const { onChange, onBlur, name, ref } = field;
                                        return <TextField className="w-75 focus:outline-pink-500 active:bg-slate-400" value={field.value} placeholder={fieldType.positive} type={"text"} onChange={onChange} onBlur={onBlur} name={name} ref={ref} />
                                    }} />)}

                                </div>
                                <div className="form-submit flex justify-center">
                                    <button className="bg-sky-500 text-light focus:outline-sky-500 hover:bg-sky-600 active:bg-pink-400 p-2 rounded-2" type="submit">
                                        Send Link
                                    </button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}
export default ResetPassword;