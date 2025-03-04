import React from "react";
const paginate = (totalPages: number, recordsPerpage: number) => {
    let pageList: Array<number> = [];
    let pages: number = Math.ceil(totalPages / recordsPerpage);
    for (let a = 1; a <= pages; a++) {
        pageList.push(a);
    }
    return pageList;
}
export default paginate;