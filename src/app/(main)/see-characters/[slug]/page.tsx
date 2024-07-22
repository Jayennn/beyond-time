import {createClient} from '@/utils/supabase/server';
import {cookies} from 'next/headers';
import Image from "next/image";
import {Play} from "lucide-react";

export default async function Page({params}: {params: {slug: string}}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // const { data: character } = await supabase
    //     .from('characters')
    //     .select(`
    //         *,
    //         favorite_songs:favorite_songs_id (*)
    //     `);
    //
    // console.log(params.slug);
    const {data: character  } = await supabase
        .from('characters')
        .select(`
            *,
            characters_songs (
                favorite_songs:favorite_songs_id (*)
            )
        `)
        // .eq('characters.name', `${params.slug}`)
    ;

    return (
        /*<pre>
            {JSON.stringify(character, null, 2)}
        </pre>*/
        <section className="font-vietnam  relative min-h-screen pt-16">
            <div className="relative flex items-center h-[185px] p-20">
                <Image className="absolute top-0 right-0 -z-10" quality={100} src="/images/characters-detail/character-mutiara.svg" alt="character-mutiara" width={1440} height={185}/>
                <div>
                    <h1 className="font-silk text-5xl text-white">Mutiara Diva Maharani</h1>
                </div>
            </div>
            <div className="container mx-auto pt-14">
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-6 max-w-lg">
                        <h4 className="font-medium text-2xl text-primary">Description</h4>
                        <p className="text-sm text-secondary text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque blanditiis, deleniti et praesentium ullam voluptatum! Ad adipisci alias at culpa delectus eligendi et ex fugiat hic id neque optio quaerat quas ratione sit soluta temporibus tenetur, veniam voluptas voluptate! Assumenda eligendi enim, quasi sapiente totam vel voluptate. A accusamus alias aliquam aperiam asperiores aut, beatae commodi deleniti eaque error ex exercitationem fugiat harum illo ipsa ipsam laboriosam libero minus modi necessitatibus nemo nesciunt nihil nulla odit officia optio possimus provident quae quam quia quis reprehenderit saepe sit soluta sunt vero voluptatibus. Debitis eaque exercitationem expedita incidunt inventore iste sapiente!</p>
                    </div>

                    {/* Music Section */}
                    <div className="w-full shadow p-5 rounded-md max-w-lg  flex flex-col gap-4">
                        <h4 className="font-medium text-primary text-base">Character&apos;s Favorite Songs ✨</h4>
                        <div className="flex flex-col space-y-4">
                            {/* Music Player */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Image src="/music.svg" alt="music player" width={50} height={50}/>
                                    <div className="flex flex-col">
                                        <h3 className="text-sm text-primary">Trajectories</h3>
                                        <p className="text-xs text-secondary">Bruno Major</p>
                                    </div>
                                </div>
                                <Play className="w-4 h-4 text-secondary" strokeWidth={2}/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Image src="/music.svg" alt="music player" width={50} height={50}/>
                                    <div className="flex flex-col">
                                        <h3 className="text-sm text-primary">Trajectories</h3>
                                        <p className="text-xs text-secondary">Bruno Major</p>
                                    </div>
                                </div>
                                <Play className="w-4 h-4 text-secondary" strokeWidth={2}/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Image src="/music.svg" alt="music player" width={50} height={50}/>
                                    <div className="flex flex-col">
                                        <h3 className="text-sm text-primary">Trajectories</h3>
                                        <p className="text-xs text-secondary">Bruno Major</p>
                                    </div>
                                </div>
                                <Play className="w-4 h-4 text-secondary" strokeWidth={2}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
