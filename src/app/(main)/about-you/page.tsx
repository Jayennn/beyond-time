import AnimatedImage from "@/components/ui/AnimatedImage";
import {AnimatedTextStagger} from "@/components/ui/AnimatedText";

export default function AboutYou(){
    return (
        <div className="py-20 min-h-screen container mx-auto flex flex-col gap-8 overflow-x-hidden">
            <div className="ml-auto py-44">
                <AnimatedTextStagger
                    justify="end"
                    className="text-3xl"
                    word="A laugh, a hug, a smile, and anything
                    that can warm the loyal heart of friendship."
                />
            </div>
            {/*<p className="py-44 ml-auto font-silk max-w-lg text-right text-3xl">A laugh, a hug, a smile, and anything*/}
            {/*    that can warm the loyal heart of friendship.</p>*/}
            <AnimatedImage
                className="mb-44"
                src="/images/about-you/kopi_delapan.webp"
                alt="kopi-delapan"
                width={671}
                height={365}
            />
            <div className="mb-44">
                <AnimatedTextStagger
                    className="text-3xl"
                    word="The shared laughter and cherished memories"
                />
            </div>
            {/*<p className="mb-44 font-silk max-w-xl text-3xl">The shared laughter and cherished memories</p>*/}
            <AnimatedImage
                className="ml-8"
                src="/images/about-you/fore.webp"
                alt="fore-coffee"
                width={571}
                height={365}
            />
            <AnimatedImage
                className="mx-auto"
                src="/images/about-you/bowling.webp"
                alt="bowling-bigmall"
                width={671}
                height={365}
            />
            <div className="ml-auto mb-44">
                <AnimatedTextStagger
                    className="text-3xl"
                    word="...Waiting for a friend and a smile"
                />
            </div>
            {/*<p className="mb-44 ml-auto font-silk max-w-sm text-right text-3xl">...Waiting for a friend and a smile</p>*/}
            <AnimatedImage
                className="ml-auto"
                src="/images/about-you/hantu.webp"
                alt="rumah-hantu"
                width={471}
                height={365}
            />
            <AnimatedImage
                className="ml-auto"
                src="/images/about-you/rumah_elmy.webp"
                alt="rumah-hantu"
                width={671}
                height={365}
            />
            <p className="mb-44 font-silk text-left text-3xl">Thank You</p>
            <div className="flex flex-col md:flex-row items-center gap-4 overflow-hidden">
                <AnimatedImage  src="/images/about-you/studio(2).webp" alt="rumah-hantu" width={598} height={460}/>
                <AnimatedImage  src="/images/about-you/studio.webp" alt="rumah-hantu" width={598} height={460}/>
            </div>
        </div>
    );
}