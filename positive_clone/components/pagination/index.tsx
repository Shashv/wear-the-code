import React from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import paginationstyle from "./index.module.css";
import { IState } from "@/redux/sore";
const Pagination: React.FC = () => {
    const searchParams = useSearchParams();
    const theme = useSelector((state: IState) => state.toggletheme);
    const staticPages = [1, 2, 3, 4, 5];
    return (
        <div className={theme.light ? paginationstyle.lightpagination : paginationstyle.darkpagination}>
            {staticPages.map(page => <button className="btn btn-outline-primary">{page}</button>)}
        </div>
    )
}
export default Pagination;