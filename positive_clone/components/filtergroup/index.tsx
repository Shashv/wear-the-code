import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import style from "./index.module.css";
import { ITheme } from "@/modals";
import { useDispatch } from "react-redux";
import { fetchPositive } from "@/pages/redux/reducers/positive";
import { Checkbox } from "@mui/material";
const FilterBar: React.FC<{ theme: ITheme }> = ({ theme }) => {
    let [filterStrands, setFilterStrands] = useState<Array<string>>([]);
    useEffect(() => {
        //this is for the initial mounting phase of the component like the component-did-mount in the class components, we can set the dependency values on the basis of our requirements by which this effect will be called in case of the component rerendering by the react , now this calling on the effect is like the component-did-update for the case of the class components , and then the third is that we can return the function as a call back which will be called every time the component will be unmounting from the dom tree , this effect will be called like the component-will-unmount for the class component.
        setFilterStrands(["Anime", "Characters", "Coding", "Combo"]);
        return () => console.log("I am unmounting from the dom tree");
    }, []);
    return (
        <>
            <Box component={"div"} className={theme.light ? `bg-light h-[100vh] py-5 ${style.lightfilter}` : `h-[100vh] py-5 ${style.darkfilter}`}>
                <div className={style.filterheading}>
                    <Typography className="text-4xl" color={"#fff"} >
                        Filters
                    </Typography>
                    <span>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" className="hidden lg:block text-3xl font-bold text-pink-500 cursor-pointer my-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Clear Filters</title><polygon fill="#F57C00" points="29,23 19,23 7,9 41,9"></polygon><g fill="#FF9800"><polygon points="29,38 19,44 19,23 29,23"></polygon><path d="M41.5,9h-35C5.7,9,5,8.3,5,7.5v0C5,6.7,5.7,6,6.5,6h35C42.3,6,43,6.7,43,7.5v0C43,8.3,42.3,9,41.5,9z"></path></g><circle fill="#F44336" cx="38" cy="38" r="10"></circle><rect x="32" y="36" fill="#fff" width="12" height="4"></rect></svg>
                    </span>
                </div>
                <div className={theme.light ? "filter-content" : "text-light"}>
                    {filterStrands.map((filterstrand, index) => (<div className="d-flex align-items-center justify-content-start" key={index}>
                        <Checkbox defaultChecked={false} sx={{ accentColor: "#99c8ff", outlineColor: "#fff", borderColor: "#fff" }} />
                        <Typography className="" variant="h5" color={"white"}>
                            {filterstrand}
                        </Typography>
                    </div>))}
                </div>
                <div className="">
                    {/* <button className="btn btn-light text-dark">
                        Dispacth Action for the async
                    </button> */}
                    <button className="bg-pink-600 fw-bold rounded-pill text-light text-2xl p-3 px-4">
                        Apply Filters
                    </button>
                </div>
            </Box>
        </>
    )
}
export default FilterBar;
