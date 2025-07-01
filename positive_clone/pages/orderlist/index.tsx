import React, { useCallback, useState } from "react";
import CommonTable from "@/components/commonlist";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { ICustomSession } from "@/modals";
import OrdersModel from "@/modalsmongoose/orders";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { IState } from "@/redux/sore";
import StyledModal from "@/components/styledpopup";
import styles from "./index.module.css";
import Image from "next/image";
import { toast } from "react-toastify";

const OrdersList: NextPage<{ pageName: string, sessionStatus?: { name: string; email: string }, products: any[], orderPositive: Array<any> }> = ({ products, orderPositive }) => {

    let [orderId, setOrderId] = useState<string>(":");
    const session = useSession();
    const router = useRouter();
    var themeState = useSelector((state: IState) => state.toggletheme);

    let [crud, setCrud] = useState({
        confirm: false,
        isDone: false,
        isloading: false
    });

    let [tableData, setTabledata] = useState<{ tableHead: Array<any>, tableBody: Array<any> }>({
        tableHead: [{
            type: "text",
            label: "Name",
            title: "_id"
        },
        {
            type: "text",
            label: "Quantity",
            title: "quantity"
        }, {
            type: "text",
            label: "Order Id",
            title: "orderId"
        }, {
            type: "text",
            label: "Order Status",
            title: "orderStatus"
        }, {
            type: "link",
            label: "Order Details",
            title: "orders"
        }, {
            type: "action",
            actionSchema: [{
                type: "delete",
                action: async (email: string) => {
                    console.log("Email", email);
                    setCrud(crud => ({ ...crud, confirm: !crud.confirm }))
                    setOrderId(email);
                },
                params: "_id"
            }],
            label: "Action"
        }],
        tableBody: orderPositive
    });
    
    React.useEffect(() => {
        if (session.status === "unauthenticated") router.replace("/authentication/login");
        // setTabledata({ ...tableData, tableBody: orderPositive });
    }, [session, products]);

    const userDetails = {
        name: session?.data?.user.name,
        email: session?.data?.user.email,
        profile: session?.data?.user.image
    }

    const confirmDelete = useCallback((orderId: string) => {

        setCrud(crud => ({ ...crud, isDone: true, confirm: !crud.confirm, isloading: true }))
        fetch(`/api/orders?_id=${orderId}`, {
            method: "DELETE"
        }).then(async res => {
            const responseSchema = {
                status: res.status,
                jsonContent: await res.json()
            }
            return responseSchema
        }).then(res => {
            // console.log('Response from api', res);
            setCrud(crud => ({ ...crud, isDone: true, confirm: false, isloading: false }));

            if (res.status === 200) {
                setTabledata({
                    ...tableData, tableBody: tableData.tableBody.filter(order => {
                        if (order._id.toString() !== orderId) {
                            return order
                        }
                    })
                });
                toast.success("Order deleted successfully", {
                    autoClose: 2000,
                    position: "top-right"
                })
            }
            else {
                toast.error("Opps unable to deleted the order , something went wrong", {
                    autoClose: 2000,
                    position: "top-right"
                })
            }
        })
    }, [orderId]);

    function toggleModal(operationType: string, orderId?: string): void {
        operationType === "confirm" ? confirmDelete(orderId || "123") : setCrud(curd => ({ ...curd, confirm: !curd.confirm }));
    }

    return (
        <>
            <div className={themeState.dark ? `min-h-screen container-fluid ${styles.orderlistcontainerdark}` : `container-fluid min-h-screen ${styles.orderlistcontainer}`}>
                <div className="row">
                    <div className="col-12 table-container" style={{ backgroundColor: themeState.dark ? "#000" : "#fff" }}>
                        {crud.isloading ? <Backdrop open className="flex-col align-center justify-center">
                            <CircularProgress className="text-pink-500" sx={{ fontSize: 100 }} />
                            <Typography className="text-pink-500 text-5xl">
                                Processing deleting order
                            </Typography>
                        </Backdrop> :
                            <>
                                {Object.keys(userDetails).map(user => user === "profile" ? <Image width={100} height={100} className="rounded-circle w-[100px] h-[100px]" src={`/uploads/${userDetails["profile"]}`} alt="profile_pic" /> : <Typography key={user} variant="h4">
                                    {user === "email" ? session.data?.user.email : user === "name" ? session.data?.user.name : null}
                                    { }
                                </Typography>)}
                                <CommonTable tablebody={tableData.tableBody ? tableData.tableBody : []} tablehead={tableData.tableHead ? tableData.tableHead : []} />
                                <Typography className="text-pink-600" variant="h4"></Typography>
                                <StyledModal open={crud.confirm} title="Are you sure you want to delete the order" purpose="Delete" confirmProcess={() => toggleModal("confirm", orderId)} closeModal={() => toggleModal("close")} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrdersList;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const sessionStatus = await getServerSession(context.req, context.res, authorizeOptions) as ICustomSession | null;
    const userSession = await getSession({ req: context.req });

    let ordersList = await OrdersModel.find({ email: userSession?.user.email || "" });

    if (sessionStatus) {
        return {
            props: {
                pageName: "OrdersList page",
                sessionStatus: {
                    name: sessionStatus.user.name,
                    email: sessionStatus.user.email
                },
                orderPositive: JSON.parse(JSON.stringify(ordersList))
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
