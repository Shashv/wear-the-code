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
                       
                    </Row>
                   
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