import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import style from "./index.module.css";
import { ITagList } from "@/modals";
import { ContextObject } from "@/utils/context";
import { useInView } from "react-intersection-observer";
const Tags: React.FC<ITagList> = ({ logo, label, desciption, theme }) => {
    const direction: string = useContext(ContextObject);
    const { ref, inView } = useInView();
    return (
        <>
            <Card className={theme.light ? `rounded-3 ${style.tagcardlight}` : theme.dark ? `rounded-3 ${style.tagcarddark}` : ``}>
                <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                    <span className={style.tagicon}>{logo}</span>
                    <span className={theme.light ? "tag-label fs-5 fw-bold text-dark" : "tag-label fs-5 fw-bold dark text-light"}>{label}</span>
                    <span className={theme.light ? "tag-decription text-center fs-6" : "tag-description text-center fs-6 text-light"}>
                        {desciption}
                    </span>
                </Card.Body>
            </Card>
        </>
    )
}
export default Tags;