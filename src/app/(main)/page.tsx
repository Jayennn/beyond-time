"use client";
import {useRef, useState} from "react";
import {HomeSection} from "@/components/HomeSection";
import {Loader} from "@/components/Loader";

export default function Home() {

    const [isLoading, setIsLoading] = useState(false);
    const mainRef = useRef(null);



    return (
        <>
            <Loader setIsLoading={setIsLoading}/>
            <main ref={mainRef} className="relative min-h-screen overflow-y-hidden space-y-6">
                {!isLoading && (
                    <>
                        <HomeSection
                            title="Amitié"
                            translate="friendship"
                            images={[
                                { src: "/images/amitie.webp", alt: "Amitié", width: 654, height: 249 }
                            ]}
                        />
                        <HomeSection
                            title="Belle âme"
                            translate="beautiful soul"
                            images={[
                                { src: "/images/belleAme-1.webp", alt: "Beautiful Girls", width: 354, height: 369 },
                                { src: "/images/belleAme-2.webp", alt: "Beautiful Girls", width: 354, height: 320 }
                            ]}
                        />
                        <HomeSection
                            title="Crois en toi"
                            translate="Believe in yourself"
                            images={[
                                { src: "/images/croisentoi.webp", alt: "Crois en toi", width: 513, height: 311 }
                            ]}
                        />
                    </>
                )}


            </main>
        </>
    );
}
