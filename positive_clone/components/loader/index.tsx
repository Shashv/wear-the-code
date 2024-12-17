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

const LoaderAnimate = () => {
    return (
        <>
            <div className={style.codeswear}>
                <span className={`${style.loaderletter} ${style.L}`}>L</span>
                <span className={`${style.loaderletter} ${style.O}`}>O</span>
                <span className={`${style.loaderletter} ${style.A}`}>A</span>
                <span className={`${style.loaderletter} ${style.D}`}>D</span>
                <span className={`${style.loaderletter} ${style.I}`}>I</span>
                <span className={`${style.loaderletter} ${style.N}`}>N</span>
                <span className={`${style.loaderletter} ${style.G}`}>G</span>
                <span className={`${style.loaderdot} ${style.first}`}>.</span>
                <span className={`${style.loaderdot} ${style.second}`}>.</span>
                <span className={`${style.loaderdot} ${style.third}`}>.</span>
            </div>
        </>
    )
}
export default LoaderAnimate;