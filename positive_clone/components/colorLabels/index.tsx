import React from "react";
import styles from './index.module.css';
const ColorLabel: React.FC<{ hexcode: string }> = ({ hexcode }) => {
    return (
        <>
            <div className={styles.colorcontainer} style={{ backgroundColor: hexcode }}>
            </div>
        </>
    )
}
export default ColorLabel;