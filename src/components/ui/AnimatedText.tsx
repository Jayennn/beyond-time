"use client";
import {motion, useAnimation, useInView, type Variants} from "framer-motion";
import {cn} from "@/lib/cn";
import {useEffect, useRef} from "react";

type AnimatedPropsType = {
    className?: string,
    word: string,
}

const container: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.04
        },
    },
};

const AnimatedText = ({word, className}: AnimatedPropsType) => {
    let letters = word.split("");
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);



    const child: Variants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 35,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 20, // Animate from right to left
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            }
        },
        exit: {
            opacity: 0,
            x: 0,
            transition: {
                type: "spring",
                damping: 35,
                stiffness: 100,
            }
        }
    };

    const isLastLetterOfWord = (index: number) => {
        const nextChar = word[index + 1];
        return nextChar === ' ' || nextChar === undefined;
    };

    return (
        <motion.div
            ref={ref}
            variants={container}
            className="overflow-hidden relative flex flex-wrap"
            initial="hidden"
            animate={mainControls}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className={cn(className, "inline-block", isLastLetterOfWord(index) ? "mr-4" : "")}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

const AnimatedTextStagger = ({word, className, justify}: AnimatedPropsType & { justify?: string }) => {
    const letters = word.split(" ");
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});
    const controls = useAnimation();

    useEffect(() => {
        if(isInView){
            controls.start("visible");
        }

        return () => {
            controls.stop();
        };
    }, [isInView, controls]);

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.04 * i
            },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 40,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            }
        }
    };

    return (

        <motion.div
            ref={ref}
            variants={container}
            className={`overflow-hidden relative flex flex-wrap max-w-lg justify-${justify}`}
            initial="hidden"
            animate={controls}
        >
            {letters.map((word, index) => (
                <motion.span
                    variants={child}
                    className={cn("font-silk", className)}
                    key={index}
                    style={{marginRight: "5px"}}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export {
    AnimatedText,
    AnimatedTextStagger,
};
