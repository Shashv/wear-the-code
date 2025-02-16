import React, { useState } from "react";
import CommonTable from "@/components/commonlist";
import { ICustomSession } from "@/modals";
import { useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import UserModel from "@/modalsmongoose/user";
import styles from "./index.module.css";
import StyledModal from "@/components/styledpopup";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Button } from "reactstrap";
let accountEmail: string = "";
const EditForm: React.FC<{ manageAccount: (operationType: string, body: any) => Promise<any> }> = ({ manageAccount }) => {
    const { handleSubmit, control } = useForm();
    const formGroups = [{
        type: "email",
        placeholder: "Enter email",
        name: "email"
    },
    // {
    //     type: "password",
    //     name: "password",
    //     placeholder: "Enter password"
    // },
    {
        type: "text",
        name: "username",
        placeholder: "Enter username"
    }];
    const details = async (data: FieldValues) => {
        // console.log("Data after submitting the form", data);
        const response = await manageAccount("PUT", data);
        console.log("Response final after submitting the data", response);
    }
    return (
        <form onSubmit={handleSubmit(details)} className="">
            <div className="flex flex-col gap-2">
                {
                    formGroups.map((group, index) => {
                        return <div className="form-group " key={index}>
                            <Controller name={group.name} control={control} render={(props) => {
                                const { field } = props;
                                return <TextField ref={field.ref} onChange={value => field.onChange(value)} value={field.value} className="w-100" type={group.type} placeholder={group.placeholder} />
                            }} />
                        </div>
                    })
                }
                <div className="button-container">
                    <Button color="danger" type="submit">
                        Submit Details
                    </Button>
                </div>
            </div>
        </form>
    )
}
const MyAccount: NextPage<{ accountDetails: { name: string; email: string }, users: Array<{ username: string; email: string; password: string }> }> = ({ accountDetails: { name, email }, users }) => {
    const { status } = useSession();
    const routerActions = useRouter();
    const [crudConfirmation, setCrudconfirmation] = useState<boolean>(false);
    let [purpose, setPurpose] = useState<string>("");
    const babaJi = [{
        type: "text",
        title: "username",
        label: "Username"
    }, {
        type: "text",
        title: "email",
        label: "Email"
    }, {
        type: "text",
        title: "password",
        label: "Password"
    }, {
        type: "action",
        actionSchema: [{
            type: "edit",
            action: async (email: string) => {
                accountEmail = email;
                setCrudconfirmation(confirmation => !confirmation);
                setPurpose("Edit")
            }
        }, {
            type: "delete",
            action: async (email: string) => {
                accountEmail = email;
                setCrudconfirmation(confirmation => !confirmation);
                setPurpose("Delete")
            }
        }],
        label: "Action"
    }]
    const performCrud = async () => {
        let response = await manageAccounts("PUT");
        // console.log("Response", response);
        setCrudconfirmation(!crudConfirmation);
        setPurpose("PUT")
    }
    const themeState = useSelector((state: IState) => state.toggletheme);
    const manageAccounts = async (operationType: string, body?: any) => {
        switch (operationType) {
            case "DELETE": {
                let response = await fetch(`/api/manageAccounts/${accountEmail}`, {
                    method: operationType
                });
                let parsedResponse = await response.json();
                return parsedResponse
            }
            case "PUT": {
                let response = await fetch(`/api/manageAccounts/${accountEmail}`, {
                    method: operationType,
                    body: JSON.stringify(body)
                });
                let parsedResponse = await response.json();
                return parsedResponse;
            }
            default: return operationType
        }
    }
    const ModalContent = <div className="modal-content">
        {purpose === "Edit" ? <p className="my-2">User will be edited and saved!
            <EditForm manageAccount={(type: string, body: any) => manageAccounts(type, body)} />
        </p> : <p>User will be deleted , once deleted this process can't be undone</p>}
    </div>
    useEffect(() => {
        if (status === "unauthenticated") routerActions.replace("/authentication/login");
    }, [status, routerActions])
    return (
        <>
            <div className={`container-fluid h-[100vh] ${themeState.dark ? styles.darkaccount : styles.lightaccount}`}>
                <div className="row">
                    <div className="col-12">
                        <div className="accoubnt-details-fields position-sticky top-0">
                            <Typography variant="h5" color={"salmon"}>Account Holder - {name}</Typography>
                            <Typography variant="h5" color={"skyblue"}>Account Holder Email - {email}</Typography>
                        </div>
                        <div className="">
                            <div className="users-list">
                                <Typography className="user-label" variant="h5" color={"lightblue"}>
                                    Users List
                                </Typography>
                            </div>
                            <CommonTable tablebody={users} tablehead={babaJi} />
                        </div>
                    </div>
                    <div className="col-12">
                        <StyledModal width={purpose === "Edit" ? 500 : null} height={purpose === "Edit" ? 500 : null} showIcon purpose={purpose} title={`${purpose} Users ?`} open={crudConfirmation} content={ModalContent} confirmProcess={performCrud} closeModal={() => setCrudconfirmation(!crudConfirmation)} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyAccount;
//below will run on the server side...//
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const sessionserver = await getServerSession(context.req, context.res, authorizeOptions) as ICustomSession | null;
    const users = await UserModel.find({});
    // console.log("Users", users);
    if (sessionserver) {
        return {
            props: {
                accountDetails: {
                    name: sessionserver.user.name,
                    email: sessionserver.user.email
                },
                users: users.map(user => ({
                    username: user.username,
                    email: user.email,
                    password: user.password
                }))
            }
        }
    }
    else {
        return {
            redirect: {
                basePath: false,
                destination: "/authentication/login",
                permanent: false
            }
        }
    }
}