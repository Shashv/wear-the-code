import React, { useEffect } from "react";
import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
// import styles from "./index.module.css";
import { Form, Label } from "reactstrap";
import { IRegisterOptions } from '../../modals/index';
import { FieldValues, useForm, Controller } from "react-hook-form";
import { Container, Col, Row } from "reactstrap";
// import Cart from "../../components/cart";
import style from "./index.module.css";
import CustomDrawer from "../../components/cart";
import { useDispatch } from "react-redux";
import addProduct from "@/redux/actions/addProduct";
import removeProduct from "@/redux/actions/removeProduct";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import authorizeOptions from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
const Checkout: React.FC = () => {
    let { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, setError, clearErrors, control } = useForm<IRegisterOptions>();
    var session = useSession();
    let dispatch = useDispatch();
    const theme = useSelector((state: IState) => state.toggletheme);
    let details = (data: FieldValues | IRegisterOptions) => {
        // console.log("Data", data);
        if (data) {
            toast.success("Details saved successfully", {
                theme: theme.light ? "light" : "dark",
                autoClose: 1000,
                position: "top-center"
            });
        }
    }
    const routerDetails = useRouter();
    useEffect(() => {
        if (session.status === "unauthenticated") {
            routerDetails.replace("/authentication/login")
        }
    }, [session]);
    const formGroups: Array<{ label: string; type: string; placeholder: string; name: any }> = [{
        label: 'Name',
        type: "text",
        placeholder: "Name",
        name: "user_name"
    }, {
        type: "email",
        label: "Email",
        placeholder: "Enter email",
        name: "user_email"
    }, {
        type: "text",
        label: "Address",
        placeholder: "Enter address",
        name: "user_address"
    }, {
        type: "number",
        label: "Contact Number",
        placeholder: "Enter 10 digit contact number",
        name: "user_contact"
    }, {
        type: "number",
        label: "City Pin",
        placeholder: "Enter city pin",
        name: "user_city_pin"
    }, {
        type: "text",
        label: "State ",
        placeholder: "Enter state pin code",
        name: "user_state"
    }, {
        type: "text",
        label: "City",
        placeholder: "Enter city",
        name: "user_city"
    }];
    // const loadStripeintent = await loadStripe(process.env.STRIPE_PUBLIC_POSITIVE || "");
    return (
        <>
            <Box component={"div"} className={theme.light ? `bg-light ${style.background}` : `bg-dark ${style.background}`} sx={{
                padding: {
                    md: "100px"
                },
            }}>
                <div className={`bg-pink-200 p-4 rounded-4 my-2 ${style.gradient}`}>
                    <Typography variant={"h5"} className={style.checkouttext}>
                        Checkout Here
                    </Typography>
                </div>
                <Form className="container-fluid p-5" onSubmit={handleSubmit(details)}>
                    <Typography className="fw-bold text-pink-400 py-1" variant={"h6"}>
                        <span className="fw-bold">1. </span>
                        Delievery Details
                    </Typography>
                    {/* when using the non controller components react hook form */}
                    {/* <>

                        <Row className="mb-1 g-3">
                            <Col md={6} className="position-relative">
                                <FormGroup>
                                    <Label>
                                        Name
                                    </Label>
                                    <input className={style.registerinput} {...register("name", {
                                        maxLength: 40, required: true, onChange() {

                                        }
                                    })} type="text" />
                                </FormGroup>
                                {errors.name && <Typography className="error-text" color={"red"} fontSize={"12px"} position={"absolute"} bottom={"-19px"} left={"25px"}>
                                    Name is required*</Typography>}
                            </Col>
                            <Col md={6} className="position-relative">
                                <FormGroup>
                                    <Label>
                                        Email
                                    </Label>
                                    <input className={style.registerinput} type="email" {...register("email", { required: true, maxLength: 40 })} />
                                </FormGroup>
                                {errors.email && <Typography className="error-text" color={"red"} fontSize={"12px"} position={"absolute"} bottom={"-19px"} left={"25px"}>
                                    Email is required*</Typography>}
                            </Col>
                            <Col md={12} className="position-relative">
                                <FormGroup>
                                    <Label>
                                        Address
                                    </Label>
                                    <textarea className={style.registerinput}  {...register("address", {
                                        required: true, maxLength: 40, onChange(event) {
                                            console.log("Event for the change of the textarea", event.target.value)
                                        }
                                    })} />
                                </FormGroup>
                                {errors.address && <Typography className="error-text" color={"red"} fontSize={"12px"} position={"absolute"} bottom={"-19px"} left={"25px"}>
                                    Address is required*</Typography>}
                            </Col>
                            <Col md={6} className="position-relative">
                                <FormGroup>
                                    <Label>
                                        Phone
                                    </Label>
                                    <input className={style.registerinput} type={"number"} {...register("phone", { required: true, minLength: 10, maxLength: 15 })} />
                                </FormGroup>
                                {errors.phone && <Typography className="error-text" color={"red"} fontSize={"12px"} position={"absolute"} bottom={"-19px"} left={"25px"}>
                                    Phone is required*</Typography>}
                            </Col>
                            <Col md={6} className="position-relative">
                                <FormGroup>
                                    <Label>
                                        City
                                    </Label>
                                    <input className={style.registerinput} type="text" {...register("city", { required: true, minLength: 10, maxLength: 20 })} />
                                </FormGroup>
                                {errors.city && <Typography className="error-text" color={"red"} fontSize={"12px"} position={"absolute"} bottom={"-19px"} left={"25px"}>
                                    City is required*</Typography>}
                            </Col>
                            <Col md={6} className="position-relative">
                                <FormGroup>
                                    <Label>
                                        State
                                    </Label>
                                    <input className={style.registerinput} type="phone" {...register("pinCode", { required: true })} />
                                </FormGroup>
                                {errors.pinCode && <Typography className="" color={"red"} fontSize={"12px"} position={"absolute"} bottom={"-19px"} left={"25px"}>
                                    State pin is required*
                                </Typography>}

                            </Col>
                            <Col className="position-relative" md={6}>
                                <FormGroup>
                                    <Label>
                                        Pin Code
                                    </Label>
                                    <input className={style.registerinput} type="number" {...register("pinCode", { required: true, minLength: 5, maxLength: 10 })} />
                                </FormGroup>
                                {errors.pinCode && <Typography className="error-text" color={"red"} fontSize={"12px"} position={"absolute"} bottom={"-19px"} left={"25px"}>
                                    Pin is required*</Typography>}
                            </Col>
                        </Row>
                    </> */}
                    {/* ..... */}
                    {/* when using the controller component */}
                    <Row className="mb-1 g-2">
                        {formGroups.map((formGroup, index) => {
                            return <FormGroup key={index} className="py-1">
                                <Controller rules={{ required: `${formGroup.name} is required` }} control={control} name={formGroup.name} render={(props) => {
                                    const { field, fieldState: { error } } = props;
                                    return <div className="input-container position-relative my-2" key={index}>
                                        <TextField ref={field.ref} sx={{ backgroundColor: theme.light ? "pink" : "#fff" }} value={field.value} label={formGroup.label} type={formGroup.type} onChange={value => field.onChange(value)} className="custom-input rounded-2 w-100" placeholder={formGroup.placeholder} name={field.name} />
                                        {error &&
                                            <span className="errors-statement top-[55px] left-[10px] position-absolute text-danger">
                                                {`${formGroup.label} is required`}
                                            </span>
                                        }
                                    </div>
                                }} />
                            </FormGroup>
                        })}
                        {/* s */}
                    </Row>
                    {/* ... */}
                    {/* <Row className="mb-1">

                    </Row>
                    <Row className="mb-1">

                    </Row> */}
                    <div className="row mb-1">
                        <Col xs={6}>
                            <Button className="bg-pink-400 hover:bg-pink-500" type="submit" variant={"contained"} color="secondary">
                                Submit
                            </Button>
                        </Col>
                    </div>
                </Form>
                <Container className="p-5" fluid>
                    <Row>
                        <Col xs={12}>
                            <Typography className="text-pink-400 fw-bold mb-2" variant="h6">
                                <span>2. </span>
                                Cart Review
                            </Typography>
                            <CustomDrawer closeDrawer={() => null} open reduxAdd={(product) => dispatch(addProduct({ name: product.name, size: product.size, quantity: product.quantity, variant: product.variant, price: product.price, product: product.product }))} reduxSubtract={(product) => dispatch(removeProduct({ name: product.name, size: product.size, quantity: product.quantity, variant: product.variant, price: product.price, product: product.product }))} reviewCart={false} />
                        </Col>
                    </Row>
                </Container>
                {/* <>
                <Elements stripe={loadStripeintent} options={{ mode: "payment", currency: "usd", amount: 10 }} >
                    <div className="">Stripe Elements process</div>
                </Elements>
                </> */}
            </Box>
        </>
    )
}
export default Checkout;
// server side running function..//
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const getServersidesession = await getServerSession(context.req, context.res, authorizeOptions);
    if (getServersidesession) {
        return {
            props: {
                positive: "Checkout page"
            }
        }
    }
    else {
        return {
            redirect: {
                basePath: false,
                permanent: false,
                destination: "/authentication/login"
            }
        }
    }
}
// ...// 