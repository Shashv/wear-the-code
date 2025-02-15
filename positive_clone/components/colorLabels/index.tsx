import React, { Key } from "react";
import styles from './index.module.css';
const ColorLabel: React.FC<{ hexcode: string, key?: Key; selected?: boolean, onClick?: React.MouseEventHandler<HTMLDivElement | HTMLParagraphElement> }> = ({ hexcode, selected, onClick }) => {
    return (
        <>
            <div onClick={onClick} className={`cursor-pointer ${styles.colorcontainer}`} style={{ backgroundColor: hexcode ? hexcode : "blue", outline: selected ? "2px solid gold" : "transparent" }}>
            </div>
        </>
    )
}
export default ColorLabel;