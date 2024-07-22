"use client";
import React, {useEffect, useRef} from 'react';
import {motion, useAnimation, useInView} from 'framer-motion';
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {cn} from "@/lib/cn";

type AnimatedImageProps = {
    src: string | StaticImport;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

function AnimatedImage({ src, alt, width, height, className }: AnimatedImageProps) {

    const ref = useRef<HTMLImageElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            console.log(isInView);
            controls.start("visible");
        }

        return () => {
            controls.stop();
        };

    }, [isInView, controls]);

    const slide = {
        hidden: {
            translateX: "0%"
        },
        visible: {
            translateX: "101%",
            display: "none",
            transition: {
                type: "spring",
                damping: 35,
                stiffness: 100,
                delay: 0.5
            },
        }
    };

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            className={cn("relative flex mb-44", className)}
        >
            <Image src={src} alt={alt} width={width} height={height} />
            <motion.div variants={slide} className="absolute top-0 h-full w-full bg-white"></motion.div>
        </motion.div>
    );
};

export default AnimatedImage;
