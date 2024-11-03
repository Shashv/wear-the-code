"use client";
import React, { useEffect, useState } from "react";
import { Container, Form, FormGroup, Label } from "reactstrap";
import { useForm } from 'react-hook-form';
import "./index.css";
import { Select, MenuItem, Button, Paper, Typography, FormControlLabel, Checkbox, FormLabel } from "@mui/material";
// import "bootstrap/dist/bootstarp.min.css";
import "./style.css";
import { Col, Row } from "reactstrap";
interface IRegisterOptions {
    category: string;
    productname: string;
    productdescription: string;
    variants: string | string[];
    sizes: string | string[];
    front_image: string;
    back_image: string;
}
const Uploads: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitted }, clearErrors, setError } = useForm<IRegisterOptions>({
        criteriaMode: "all"
    });
    let [fieldValues, setFieldValues] = useState<IRegisterOptions>({
        category: "",
        productname: "",
        productdescription: "",
        variants: [],
        sizes: [],
        front_image: "",
        back_image: ""
    });
    const availablecolor: string[] = ["Red", "Yellow", "Blue", "Green", "Bottle Green"];
    const sizes: string[] = ["sm", "md", "lg", "xlg", "xxlg"];
    const [imagefiles, setImageFiles] = useState<{ image_front: unknown | any; image_back: unknown | any }>({
        image_front: null,
        image_back: null
    });
    const submitData = (data: IRegisterOptions) => {
        console.log("Insdie the  upload data", data);
        // if (data.category !== "" && data.productdescription !== "" && data.productname !== "" && data.sizes !== "" && data.variants !== "") {0
        //     // console.log(data);/
        //     // fetch("/api/uploads", {
        //     //     headers: {
        //     //         "Content-Type": "application/json",
        //     //     },
        //     //     method: "POST",
        //     //     body: JSON.stringify(data)
        //     // }).then(response => {
        //     //     return response.json();
        //     // }).then(response => console.log("response", response)).catch(er => console.log("Error is the best coder in the India", er));
        // }
        // else {
        //     if (data.category === "") setError("category", {
        //         types: {
        //             required: "Category is requireed*"
        //         }
        //     })
        //     else if (data.productdescription === "") {
        //         setError("productdescription", {
        //             types: {
        //                 required: "Product Description is required*"
        //             }
        //         })
        //     }
        //     else if (data.productname === "") {
        //         setError("productname", {
        //             types: {
        //                 required: "Product Name is requierd*"
        //             }
        //         })
        //     }
        //     else if (data.sizes === "") {
        //         setError("sizes", {
        //             types: {
        //                 required: "Sizes is required"
        //             }
        //         })
        //     }
        //     else if (data.variants === "") {
        //         setError("variants", {
        //             types: {
        //                 required: "Variants is required*"
        //             }
        //         })
        //     }
        // }
        fetch("/api/uploads", {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: "POST",
            body: imagefiles.image_front
        }).then(response => {
            return response.json();
        }).then(response => console.log("response", response)).catch(er => console.log("Error is the best coder in the India", er));
    }
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        // setError("category", {
        //     type: "custom", message: "This is the custom message for the error", types: {
        //         required: "This filed is required for the validation"
        //     }
        // }, { shouldFocus: true });
    }, []);
    const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValues({ ...fieldValues, productname: event.target.value });
        if (event.target.value === "") setError("productname", {
            types: {
                required: "Product name is required*"
            }
        });
        else {
            clearErrors("productname");
        }
    }
    const handleProductDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFieldValues({ ...fieldValues, productdescription: event.target.value });
        if (event.target.value === "") setError("productdescription", {
            types: {
                required: "Product Description is requried*"
            }
        });
        else if (event.target.value !== "") clearErrors("productdescription");
    }
    const handleFrontImage = (event: React.BaseSyntheticEvent) => {
        // console.log("Inside the function call for the handling the front end", event.target.files[0]);
        // setImageFiles({ ...imagefiles, image_front: event.target.files[0] });
        const data = new FormData();
        data.append("file", event.target.files[0]);
        fetch("api/uploads", {
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // },
            body: data,
            method: "POST"
        }).then(response => response.json()).then(finalisedResponse => alert(finalisedResponse.message));
    }
    const handleBackImage = () => {
        console.log("Inside the process of the handling of the back image");
    }
    return (
        <>
            {/* <html>
                <body> */}
            {/* <Paper sx={{ height: "100%", width: "100vw" }} className="d-flex justify-content-center align-items-center"> */}
            <Container fluid className="uploads-container">
                <Row>
                    <Form onSubmit={handleSubmit(submitData)} className="w-100 h-100 d-flex flex-column justify-content-evenly align-items-center bg-light rounded-2">
                        <Col>
                            <FormGroup className="d-flex flex-column gap-2 position-relative">
                                <Label className="fs-3">
                                    Category
                                </Label>
                                <Select {...register("category", { required: true })} defaultValue={fieldValues.category}>
                                    <MenuItem value={"tshirts"}>
                                        TShirts</MenuItem>
                                    <MenuItem value={"hoodies"}>
                                        Hoodies</MenuItem>
                                    <MenuItem value={"stickers"}>
                                        Stickers
                                    </MenuItem>
                                </Select>
                                {errors.category?.types?.required && <Typography className="" position={"absolute"} top={"13px"} left={"13px"} fontSize={"12px"} color={"red"}>
                                    {errors.category.types.required}</Typography>}
                            </FormGroup>
                            <FormGroup className="form-group d-flex flex-column position-relative">
                                <Label className="fs-3">
                                    Product Name
                                </Label>
                                <input className="p-2 rounded-2 border border-none" {...register("productname", {
                                    required: true, maxLength: 100, onChange(event) {
                                        handleProductChange(event);
                                    },
                                })} type={"text"} defaultValue={fieldValues.productdescription} placeholder="Enter Product Name" />
                                {errors.productname?.types?.required && <Typography className="" color={"red"} fontSize={"12px"}
                                    position={"absolute"} top={"93px"} left={"13px"}>{errors.productname.types.required}</Typography>}
                            </FormGroup>
                            <FormGroup className="d-flex flex-column gap-2">
                                <FormLabel component={"label"}>
                                    Price
                                </FormLabel>
                                <input className="p-2 rounded-2 border border-none" max={1000} type="number" placeholder="Enter Original Price" />
                            </FormGroup>
                            <FormGroup className="d-flex flex-column gap-2">
                                <Label>
                                    Discount Price
                                </Label>
                                <input className="p-2 rounded-2 border border-none" max={1000} type={"number"} placeholder="Enter Discount Price" />
                            </FormGroup>
                            <FormGroup className="form-group d-flex flex-column position-relative">
                                <Label className="fs-3">
                                    Product Description
                                </Label>
                                <textarea {...register("productdescription", {
                                    required: true, maxLength: 200, onChange(event) {
                                        handleProductDescription(event);
                                    }
                                })} placeholder="Enter product description" maxLength={200} className="border border-none rounded-2 shadow-sm">

                                </textarea>
                                {errors.productdescription?.types?.required && <Typography top={"93px"} left={"13px"} className="" color={"red"} fontSize={"12px"} position={"absolute"}>{errors.productdescription.types.required}</Typography>}
                            </FormGroup>
                            <FormGroup className="form-group d-flex flex-column">
                                <Label className="form-label fs-3">
                                    Add Variant Options
                                </Label>
                                <div defaultValue={"Blue"} {...register("variants", {
                                    required: true, onChange(event) {
                                        console.log("event for the change", event.target.value);
                                    },
                                })}>
                                    {availablecolor.map((key, index) => <FormControlLabel key={index} label={key.toUpperCase()} control={<Checkbox value={key} />} />)}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel component={"label"} className="fs-3">
                                    Add Sizes
                                </FormLabel>
                                <div className="size-list">
                                    {sizes.map((size, index) => <FormControlLabel label={size.toUpperCase()} control={<Checkbox value={size} />} key={index} />)}
                                </div>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className="d-flex flex-column gap-2">
                                <FormLabel component={"label"} className="fs-3">
                                    Add Front Image
                                </FormLabel>
                                <div className="image_uploader">
                                    <input className="p-2 rounded-2 border border-none" type={"file"} {...register("front_image", {
                                        required: true, onChange(event: any) {
                                            handleFrontImage(event);
                                        }
                                    })} />
                                </div>
                            </FormGroup>
                            <FormGroup className="d-flex flex-column gap-2">
                                <FormLabel component={"label"} className="fs-3">
                                    Add Back Image
                                </FormLabel>
                                <div className="imagesecond_uploader">
                                    <input className="p-2 rounded-2 border border-none" {...register("back_image", { required: true })} type="file" />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <div className="submit-form">
                                <Button className="" type={"submit"} color={"secondary"} variant="contained">
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </Form>
                </Row>
            </Container>
            {/* </Paper> */}
            {/* </body>
            </html> */}
        </>
    )
}
export default Uploads;

//For the fatser loading of the webpages of the browser , the server provides the catch in order to make the webpage to load faster and efficiently//