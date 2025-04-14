import React from "react";
import { Table, TableBody, TableHead, TableRow, TableCell, Typography, CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useSelector, UseSelector } from "react-redux";
import { ITableData } from "@/modals";
import { IState } from "@/redux/sore";
import Image from "next/image";
import Link from "next/link";
const CommonTable: React.FC<ITableData<any>> = ({ tablehead, tablebody, theme }) => {
    // const [tabledata, setTabledata] = React.useState<{
    //     tablehead: any[];
    //     tablebody: any[];
    // }>({
    //     tablehead: [
    //         { type: "text", title: "name", label: "Name" }
    //         ,
    //         { type: "text", title: "age", label: "Age" },
    //         ,
    //         { type: "text", title: "gender", label: "Gender" }
    //         ,
    //         { type: "text", title: "college", label: "college" }
    //         ,
    //         {
    //             type: "action", title: "Action", actionSchema: [{
    //                 type: "edit",
    //                 action: () => { }
    //             }]
    //         }
    //     ],
    //     tablebody: [
    //         {
    //             name: "SHASHVAT GUPTA",
    //             age: 24,
    //             gender: "MALE",
    //             college: "Thapar University",
    //         },
    //         {
    //             name: "HARDEEP SINGH",
    //             age: 24,
    //             gender: "MALE",
    //             college: "Thapar University"
    //         },
    //         {
    //             name: "SAHIL GARG",
    //             age: 24,
    //             gender: "MALE",
    //             college: "Thapar University"
    //         }, {
    //             name: "CHETAN SINGLA",
    //             age: 24,
    //             gender: "MALE",
    //             college: "Thapar University"
    //         }
    //     ]
    // });
    const themePositive = useSelector((state: IState) => state.toggletheme);
    // console.log("Table body", tablebody);
    return (
        <>
            <Table className={`bg-light ${themePositive?.dark ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                <TableHead sx={{ backgroundColor: "lightblue" }}>
                    <TableRow>
                        {tablehead.map((headcell, index) => <TableCell className="text-uppercase text-danger" key={`${headcell}-${index + 1}`}>
                            {headcell.label}
                        </TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tablebody ? tablebody.length > 0 ?
                        tablebody.map((bodycell, index) => <TableRow key={index}>
                            {tablehead.map((head, cellindex) => <TableCell color={theme?.light ? "#000" : "#fff"} key={cellindex}>
                                {head.type === "text" && bodycell[head.title]}
                                {head.type === "link" && <Link prefetch={false} className="text-pink-500 fw-bold italic hover:text-pink-600" href={`/${head.title}?orderId=${bodycell["orderId"]}`}>
                                Order Details</Link>}
                                {head.type === "thumbnail" && <Image width={100} height={100} className="rounded-circle w-[120px] h-[120px] p-2" alt="user_profile" src={`/uploads/${bodycell[head.title]}`} />}
                                {head.type === "action" && <div className="table-actions">
                                    {head.actionSchema.map((action: { type: string; action: (param?: any) => void }, indexn: number) => {
                                        return action.type === "edit" ?
                                            <span className="edit" key={indexn} onClick={(e: React.MouseEvent<HTMLSpanElement>) => action.action(bodycell["email"])}>
                                                <Edit color={"secondary"} fontSize={"medium"} className="cursor-pointer" /> </span> : <span onClick={e => action.action(bodycell["email"])} className="delete"><Delete color={"error"} fontSize={"medium"} className="cursor-pointer" /></span>
                                    })}
                                </div>}
                            </TableCell>)}
                        </TableRow>) : <>
                            <TableRow className="no-record-found">
                                <span>
                                    <Typography className="no-record-found" color={"CaptionText"} variant="subtitle1">
                                        No record found
                                    </Typography>
                                </span>
                            </TableRow>
                        </> : <><CircularProgress color="primary" /></>}
                </TableBody>
            </Table>
        </>
    )
}
export default CommonTable; 