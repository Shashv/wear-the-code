import React from "react";
import { Container, Row, Col } from "reactstrap";
import style from "./index.module.css";
import { connect } from "react-redux";
import { IState } from "../redux/sore";
class Mugs extends React.Component<{} | { name: string; age: number }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "Initial Empty state",
            age: 21
        }
    }
    render(): JSX.Element {
        return (
            <>
                <div className="p-2">
                    <section className="text-gray-600 body-font">
                        <div className="container-fluid overflow-hidden px-4 py-24">
                            <div className="row g-4">
                                <div className={`col-12 col-md-3 ${style.card}`}>
                                    <div className={`${style.productImage}  ${style.gratitude}`}></div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                        <p className="mt-1">$16.00</p>
                                    </div>
                                </div>
                                <div className={`col-12 col-md-3 ${style.card}`}>
                                    <div className={style.second}></div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                        <p className="mt-1">$21.15</p>
                                    </div>
                                </div>
                                <div className={`col-12 col-md-3 ${style.card}`}>
                                    <div className={style.third}></div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                        <p className="mt-1">$12.00</p>
                                    </div>
                                </div>
                                <div className={`col-md-3 col-12 ${style.card}`}>
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="md:h-[36vh] h-[30vh] mx-auto" src="./mugsfourth.jpg" />
                                    </a>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                        <p className="mt-1">$18.40</p>
                                    </div>
                                </div>
                                <div className={`col-12 col-md-3 ${style.card}`}>
                                    <a className="block relative rounded overflow-hidden mx-auto">
                                        <img alt="ecommerce" className="md:h-[36vh] h-[30vh] mx-auto" src="./mugsfifth.png" />
                                    </a>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                        <p className="mt-1">$16.00</p>
                                    </div>
                                </div>
                                <div className={`col-12 col-md-3 ${style.card}`}>
                                    <a className="block relative rounded overflow-hidden mx-auto">
                                        <img alt="ecommerce" className="md:h-[36vh] h-[30vh] mx-auto" src="./mugssixth.png" />
                                    </a>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                        <p className="mt-1">$21.15</p>
                                    </div>
                                </div>
                                <div className={`col-12 col-md-3 ${style.card}`}>
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="md:h-[36vh] h-[30vh] mx-auto" src="./mugsseventh.jpg" />
                                    </a>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                        <p className="mt-1">$12.00</p>
                                    </div>
                                </div>
                                <div className={`col-12 col-md-3 ${style.card}`}>
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="md:h-[36vh] h-[30vh] mx-auto" src="./mugsninth.jpg" />
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
    componentDidMount(): void {

    }
    componentWillUnmount(): void {

    }
    componentDidUpdate(previousProps: Readonly<{}>, previousState: Readonly<{}>): void {

    }
    componentWillUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>): void {

    }
}
export default Mugs;
const mapStateToProps = (state: IState) => {
    return {
        theme: state.toggletheme
    }
}
    ;