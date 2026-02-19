import React, { useState, useCallback, useMemo } from "react";
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
import Image from "next/image";
import { User, AccountDetails, FormField } from "../../modals/index"
import { toast } from "react-toastify";


const formFields: FormField[] = [
    {
        type: "email",
        placeholder: "Enter email",
        name: "email"
    },
    {
        type: "password",
        name: "password",
        placeholder: "Enter password"
    },
    {
        type: "text",
        name: "username",
        placeholder: "Enter username"
    }
];

const EditForm: React.FC<{ manageAccount: (operationType: string, body: any) => Promise<any> }> = React.memo(({ manageAccount }) => {
    const { handleSubmit, control } = useForm();

    const onSubmit = useCallback(async (data: FieldValues) => {
        try {
            await manageAccount("PUT", data);
        } catch (error) {
            console.error("Error updating account:", error);
        }
    }, [manageAccount]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="flex flex-col gap-2">
                {formFields.map((field, index) => (
                    <div className="form-group" key={index}>
                        <Controller
                            name={field.name}
                            control={control}
                            render={({ field: { ref, onChange, value } }) => (
                                <TextField
                                    ref={ref}
                                    onChange={value => onChange(value)}
                                    value={value}
                                    className="w-100"
                                    type={field.type}
                                    placeholder={field.placeholder}
                                />
                            )}
                        />
                    </div>
                ))}
                <div className="button-container">
                    <Button color="danger" type="submit">
                        Submit Details
                    </Button>
                </div>
            </div>
        </form>
    );
});

EditForm.displayName = 'EditForm';

const MyAccount: NextPage<{ accountDetails: AccountDetails, users: User[] }> = ({ accountDetails: { name, email, image }, users }) => {
    const { status } = useSession();
    const router = useRouter();
    const [crudConfirmation, setCrudConfirmation] = useState<boolean>(false);
    const [purpose, setPurpose] = useState<string>("");
    const [accountEmail, setAccountEmail] = useState<string>("");
    const themeState = useSelector((state: IState) => state.toggletheme);

    const tableColumns = useMemo(() => [{
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
    },
    {
        type: "thumbnail",
        title: "image",
        label: "Profile Thumbnail"
    },
    {
        type: "action",
        actionSchema: [{
            type: "edit",
            action: async (email: string) => {
                setAccountEmail(email);
                setCrudConfirmation(true);
                setPurpose("Edit");
            }
        }, {
            type: "delete",
            action: async (email: string) => {
                setAccountEmail(email);
                setCrudConfirmation(true);
                setPurpose("Delete");
            }
        }],
        label: "Action"
    }], []);

    const manageAccounts = useCallback(async (operationType: string, body?: any) => {
        try {
            const response = await fetch(`/api/manageAccounts/${accountEmail}`, {
                method: operationType,
                ...(body && { body: JSON.stringify(body) })
            });
            return await response.json();
        } catch (error) {
            console.error("Error managing account:", error);
            throw error;
        }
    }, [accountEmail]);

    const performCrud = useCallback(async () => {
        try {
            const response = await manageAccounts(purpose);
            
            if (response.status === 200 || response.message === "Positive") {
                console.log("response user babaji", response);
                setCrudConfirmation(false);
                setPurpose("");
                toast.success("success",{
                    autoClose:2000,
                    draggableDirection:"x",
                })
            }
        } catch (error) {
            console.error("Error performing CRUD operation:", error);
        }
    }, [manageAccounts, purpose]);

    const ModalContent = useMemo(() => (
        <div className="modal-content">
            {purpose === "Edit" ? (
                <p className="my-2">
                    User will be edited and saved!
                    <EditForm manageAccount={manageAccounts} />
                </p>
            ) : (
                <p>User will be deleted, once deleted this process can't be undone</p>
            )}
        </div>
    ), [purpose, manageAccounts]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/authentication/login");
        }
    }, [status, router]);

    return (
        <div className={`container-fluid h-[100vh] ${themeState.dark ? styles.darkaccount : styles.lightaccount}`}>
            <div className="row">
                <div className="col-12">
                    <div style={{ backgroundColor: "pink" }} className="accoubnt-details-fields position-sticky top-0">
                        <Typography variant="h5" color="salmon">Account Holder - {name}</Typography>
                        <Typography variant="h5" color="skyblue">Account Holder Email - {email}</Typography>
                    </div>
                    <div className="">
                        <Image
                            className="rounded-full"
                            width={100}
                            height={100}
                            alt="User Profile"
                            src={`/uploads/${image}`}
                            priority
                        />
                    </div>

                    <div>
                        <div className="users-list">
                            <Typography className="user-label" variant="h5" color="lightblue">
                                Users List
                            </Typography>
                        </div>
                        <CommonTable tablebody={users} tablehead={tableColumns} />
                    </div>
                </div>
                <div className="col-12">
                    <StyledModal
                        width={purpose === "Edit" ? 500 : undefined}
                        height={purpose === "Edit" ? 500 : undefined}
                        showIcon
                        purpose={purpose}
                        title={`${purpose} Users ?`}
                        open={crudConfirmation}
                        content={ModalContent}
                        confirmProcess={performCrud}
                        closeModal={() => setCrudConfirmation(false)}
                    />
                </div>
            </div>
        </div>
    );
};
StyledModal.displayName = "StyledModal";

export default MyAccount;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, authorizeOptions) as ICustomSession | null;

    if (!session) {
        return {
            redirect: {
                destination: "/authentication/login",
                permanent: false
            }
        };
    }

    const users = await UserModel.find({});

    return {
        props: {
            accountDetails: {
                name: session.user.name,
                email: session.user.email,
                image: session.user.image
            },
            users: users.map(user => ({
                username: user.username,
                email: user.email,
                password: user.password,
                image: user?.image || ""
            }))
        }
    };
};