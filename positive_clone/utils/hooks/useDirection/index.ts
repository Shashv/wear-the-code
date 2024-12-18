import React from "react";
import { useState, useEffect } from "react";
const useDirection: () => string = () => {
    let [scrollDirection, setScrollDirection] = useState<string>("neutral");

    useEffect(() => {

        if (typeof window === 'undefined') return
        else {
            // console.log("Inside the scrolling binded function", scrollDirection);
            let initialScrollY = window.pageYOffset;
            // console.log(initialScrollY);
            const fetchDirection = (e: any) => {
                // console.log(e);
                let scrollY = window.pageYOffset;
                let direction: string = scrollY > initialScrollY ? "down" : "up";
                // setScrollDirection(direction);
                initialScrollY = scrollY;
                // console.log("Inside the scrolling binded function", direction);
            }
            window.addEventListener("scroll", () => console.log("Inside the scroll binded fucntion"));
        }
    });
    return scrollDirection;
}
export default useDirection;
