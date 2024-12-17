import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { Slides } from "@/modals";
const SlickSlides: React.FC<Slides> = ({ visibleSlides }) => {
    const images: Array<string> = ["/home.jpg", "/onlinefirst.jpg", "/onlinesecond.jpg", "/onlinethird.jpg", "/onlinefourth.jpg"];
    let slideWidth: number;
    let slidesContainer: any;
    let slides: any;
    let initialPosition: string;
    let eachSlide: any;
    let slideFirst: HTMLImageElement;
    let slideLast: HTMLImageElement;
    let positionStart: number;
    let positionEnd: number;
    let index: number = 0;
    let slidesLength: number;
    let intervalId: any;
    const extractNumberfromstring: (stringValue: string) => number = (stringValue: string) => {
        return Math.abs(parseFloat(stringValue));
    }
    const shiftSlide = (direction: number, slideWidth: number, action?: string) => {
        if (direction === 1) {
            index++;
            slidesContainer.style.transition = "linear 1s";
            slidesContainer.style.left = `-${extractNumberfromstring(initialPosition) + extractNumberfromstring(String(slideWidth))}px`;
            initialPosition = `-${extractNumberfromstring(initialPosition) + extractNumberfromstring(String(slideWidth))}px`;

        }
        else if (direction === -1) {
            index--;
            slidesContainer.style.transition = "linear 1s";
            slidesContainer.style.left = `${Number(initialPosition.split("p")[0]) + slideWidth}px`;
            initialPosition = `${Number(initialPosition.split("p")[0]) + slideWidth}px`;
        }
        if (action === "manual") {
            clearInterval(intervalId);
        }
    }
    function checkIndex(indexcheck: number) {
        if (indexcheck === images.length) {
            index = 0;
            slidesContainer.style.transition = "none";
            slidesContainer.style.left = `-${window.innerWidth}px`;
            initialPosition = `-${window.innerWidth}px`;
        }
        else if (indexcheck === -1) {
            index = images.length - 1;
            slidesContainer.style.transition = "none";
            slidesContainer.style.left = `-${(images.length) * extractNumberfromstring(String(slideWidth))}px`;
            initialPosition = `-${(images.length) * extractNumberfromstring(String(slideWidth))}px`
        }
    }
    useEffect(() => {
        let acitveIndexes = images.slice(index, index + 3);
        slidesContainer = document.getElementById("slidesContainer");
        initialPosition = getComputedStyle(slidesContainer).left;
        slides = slidesContainer?.getElementsByClassName("slide");
        slidesLength = slides.length;
        eachSlide = slides[0];
        slideFirst = slides[0];
        slideLast = slides[slides.length - 1];
        slidesContainer.appendChild(slideFirst.cloneNode(true));
        slidesContainer.insertBefore(slideLast.cloneNode(true), slideFirst);
        slidesContainer.addEventListener("transitionend", (e: React.TransitionEvent) => {
            checkIndex(index);
        });
        slideWidth = extractNumberfromstring(getComputedStyle(slideFirst).width);
        intervalId = setInterval(() => {
            shiftSlide(1, slideWidth);
        }, 2000);
    }, []);
    return (
        <>
            <div className={styles.slickSlider}>
                <button className={`${styles.previousslide} previous-slide ${styles.slideaction} btn btn-outline-primary`} onClick={(e: React.MouseEvent) => shiftSlide(-1, slideWidth)}>
                    Previous
                </button>
                <div className={styles.wrapper}>
                    <div className={`${styles.slides}`} id="slidesContainer">
                        {images.map(color => <div className={`${styles.slide} slide`} key={color}> <img alt="loader" className="w-100 h-100" key={color} src={color} /></div>)}
                    </div>
                </div>
                <button className={`${styles.nextslide} btn ${styles.slideaction} btn-outline-info`} onClick={(e: React.MouseEvent) => shiftSlide(1, Number(slideWidth))}>Next</button>
            </div>
        </>
    )
}
export default SlickSlides;