import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import style from "./index.module.css";
import { ITheme } from "@/modals";
import { IoMenu } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { fetchPositive } from "@/redux/reducers/positive";
import { FaHamburger } from "react-icons/fa";
import { IoMdClose } from "react-icons/io"
import { Checkbox } from "@mui/material";
import { useContext } from "react";
import { Backdrop } from "@mui/material";
const FilterBar: React.FC<{ theme: ITheme }> = ({ theme }) => {
    let filterStrands: Array<string> = (["Anime", "Characters", "Coding", "Combo"]);
    const [showMobilefilter, setShowMobilefilter] = useState<boolean>(false);
    function toggleMobileFilter() {
        setShowMobilefilter(!showMobilefilter);
    }
    return (
        <>
            <Box component={"div"} className={theme.light ? `bg-light h-[100vh] ${style.lightfilter}` : `h-[100vh]  ${style.darkfilter}`}>
                <div className={style.filterheading}>
                    <Typography className="text-3xl" color={theme.light ? "#000" : "#fff"} >
                        Filters
                    </Typography>
                    <span>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" className="hidden lg:block text-3xl font-bold text-pink-500 cursor-pointer my-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Clear Filters</title><polygon fill="#F57C00" points="29,23 19,23 7,9 41,9"></polygon><g fill="#FF9800"><polygon points="29,38 19,44 19,23 29,23"></polygon><path d="M41.5,9h-35C5.7,9,5,8.3,5,7.5v0C5,6.7,5.7,6,6.5,6h35C42.3,6,43,6.7,43,7.5v0C43,8.3,42.3,9,41.5,9z"></path></g><circle fill="#F44336" cx="38" cy="38" r="10"></circle><rect x="32" y="36" fill="#fff" width="12" height="4"></rect></svg>
                    </span>
                </div>
                <div className={theme.light ? "filter-content" : ""}>
                    {filterStrands.map((filterstrand, index) => (<div className="d-flex align-items-center justify-content-start" key={index}>
                        <Checkbox defaultChecked={false} sx={{ accentColor: "#99c8ff", outlineColor: "#fff", borderColor: "#fff" }} />
                        <Typography className="" variant="h6" color={theme.dark ? "#fff" : "#000"}>
                            {filterstrand}
                        </Typography>
                    </div>))}
                </div>
                <div className="">
                    <button className="bg-pink-600  rounded-pill text-light text-1xl p-2 px-3">
                        Apply Filters
                    </button>
                </div>
            </Box>
            <div className={showMobilefilter ? style.showfiltercontent : style.hidefiltercontent}>
                <div className={theme.light ? style.mobilefilterlight : style.mobilefilterdark}>
                    {
                        showMobilefilter ? <IoMdClose className={showMobilefilter ? style.menuClose : style.menuOpen} color="#ec4899" onClick={(e) => toggleMobileFilter()} /> : <IoMenu className={showMobilefilter ? style.menuClose : style.menuOpen} color="#ec4899" onClick={e => toggleMobileFilter()} />
                    }
                    <div className={style.filterheading}>
                        <Typography sx={{ fontSize: { xs: 25, sm: 35, md: 38 } }} color={theme.light ? "#000" : "#fff"} >
                            Filters
                        </Typography>
                        <span>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" className="hidden lg:block text-3xl font-bold text-pink-500 cursor-pointer my-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Clear Filters</title><polygon fill="#F57C00" points="29,23 19,23 7,9 41,9"></polygon><g fill="#FF9800"><polygon points="29,38 19,44 19,23 29,23"></polygon><path d="M41.5,9h-35C5.7,9,5,8.3,5,7.5v0C5,6.7,5.7,6,6.5,6h35C42.3,6,43,6.7,43,7.5v0C43,8.3,42.3,9,41.5,9z"></path></g><circle fill="#F44336" cx="38" cy="38" r="10"></circle><rect x="32" y="36" fill="#fff" width="12" height="4"></rect></svg>
                        </span>
                    </div>
                    <div className={theme.light ? "filter-content" : ""}>
                        {filterStrands.map((filterstrand, index) => (<div className="d-flex align-items-center justify-content-start" key={index}>
                            <Checkbox defaultChecked={false} sx={{ accentColor: "#99c8ff", outlineColor: "#fff", borderColor: "#fff", fontSize: { xs: 25, sm: 35, md: 38 } }} />
                            <Typography className="" sx={{ fontSize: { xs: 17, sm: 25, md: 38 } }} color={theme.light ? "#000" : "#fff"}>
                                {filterstrand}
                            </Typography>
                        </div>))}
                    </div>
                    <div className="">
                        <button className="bg-pink-600 rounded-pill text-light text-1xl p-2 px-3" onClick={() => setShowMobilefilter(false)}>
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default FilterBar;
