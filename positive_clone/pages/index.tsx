// import Image from "next/image";
// import { Box, Typography } from "@mui/material";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
import style from "./index.module.css";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
// import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
// import Loader from "@/components/loader";
import CollectionSections from "@/sections/collections";
import { IState } from "@/redux/sore";
import ThemeSection from "@/sections/themes";
import TagSection from "@/sections/tagssection";
import BestSelling from "@/sections/bestsale";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
// import { headers } from "next/headers";
import { Session } from "next-auth";
import authorizeOptions from "./api/auth/[...nextauth]";
import Aos from 'aos';
import "aos/dist/aos.css"
import { toast } from "react-toastify";
import SlickSlides from "@/components/slickSlides";
import { ICustomSession } from "@/modals";
// interface IParas {
//     props: {
//         name: string
//     }
// }
export default function Home(props: { name: string, scrollTop: number, direction: string, session?: Session, image?: string } | any) {
    // const rouerDetail = useRouter();
    const sessionStatus = useSession();
    // scroll events babaji//
    // let scrollDIrection: string = "";
    // let [scrollDirection, setScrollDirection] = useState<string>("");
    // const session = useSession();
    // ....//
    let theme = useSelector((state: IState) => state.toggletheme);
    useEffect(() => {
        // console.log("Session status", sessionStatus.data?.user.id);
        localStorage.setItem("user_id", sessionStatus.data?.user.id || "");
        localStorage.setItem('user_email', sessionStatus.data?.user.email || "");
        Aos.init({ once: false });
        if (localStorage.getItem("toastShown") || sessionStatus.status === "unauthenticated") {
            console.log(localStorage.getItem("toastShown"))
        }
        else {
            localStorage.setItem("toastShown", "positive");
            props.name ?
                toast.success(`Welcome to Codeswear ${props.name}`, {
                    theme: theme.light ? "light" : "dark",
                    draggable: false,
                    autoClose: 2500,
                }) : null;
        }
    }, []);
    return (
        <>
            {/* component based slick slides */}
            {/* <SlickSlides /> */}
            {/* ... */}
            <div className={theme.light ? "wrapper bg-white" : "wrapper bg-dark"}>
                {/* ...slick slided with custom css */}
                <div className={style.customcontainer}>
                    <div className={style.wrapper}>
                        <img className={style.imgfirst} src="/home.jpg" />
                        <img className={style.imgthird} src="/onlinefirst.jpg" />
                        <img className={style.imgfourth} src="/onlinesecond.jpg" />
                        <img className={style.imgfifth} src="/onlinethird.jpg" />
                        <img className={style.imgsixth} src="/onlinefourth.jpg" />
                    </div>
                </div>
                {/*... slickes slides .... */}
                <div className={"collections-container"} style={{ backgroundColor: `${theme.dark ? "#1f2937" : "#fff"}` }}>
                    <CollectionSections theme={theme} />
                </div>
                <div style={{ backgroundColor: `${theme.dark ? "#1f2937" : "#fff"}` }}>
                    <ThemeSection theme={theme} />
                </div>
                <div style={{ backgroundColor: theme.dark ? "#1f2937" : "" }} className={theme.dark ? "best-selling px-5" : "best-selling-light bg-white px-5"}>
                    <BestSelling />
                </div>
                <div style={{ backgroundColor: theme.dark ? "#1f2937" : "#fff" }}>
                    <TagSection theme={theme} />
                </div>
            </div>
        </>
    );
}
// server side function calling...//
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, authorizeOptions) as ICustomSession;
    // console.log("session positive", session);
    if (session) {
        return {
            props: {
                // session: session,
                name: session.user.name,
                email: session.user.email,
                image: session.user?.image || ""
            }
        }
    }
    else {
        return {
            props: {}
            // redirect: {
            //     permanent: false,
            //     destination: "/authentication/login"
            // }
        }
    }
}
// .....//

