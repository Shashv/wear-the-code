import React, { useState } from "react";
import { IPagination } from "@/modals";
import useSearchParamsstate from "../useSearchParams";
const usePositive: (params: IPagination) => {
    totalPages: number[],
    page: number,
    setPage: (page: number) => void
} = ({ totalRecords, recordsPerpage }) => {
    const router = useSearchParamsstate();
    let pageList: number[] = [];
    const [page, setPage] = useState<number>(router.query.page ? Number(router.query.page) : 1);
    const [totalPages, setTotalpages] = React.useState<number>(1);
    for (let a = 1; a <= totalPages; a++) {
        pageList.push(a);
    }
    React.useEffect(() => {
        setTotalpages(Math.ceil(totalRecords / recordsPerpage));
        // console.log("I am using the hook use positive", value);
        // setValue((value) => value++);
        // console.log("Value after setting state woth callback function", value);
    }, []);
    return {
        totalPages: pageList,
        setPage: setPage,
        page: page
    }
}
export default usePositive;