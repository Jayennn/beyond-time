import {createClient} from '@/utils/supabase/server';
import {cookies} from 'next/headers';
import {CharacterDetailType} from "@/types/database/character";
import Image from "next/image";
import {AudioProvider, MusicPlayer} from "@/components/MusicPlayer";
import React from "react";

export default async function Page({params}: {params: {slug: string}}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const characterDetailQuery = await supabase
        .from('characters')
        .select(`
        name, 
        characters_detail (image, description, call_name_image),
        favorite_songs (*)
    `)
        .eq('slug', `${params.slug}`)
        .single();

    const {data, error} = characterDetailQuery;
    if(error) throw error;

    const characterDetail = data as unknown as CharacterDetailType;

    return (
        <>
            <section className="relative pt-16">

                <div className="relative flex items-center h-[185px] p-20 w-full">
                    <Image className="w-full absolute top-0 right-0 -z-10" quality={100}
                           src={characterDetail.characters_detail.image} alt="character-mutiara" width={1440}
                           height={185}/>
                    <div>
                        <h1 className="font-silk text-5xl text-white">{characterDetail.name}</h1>
                    </div>
                </div>
            </section>
            <section className="font-vietnam relative container mx-auto pt-14">
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-6 max-w-lg">
                        <h4 className="font-medium text-2xl text-primary">Description</h4>
                        <p className="text-sm text-secondary text-justify">{characterDetail.characters_detail.description}</p>
                    </div>

                    {/*Music Section*/}
                    <div className="w-full shadow p-5 rounded-md max-w-lg  flex flex-col gap-4">
                        <h4 className="font-medium text-primary text-base">Character&apos;s Favorite Songs ✨</h4>
                        <div className="flex flex-col space-y-4">
                            <AudioProvider>
                                {characterDetail.favorite_songs.length > 0 ? characterDetail.favorite_songs.map((song) => (
                                    <MusicPlayer
                                        key={song.id}
                                        song={song}
                                    />
                                )) : (
                                    <h1>No Songs 🥲</h1>
                                )}
                            </AudioProvider>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-44 font-vietnam container mx-auto relative flex items-center justify-center min-h-[50vh] overflow-hidden">
                <h4 className="text-2xl font-medium text-primary z-10">You can call me</h4>
                <div className="absolute">
                    {/*{characterDetail.characters_detail.call_name_image}*/}
                    <Image src={characterDetail.characters_detail.call_name_image} alt="mutiara" width={1440} height={288}/>
                </div>
            </section>
            <section className="font-vietnam pt-44">
                <div className="container mx-auto">
                    <div className="flex flex-col space-y-6 max-w-lg">
                        <h4 className="font-medium text-2xl text-primary">Quotes Corner</h4>
                        {/*<p className="text-sm text-secondary text-justify">{characterDetail.characters_detail}</p>*/}
                    </div>
                </div>
            </section>
        </>
    );
}
