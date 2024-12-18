import React from "react";
import { Box, Button, FormGroup, Typography } from "@mui/material";
import styles from "./index.module.css";
import { Form, Label } from "reactstrap";
import { IRegisterOptions } from '../../modals/index';
import { FieldValues, useForm } from "react-hook-form";
import { Container, Col, Row } from "reactstrap";
import Cart from "../../components/cart";
import style from "./index.module.css";
import CustomDrawer from "../../components/cart";
import { useDispatch } from "react-redux";
import addProduct from "@/redux/actions/addProduct";
import removeProduct from "@/redux/actions/removeProduct";
import { enqueueSnackbar } from "notistack";
//will be used later//
// import FormGenerator from "@/components/formgenerator";
const Checkout: React.FC = () => {
    let { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, setError, clearErrors } = useForm<IRegisterOptions>();
    let dispatch = useDispatch();
    let details = (data: FieldValues | IRegisterOptions) => {
        enqueueSnackbar("SUCCESSFULLY SUBMITTED", {
            variant: "success",
            anchorOrigin: {
                vertical: "top",
                horizontal: "right"
            },
            autoHideDuration: 2000
        })
    }
    return (
        <>
            <Box component={"div"} className="" sx={{
                padding: {
                    md: "100px"
                }
            }}>
                <div className="bg-pink-200 p-4 rounded-4 my-2">
                    <Typography variant={"h5"} className={style.checkouttext}>
                        Checkout Here
                    </Typography>
                </div>
                <Form className="container-fluid p-5" onSubmit={handleSubmit(details)}>
                    <Typography className="fw-bold text-pink-400" variant={"h6"}>
                        <span className="fw-bold">1. </span>
                        Delievery Details
                    </Typography>
                    <Row className="mb-1 g-3">
                        <Col md={6} className="position-relative">
                            <FormGroup>
                                <Label>
                                    Name
                                </Label>
                                <input className={style.registerinput} {...register("name", {
                                    maxLength: 40, required: true, onChange(event) {

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
                                <textarea className={style.registerinput}  {...register("address", { required: true, maxLength: 40 })} />
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
                    <Row className="mb-1">

                    </Row>
                    <Row className="mb-1">

                    </Row>
                    <Row className="mb-1">

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
                {/* will be used later */}
                {/* <FormGenerator /> */}
            </Box>

        </>
    )
}
export default Checkout;