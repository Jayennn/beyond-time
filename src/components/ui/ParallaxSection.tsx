"use client";
import {motion, useAnimation, useInView, Variants} from "framer-motion";
import {useEffect, useRef} from "react";
import {cn} from "@/lib/cn";

type ParallaxSectionProps = {
    children: React.ReactNode;
    className?: string;
    index: number;
};

const ParallaxSection = ({children, className, index}: ParallaxSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const sectionVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            y: -100,
            transition: {
                duration: 1,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            exit="exit"
            variants={sectionVariants}
            className={cn("min-h-screen flex items-center justify-center", className)}
            style={{perspective: "1000px"}}
        >
            {children}
        </motion.div>
    );
};

export default ParallaxSection;
