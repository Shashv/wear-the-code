"use client";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
const AosInitialize: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        Aos.init({
            duration: 2000
        });
        Aos.refresh();
    });
    return <>{children}</>;
}
export default AosInitialize;