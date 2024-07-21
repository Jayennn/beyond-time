"use client";
import {AnimatedText} from "@/components/ui/AnimatedText";
import {motion, useAnimation, useInView, useScroll, useTransform} from "framer-motion";
import {useEffect, useRef} from "react";

type HomeSectionProps = {
    title: string;
    translate: string;
    images: {
        src: string;
        alt: string;
        width: number;
        height: number;
    }[];
};

export function HomeSection({ title, translate, images }: HomeSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["end end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const yTranslate = useTransform(scrollYProgress, [0, 1], ["1%", "100%"]);
    const isInView = useInView(sectionRef, { once: false, margin: "-30%" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const imageVariant = {
        hidden: {
            width: "100%",
        },
        visible: {
            width: "0",
            transition: {
                type: "spring",
                damping: 35,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            ref={sectionRef}
            animate={mainControls}
            initial="hidden"
            style={{ opacity, translateY: yTranslate}}
            className="flex items-center w-full h-screen"
        >
            <motion.div  style={{scale}} className="w-full fixed">
                <div className="min-h-screen flex items-center container mx-auto">
                    <div className="ml-[10rem] flex flex-col space-y-1 items-center text-primary">
                        <AnimatedText className="font-silk text-8xl" word={title} />
                        <p className="font-silk italic text-2xl">{translate}</p>
                    </div>
                </div>
                <div className="absolute h-fit right-0 bottom-0 flex flex-col  overflow-hidden">
                    {images.map((image) => (
                        // <AnimatedImage key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height}/>
                        <motion.img whileHover={{
                            transform: "scale(1.06)",
                            transition: {
                                type: "spring",
                                damping: 35,
                                stiffness: 100,
                                ease: "linear",
                                duration: 0.5
                            }
                        }}  className=" hover:scale-105 transition-all" key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} />
                    ))}
                    <motion.div variants={imageVariant} className="absolute bg-white h-full"></motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
