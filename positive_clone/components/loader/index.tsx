//react spinner//
// import React from "react";
// import { Spinner } from "reactstrap";
// import { ISpinner } from "../../modals/index";
// import style from "./index.module.css";
// const Loader: React.FC<ISpinner> = ({ show, size, color }) => {
//     return (
//         <div className={`${style.backdrop} backdrop flex flex-row justify-center align-items-center`}>
//             <Spinner style={{ height: size, width: size, zIndex: 1 }} color={color} type={"grow"} />
//         </div>
//     )
// }
// export default Loader;
//custom loader with the css animation//
import React from "react";
import style from "./index.module.css";
const Loader: React.FC = () => {
    return (
        <div className={style.maincontainer}>
            <div className={style.loadercontainer}>
                <span className={`${style.loader} ${style.first}`} id="first"></span>
                <span className={`${style.loader} ${style.second}`} id="second"></span>
                <span className={`${style.loader} ${style.third}`} id="third"></span>
                <span className={`${style.loader} ${style.fourth}`} id="fourth"></span>
                <span className={`${style.loader} ${style.fifth}`} id="fifth"></span>
                <span className={`${style.loader} ${style.sixth}`} id="sixth"></span>
                <span className={`${style.loader} ${style.seventh}`} id="seventh"></span>
                <span className={`${style.loader} ${style.eight}`} id="eight"></span>
                <span className={`${style.loader} ${style.ninth}`} id="ninth"></span>
                <span className={`${style.loader} ${style.tenth}`} id="tenth"></span>
                <span className={`${style.loader} ${style.eleventh}`} id="eleventh"></span>
                <span className={`${style.loader} ${style.twelth}`} id="twelth"></span>
                <span className={`${style.loader} ${style.thirteenth}`} id="thirteenth"></span>
                <span className={`${style.loader} ${style.fourteenth}`} id="fourteenth"></span>
                <span className={`${style.loader} ${style.fifteenth}`} id="fifteenth"></span>
                <span className={`${style.loader} ${style.sixteenth}`} id="sixteenth"></span>
                <span className={`${style.loader} ${style.seventeenth}`} id="seventeenth"></span>
                <span className={`${style.loader} ${style.eighteenth}`} id="eighteenth"></span>
                <span className={`${style.loader} ${style.ninteenth}`} id="ninteenth"></span>
                <span className={`${style.loader} ${style.twenty}`} id="twenty"></span>
            </div>
        </div>
    )
}
export default Loader;