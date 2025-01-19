import Tags from "@/components/tags";
import { ITagList } from "@/modals";
import tags from "@/utils/tags";
import { Box } from "@mui/material";
import React from "react";
import style from "./index.module.css";
import { useEffect } from "react";
interface ITheme {
    light: boolean;
    dark: boolean;
}
const TagSection: React.FC<{ theme: ITheme }> = ({ theme }) => {
   
    return (
        <div  className={`container`} >
            <div className="row gx-sm-1 gx-md-4 gy-5">
                {tags.map((key: ITagList, index: number) => <div className="col-sm-12 col-md-4" key={index}>
                    <Tags theme={theme} logo={key.logo} label={key.label} desciption={key.desciption} />
                </div>)}
            </div>
        </div>
    )
}
export default TagSection;