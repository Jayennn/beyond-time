"use client";
import {motion} from "framer-motion";
import {AnimatedText} from "@/components/ui/AnimatedText";
import Link from "next/link";

const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.50,
            delayChildren: 0.4
        },
    },
};

const imageVariant = {
    hidden: {
        height: "100%",
    },
    visible: {
        height: "0%",
        transition: {
            type: "spring",
            damping: 35,
            stiffness: 100,
        },
    },
};

export default function SeeCharacters() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <AnimatedText className="text-primary font-silk text-3xl mb-4" word="Characters"/>
            <motion.div
                className="grid grid-cols-9 gap-1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {[
                    "dafa", "syifa", "mutiara", "elmy", "salsa", "sarah", "vivian", "raja", "ivan"
                ].map((name) => (
                    <div
                        key={name}
                        className="relative flex items-center justify-center group"
                    >
                        
                        <h5 className="font-silk absolute capitalize text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {name}
                        </h5>
                        <Link href={`/see-characters/${name}`} className="relative overflow-hidden">
                            <motion.img
                                whileHover={{
                                    transform: "scale(1.06)",
                                    opacity: 0.2,
                                    transition: {
                                        type: "spring",
                                        damping: 35,
                                        stiffness: 100,
                                        ease: "linear",
                                        duration: 0.5
                                    }
                                }}
                                className="hover:scale-100 transition-all"
                                src={`/images/characters/${name}.webp`}
                                alt={`character-${name}`}
                                width={153}
                                height={415}
                            />
                            <motion.div variants={imageVariant} className="top-0 w-full absolute bg-white h-full"></motion.div>
                        </Link>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
