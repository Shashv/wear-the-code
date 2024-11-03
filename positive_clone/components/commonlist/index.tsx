import React from "react";
import { Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import { ITableData } from "@/modals";
const CommonTable: React.FC<ITableData<any>> = ({ tablehead, tablebody }) => {
    const [tabledata, setTabledata] = React.useState<{
        tablehead: any[];
        tablebody: any[];
    }>({
        tablehead: ["name", "age", "gender", "college"],
        tablebody: [{ name: "SHASHVAT GUPTA", age: 24, gender: "MALE" }, {
            name: "HARDEEP SINGH",
            age: 24,
            gender: "MALE"
        }, {
            name: "SAHIL GARG",
            age: 24,
            gender: "MALE"
        }, {
            name: "CHETAN SINGLA",
            age: 24,
            gender: "MALE"
        }]
    });
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        {tabledata.tablehead.map((headcell, index) => <TableCell className="text-uppercase" key={`${headcell}-${index + 1}`}>
                            {headcell}
                        </TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tabledata.tablebody.map((bodycell, index) => <TableRow key={index}>
                        {Object.keys(bodycell).map((positive, cellindex) => <TableCell key={cellindex}>
                            {bodycell[`${positive}`]}
                        </TableCell>)}
                    </TableRow>)}
                </TableBody>
            </Table>
        </>
    )
}
export default CommonTable;