"use client";
import {stagger, useAnimate} from "framer-motion";
import {isLastLetterOfWord} from "@/lib/utils";
import React, {useEffect} from "react";

type LoaderProps = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Loader({setIsLoading}: LoaderProps) {
    const [scope, animate] = useAnimate();
    const text = "L'Amitié Éternelle";

    useEffect(() => {
        const letterElements = scope.current.querySelectorAll('.letter');

        const animationIntro = async () => {

            setIsLoading(true);
            await animate(letterElements,
                {opacity: [0, 1], x: [20, 0]},
                {duration: 0.5, ease: "easeOut", delay: stagger(0.1, {startDelay: 0.5})}
            );
            await animate("#title",
                {opacity: [0, 1], y: [20, 0]},
                {duration: 0.5, ease: "easeOut"},
            );

            await animate(letterElements,
                {opacity: [1, 0], x: [0, 0]},
                {duration: 0.5, ease: "easeIn", delay: stagger(0.1, {startDelay: 1, from: "last"})}
            );

            await animate("#title",
                {opacity: [1, 0], x: [0, 0]},
                {duration: 0.5, ease: "easeIn", delay: stagger(0.1, {startDelay: 0.2, from: "last"})}
            );

            await animate("#intro-wrapper",
                {opacity: [1, 0], display: "none"},
                {duration: 0.5, ease: "easeIn", delay: stagger(0.1, {startDelay: 0.5})  }
            );

            await animate("#text-loader",
                {y: [40, 0], opacity: [0, 1]},
                {duration: 0.5, ease: "easeInOut", damping: 20 ,delay: stagger(0.1, {startDelay: 0.5}), }
            );

            await animate("#loader-wrapper",
                {opacity: 0, display: "none"},
                {duration: 0.6, ease: "easeIn", delay: 5}
            );
            setIsLoading(false);



        };

        animationIntro();

    }, []);

    return (
        <div ref={scope} className="overflow-hidden">
            <div id="intro-wrapper"
                 className="absolute top-0 w-full min-h-screen flex items-center justify-center bg-white z-20">
                <div className="container mx-auto flex flex-col space-y-4 items-center">
                    <div id="words" className="font-silk text-4xl md:text-6xl text-primary flex">
                        {text.split('').map((letter, index) => (
                            <span key={index}
                                  className={`letter opacity-0 inline-block ${isLastLetterOfWord(index, text) ? 'mr-4' : ''}`}>
                                    {letter}
                                </span>
                        ))}
                    </div>
                    <p id="title" className="opacity-0 font-silk text-lg text-secondary italic">
                        Eternal friendship
                    </p>
                </div>
            </div>

            <div id="loader-wrapper"
                 className=" p-4 absolute top-0 w-full min-h-screen bg-white z-10 flex items-center justify-center">
                <p id="text-loader" className="opacity-0 max-w-lg text-xl font-silk text-primary">
                    Step into our world of friendship, where every day is an adventure and every moment is a chance to
                    create
                    unforgettable memories
                </p>
            </div>
        </div>
    );
}