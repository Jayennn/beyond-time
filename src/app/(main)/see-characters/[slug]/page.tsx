import {createClient} from '@/utils/supabase/server';
import {cookies} from 'next/headers';
import {CharacterDetailType} from "@/types/database/character";
import Image from "next/image";
import {AudioProvider, MusicPlayer} from "@/components/MusicPlayer";
import React from "react";

export const revalidate = 0;

export default async function Page({params}: {params: {slug: string}}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const characterDetailQuery = await supabase
        .from('characters')
        .select(`
        name, 
        description,
        banner,
        list_names_image,
        favorite_songs (*)
    `)
        .eq('slug', `${params.slug}`)
        .single();

    const {data, error} = characterDetailQuery;
    if(error) throw error;

    if(!data) return  <h1>Loading</h1>;

    const characterDetail = data as unknown as CharacterDetailType;

    return (
        <>
            <section className="relative pt-16">
                <div className="bg-black/30 relative flex flex-col gap-4 lg:flex-row md:items-center md:justify-between h-[185px] p-4 lg:p-20 w-full">
                    <div>
                        <h1 className="font-silk text-4xl md:text-5xl text-white">{characterDetail.name}</h1>
                    </div>
                    {characterDetail.banner && (
                        <Image className="rounded-md shadow max-w-lg w-full" quality={100} src={characterDetail.banner} alt={`character-${characterDetail.name}`} width={450} height={185}/>
                    )}
                </div>
            </section>
            <section className="font-vietnam relative container mx-auto py-14">
                <div className="flex flex-col lg:flex-row md:justify-between space-y-6 lg:space-y-0">
                    <div className="flex flex-col space-y-3 md:space-y-6 lg:max-w-lg">
                        <h4 className="font-medium text-2xl text-primary">Description</h4>
                        <p className="text-sm text-secondary text-justify">{characterDetail?.description}</p>
                    </div>

                    {/*Music Section*/}
                    <div className="w-full shadow p-5 rounded-md lg:max-w-lg  flex flex-col gap-4">
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
            <section className="hidden mt-44 font-vietnam container mx-auto relative md:flex items-center justify-center min-h-[50vh] overflow-hidden">
                <h4 className="text-2xl font-medium text-primary z-10">You can call me</h4>
                <div className="absolute">
                    <Image className="object-contain" src={characterDetail.list_names_image} alt={`${characterDetail.name}-names`} quality={100} width={1440} height={288}/>
                </div>
            </section>
        </>
    );
}
