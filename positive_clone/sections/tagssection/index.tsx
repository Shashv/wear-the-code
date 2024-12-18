import Tags from "@/components/tags";
import { ITagList } from "@/modals";
import tags from "@/utils/tags";
import { Box } from "@mui/material";
import React from "react";
import { useInView } from "react-intersection-observer";
import style from "./index.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
interface ITheme {
    light: boolean;
    dark: boolean;
}
const TagSection: React.FC<{ theme: ITheme }> = ({ theme }) => {
    const { ref, inView } = useInView({
        threshold: 0
    });
    useEffect(() => {
        Aos.init({
            duration: 400
        });
    }, []);
    return (
        <>
            <Box data-aos-animate={"zoom-in-up"} sx={{ backgroundColor: theme.light ? "#fff" : "#1f2937" }} component={"div"} className={theme.light ? `py-4 container-fluid` : `py-4 container-fluid`} style={{ paddingRight: "52px", paddingLeft: "52px" }}>
                <div className="row gx-5">
                    {tags.map((key: ITagList, index: number) => <div className="col-4">
                        <Tags theme={theme} logo={key.logo} label={key.label} desciption={key.desciption} />
                    </div>)}
                </div>
            </Box>
        </>
    )
}
export default TagSection;