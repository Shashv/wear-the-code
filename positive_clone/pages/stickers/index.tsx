import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import StyledToast from "@/components/toast";
import style from "./index.module.css";
import { useSelector } from "react-redux";
import { IState } from "../redux/sore";
import { useEffect } from "react";
const StickersPage: React.FC = (props: any) => {
    let [toast, setToast] = useState<boolean>(false);
    const combinedState = useSelector((state: IState) => state.toggletheme);
    const hideToast: (e: React.MouseEvent) => void = (e) => {
        setToast(false);
    }
    const onScroll: (e: any) => void = (e) => {
        console.log("scroll event", e);
    }
    useEffect(() => {
        console.log("Toggle theme using the redux", combinedState);
        return () => console.log("I am the function to be run on the clean up");
    }, []);
    return (
        <>
            <div className={combinedState.dark ? "p-2 bg-dark" : "p-2 bg-light"} onScroll={onScroll}>
                <section className="text-gray-600 body-font">
                    <div className="container-fluid overflow-hidden px-5 py-20">
                        <div className="row gx-4">
                            <div className={`${style.card} cursor-pointer col-12 col-md-3`}>
                                <a className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="md:h-[36vh] h-[30vh] shadow-lg mx-auto" src="./sticekrs.jpg" />
                                </a>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                    <p className="mt-1">$16.00</p>
                                </div>
                            </div>
                            <div className={`${style.card} col-12 col-md-3 cursor-pointer`}>
                                <a className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="md:h-[36vh] h-[30vh] shadow-lg mx-auto" src="./stickerssecond.jpg" />
                                </a>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                    <p className="mt-1">$21.15</p>
                                </div>
                            </div>
                            <div className={`cursor-pointer col-12 col-md-3 ${style.card}`}>
                                <a className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="md:h-[36vh] h-[30vh] shadow-lg mx-auto" src="./stickersthird.jpg" />
                                </a>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                    <p className="mt-1">$12.00</p>
                                </div>
                            </div>
                            <div className={`col-12 col-md-3 cursor-pointer ${style.card}`}>
                                <a className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="md:h-[36vh] shadow-lg rounded-2 h-[30vh] mx-auto" src="./stickersfourth.jpg" />
                                </a>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                    <p className="mt-1">$18.40</p>
                                </div>
                            </div>
                            <div className={`col-12 col-md-3 ${style.card} cursor-pointer`}>
                                <a className="block relative rounded overflow-hidden mx-auto">
                                    <img alt="ecommerce" className="md:h-[36vh] h-[30vh] shadow-lg mx-auto" src="./stickersfifith.jpg" />
                                </a>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                    <p className="mt-1">$16.00</p>
                                </div>
                            </div>
                            <div className={`col-12 col-md-3 cursor-pointer ${style.card}`}>
                                <a className="block relative rounded overflow-hidden shadow-lg mx-auto">
                                    <img alt="ecommerce" className="md:h-[36vh] h-[30vh] shadow-lg mx-auto" src="./stickerssixth.jpg" />
                                </a>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                    <p className="mt-1">$21.15</p>
                                </div>
                            </div>
                            <div className={`col-12 col-md-3 ${style.card} cursor-pointer`}>
                                <a className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="md:h-[36vh] h-[30vh] shadow-lg mx-auto" src="./stickersseventh.jpg" />
                                </a>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                    <p className="mt-1">$12.00</p>
                                </div>
                            </div>
                            <div className={`col-12 col-md-3 cursor-pointer ${style.card}`}>
                                <a className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="md:h-[36vh] h-[30vh] shadow-lg mx-auto" src="./stickerseight.jpg" />
                                </a>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                    <p className="mt-1">$18.40</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default StickersPage;
