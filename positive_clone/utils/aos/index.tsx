"use client";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
// const AosInitialize: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     useEffect(() => {
//         Aos.init(
//             {
//                 duration: 2000,
//                 once: false,
//                 mirror:true
//             }
//         );
//         window.addEventListener("load",() => {
//             Aos.refresh()
//         })
//         // return () => Aos.refresh();
//     });
//     return <>{children}</>;
// }
const AosInitialize = () => {
    // console.log("Babaji will")
    useEffect(() => {
        Aos.init({
            once:false
        })
    },[]);
    return null
}
export default AosInitialize;