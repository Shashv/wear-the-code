import React from "react";
import { useSelector } from "react-redux";
import paginationstyle from "./index.module.css";
import { IState } from "@/redux/sore";
import style from "./index.module.css";
import { IBabajiPagination } from "../../modals/index";
const Pagination: React.FC<IBabajiPagination> = ({ page, changePage, pageList }) => {
    const theme = useSelector((state: IState) => state.toggletheme);
    const getPagination = (totalPages: number) => {
        let pages: unknown[] = []
        let delta: number = 1;
        //for duplicacy records
        // pages.push(1);
        if (totalPages <= delta) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            for (let s = 1; s <= totalPages; s++) {
                if (s === 1 || s === totalPages || (s >= page - delta && s <= page + delta)) {
                    pages.push(s);
                }
                else if (s === page - delta - 1 || s === page + delta + 1) {
                    pages.push("...");
                }
            }
            //for dupllicacy records//
            // const start = Math.max(2, page - 1);
            // const end = Math.min(totalPages - 1, page + 1);
            // if (start > 2) {
            //     pages.push("...");
            // }
            // for (let d = start; d <= end; d++) {
            //     pages.push(d);
            // }
            // if (end < (totalPages - 1)) {
            //     pages.push("...");
            // }
            // pages.push(totalPages);
        }
        return pages;
    };
    return (
        <div className={`pagination ${theme.light ? paginationstyle.lightpagination : paginationstyle.darkpagination}`}>
            <button disabled={page === 1} onClick={e => changePage(e, page - 1)} className="previous-page border-pink-200 p-1 hover:bg-pink-500 rounded-2 text-1xl text-pink-600 hover:text-slate-400">
                Previous
            </button>
            {getPagination(pageList.length).map((pageItem: any, index: number) => <button onClick={e => typeof pageItem === "number" ? changePage(e, pageItem) : () => console.log("Pressing the dot")} key={index} className={typeof pageItem === "number" ? `page-item ${pageItem === page ? style.page : null}` : `text-1xl text-slate-400`}>{pageItem}</button>)}
            <button disabled={page === pageList.length} onClick={e => changePage(e, page + 1)} className="next-page border-pink-200 p-1 hover:bg-pink-500 rounded-2 transition transition-linear hover:text-slate-400 text-1xl text-pink-600">
                Next
            </button>
        </div>
    )
}
export default Pagination;
