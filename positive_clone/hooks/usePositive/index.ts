import React from "react";
import { IPagination } from "@/modals";
const usePositive: (params: IPagination) => {
    totalPages: number[]
} = ({ totalRecords, recordsPerpage }) => {
    let pageList: number[] = [];

    const [totalPages, setTotalpages] = React.useState<number>(1);
    for (let a = 1; a <= totalPages; a++) {
        pageList.push(a);
    }
    React.useEffect(() => {
        setTotalpages(Math.ceil(totalRecords / recordsPerpage))
        // console.log("I am using the hook use positive", value);
        // setValue((value) => value++);
        // console.log("Value after setting state woth callback function", value);
    }, []);
    return {
        totalPages: pageList
    }
}
export default usePositive;