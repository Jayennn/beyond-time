"use client";
import {ReactNode, useEffect} from "react";
import {NavigationBar} from "@/components/NavigationBar";
import Lenis from "lenis";

export default function MainLayout(
    {children}: { children: ReactNode }
) {
    useEffect(() => {
        const lenis = new Lenis();


        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (
        <main>
            <NavigationBar/>
            {children}
        </main>
    );
}