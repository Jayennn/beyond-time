import {createClient} from '@/utils/supabase/server';
import {cookies} from 'next/headers';
import {CharacterDetailType} from "@/types/database/character";
import {Play} from "lucide-react";
import Image from "next/image";

export default async function Page({params}: {params: {slug: string}}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const characterDetailQuery = await supabase
        .from('characters')
        .select(`
        name, 
        description,
        favorite_songs (*)
    `)
        .eq('slug', `${params.slug}`)
        .single();

    const {data, error} = characterDetailQuery;
    if(error) throw error;

    const characterDetail: CharacterDetailType = data;

    return (
        <section className="font-vietnam  relative min-h-screen pt-16">
            {/* <pre>
                {JSON.stringify(characterDetail, null, 2)}
            </pre>*/}
            <div className="relative flex items-center h-[185px] p-20 w-full">
                <Image className="w-full absolute top-0 right-0 -z-10" quality={100} src="/images/characters-detail/character-mutiara.svg" alt="character-mutiara" width={1440} height={185}/>
                <div>
                    <h1 className="font-silk text-5xl text-white">{characterDetail.name}</h1>
                </div>
            </div>
            <div className="relative container mx-auto pt-14">
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-6 max-w-lg">
                        <h4 className="font-medium text-2xl text-primary">Description</h4>
                        <p className="text-sm text-secondary text-justify">{characterDetail.description}</p>
                    </div>

                     {/*Music Section*/}
                    <div className="w-full shadow p-5 rounded-md max-w-lg  flex flex-col gap-4">
                        <h4 className="font-medium text-primary text-base">Character&apos;s Favorite Songs ✨</h4>
                        <div className="flex flex-col space-y-4">
                             {/*Music Player*/}
                            {characterDetail.favorite_songs.length > 0 ? characterDetail.favorite_songs.map((song) => (
                                <div key={song.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Image src="/music.svg" alt="music player" width={50} height={50}/>
                                        <div className="flex flex-col">
                                            <h3 className="text-sm text-primary">{song.title}</h3>
                                            <p className="text-xs text-secondary">{song.artist}</p>
                                        </div>
                                    </div>
                                    {}
                                    <Play className="w-4 h-4 text-secondary" strokeWidth={2}/>
                                </div>
                            )) : (
                                <h1>No Songs 🥲</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
