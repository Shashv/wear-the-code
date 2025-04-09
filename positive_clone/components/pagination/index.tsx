import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
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
    // let [visibleSlots, setVisibleslots] = useState<number[]>([]);
    const getPagination = (totalPages: number) => {
        let pages: unknown[] = []
        let delta: number = 1;
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
    // const staticPages = [1, 2, 3, 4, 5];
    // useEffect(() => {
    //     if (pageList.length >= 5) {
    //         let previousPage = page - 1;
    //         let nextPage = page + 1;
    //         if (page === 1) {
    //             setVisibleslots([page, page + 1])
    //         }
    //         else if (page === 2) {
    //             setVisibleslots([page - 1, page]);
    //         }
    //         else if (page === pageList.length) {
    //             setVisibleslots([page - 1, page]);
    //         }
    //         else if (page === pageList.length - 1) {
    //             setVisibleslots([page - 1, page]);
    //         }
    //         else setVisibleslots([previousPage, page, nextPage]);
    //         // console.log("search params", searchParams?.get("pageNumber"));
    //     }
    // }, []);
    // console.log("visible slots", visibleSlots);
    return (
        <div className={`pagination ${theme.light ? paginationstyle.lightpagination : paginationstyle.darkpagination}`}>
            <button disabled={page === 1} onClick={e => changePage(e, page - 1)} className="previous-page border-pink-200 p-1 hover:bg-pink-500 rounded-2 text-1xl text-pink-600 hover:text-slate-400">
                Previous
            </button>
            {/* using the dot and page value different approach */}
            {/* <>
              
                {page > 2 && pageList.length > 5 && ["babaji", "babaji"].map((dot, index) => <button className={`page-item text-slate-200 fs-4`} key={`${dot}-${index}`}>.</button>)}
            {visibleSlots.length > 0 ? visibleSlots.map(page => <button className={`page-item ${style.page}`} key={page} onClick={e => changePage(e, page)}>{page}</button>) :
                staticPages.map(page => <button className={`page-item ${style.page}`} key={page} onClick={e => changePage(e, page)}>{page}</button>)
            }
            {pageList.length > 5 && !(page >= pageList.length - 2) && ["babaji", "babaji"].map((dot, index) => <button className={`page-item text-slate-500 fs-4`} key={`${dot}-${index}`}>.</button>)}
             
            </> */}
            {/* .... */}
            {getPagination(pageList.length).map((pageItem: any, index: number) => <button onClick={e => typeof pageItem === "number" ? changePage(e, pageItem) : () => console.log("Pressing the dot")} key={index} className={typeof pageItem === "number" ? `page-item ${pageItem === page ? style.page : null}` : `text-1xl text-slate-400`}>{pageItem}</button>)}
            <button disabled={page === pageList.length} onClick={e => changePage(e, page + 1)} className="next-page border-pink-200 p-1 hover:bg-pink-500 rounded-2 transition transition-linear hover:text-slate-400 text-1xl text-pink-600">
                Next
            </button>
        </div>
    )
}
export default Pagination;