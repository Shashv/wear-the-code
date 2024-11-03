import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./index.module.css";
import { GetServerSideProps } from "next";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Loader from "@/components/loader";
import CollectionSections from "@/sections/collections";
import { IState } from "./redux/sore";
import ThemeSection from "@/sections/themes";
import TagSection from "@/sections/tagssection";
import BestSelling from "@/sections/bestsale";
import { useEffect } from "react";
import { ContextObject } from "@/utils/context";
import { headers } from "next/headers";
interface IParas {
    props: {
        name: string
    }
}

export default function Home(props: { name: string, scrollTop: number, direction: string } | any) {
    // console.log("props", props);
    const rouerDetail = useRouter();
    let scrollDIrection: string = "";
    let [scrollDirection, setScrollDirection] = useState<string>("");
    // const { props } = params;s
    let theme = useSelector((state: IState) => state.toggletheme);
    //handle the scroll direction in the next js project//
    // useEffect(() => {
    //     let initialScrollY = window.scrollY;
    //     const handleScroll = (e: any) => {
    //         let scrollY = window.scrollY;
    //         console.log(scrollY);
    //         scrollDIrection = scrollY > initialScrollY ? "down" : "up";
    //         initialScrollY = scrollY;
    //         console.log(scrollDIrection);
    //         setScrollDirection(scrollDIrection);
    //     }

    //     window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     }
    // }, [scrollDirection]);
    useEffect(() => {
        props.scrollTop > 0 ? setScrollDirection("down") : setScrollDirection("up");
    }, []);
    return (
        <ContextObject.Provider value={props.direction}>
            <div className={theme.light ? "wrapper bg-white" : "wrapper bg-dark"}>
                <div className={style.customcontainer}>
                    <div className={style.wrapper}>
                        <img className={style.imgfirst} src="/home.jpg" />
                        <img className={style.imgthird} src="/onlinefirst.jpg" />
                        <img className={style.imgfourth} src="/onlinesecond.jpg" />
                        <img className={style.imgfifth} src="/onlinethird.jpg" />
                        <img className={style.imgsixth} src="/onlinefourth.jpg" />
                    </div>
                </div>
                <div className={theme.light ? "collections-container bg-light" : "collections-container"} style={{ backgroundColor: `${theme.dark && "#1f2937"}` }}>
                    {/* <Typography className="collection-heading" variant="h2">
                        COLLECTIONS
                    </Typography> */}
                    <CollectionSections theme={theme} />
                </div>
                <div className={theme.light ? "theme-sections bg-white" : "theme-sections bg-dark"}>
                    <ThemeSection theme={theme} />
                </div>
                <div style={{ backgroundColor: theme.dark ? "#1f2937" : "" }} className={theme.dark ? "best-selling px-5" : "best-selling-light bg-white px-5"}>
                    <BestSelling />
                </div>
                <div style={{ backgroundColor: theme.dark ? "#1f2937" : "#fff" }}>
                    <TagSection theme={theme} />
                </div>
            </div>
        </ContextObject.Provider>
    );
}
// export const getStaticProps = () => {
//     return {
//         props: {
//             name: "SHASHVAT GUPTA IS THE BLESSED BOY WITH THE HELP OF bAbaJI",
//         }
//     }
// }
// export const getServerSideProps = async (context: any) => {
//     // console.log(context);
//     return {
//         props: {
//             name: "Shashvat is the best coder in the Mohali",
//         }
//     }
// }
//CALLBAck hell //
//caLL BACK HELL IS THE PROCESS OF THE DEPENDENCY OF ONE FUnction onto the CAlling of aNOTHER FUNCION//
// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//     let cookies: any = context.req?.cookies;
//     console.log("Cookies on the home page request", cookies);
//     return {
//         props: {

//         }
//     }
// }q
interface IFirst<Type> {
    name: Type;
    positive: (parameter: Type) => Type;
    context: (number: Type) => Type;
}

interface Second {
    nameSecond?: string;
    ageSecond?: number;
}
interface Third extends IFirst<number>, Second {
    thirdName?: string | number;
    thirdArray?: Array<number> | Array<string>;
}
const variable: Third = {
    name: 10,
    positive: (age: number) => age * 2,
    context: (numberType: number) => numberType,
}