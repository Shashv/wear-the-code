import React from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import paginationstyle from "./index.module.css";
import { IState } from "@/redux/sore";
import style from "./index.module.css";
type IBabaji = {
    page: number;
    changePage: (event: React.MouseEvent<HTMLButtonElement>, page: number) => void;
    pageList: Array<number>
}
const Pagination: React.FC<IBabaji> = ({ page, changePage, pageList }) => {
    // const searchParams = useSearchParams();
    const theme = useSelector((state: IState) => state.toggletheme);
    const staticPages = [1, 2, 3, 4, 5];
    return (
        <div className={`pagination ${theme.light ? paginationstyle.lightpagination : paginationstyle.darkpagination}`}>
            {staticPages.map(page => <button className={`page-item ${style.page}`} key={page} onClick={e => changePage(e, page)}>{page}</button>)}
        </div>
    )
}
export default Pagination;