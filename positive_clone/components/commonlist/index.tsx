import React from "react";
import { Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { ITableData } from "@/modals";
const CommonTable: React.FC<ITableData<any>> = ({ tablehead, tablebody }) => {
    const [tabledata, setTabledata] = React.useState<{
        tablehead: any[];
        tablebody: any[];
    }>({
        tablehead: [
            { type: "text", title: "name", label: "Name" }
            ,
            { type: "text", title: "age", label: "Age" },
            ,
            { type: "text", title: "gender", label: "Gender" }
            ,
            { type: "text", title: "college", label: "college" }
            ,
            {
                type: "action", title: "Action", actionSchema: [{
                    type: "edit",
                    action: () => { }
                }]
            }
        ],
        tablebody: [
            {
                name: "SHASHVAT GUPTA",
                age: 24,
                gender: "MALE",
                college: "Thapar University",
            },
            {
                name: "HARDEEP SINGH",
                age: 24,
                gender: "MALE",
                college: "Thapar University"
            },
            {
                name: "SAHIL GARG",
                age: 24,
                gender: "MALE",
                college: "Thapar University"
            }, {
                name: "CHETAN SINGLA",
                age: 24,
                gender: "MALE",
                college: "Thapar University"
            }
        ]
    });
    return (
        <>
            <Table className="bg-light">
                <TableHead sx={{ backgroundColor: "lightblue" }}>
                    <TableRow>
                        {tabledata.tablehead.map((headcell, index) => <TableCell className="text-uppercase text-danger" key={`${headcell}-${index + 1}`}>
                            {headcell.label}
                        </TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tabledata.tablebody.map((bodycell, index) => <TableRow key={index}>
                        {tabledata.tablehead.map((head, cellindex) => <TableCell key={cellindex}>
                            {head.type === "text" && bodycell[head.title]}
                            {head.type === "action" && <div className="table-actions">
                                {head.actionSchema.map((action: { type: string; action: () => void }, index: number) => {
                                    <Edit color={"warning"}/>
                                })}
                            </div>}
                        </TableCell>)}
                    </TableRow>)}
                </TableBody>
            </Table>
        </>
    )
}
export default CommonTable;