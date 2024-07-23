import {SeeCharactersSection} from "@/components/SeeCharactersSection";
import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {CharacterType} from "@/types/database/character";


export default async function SeeCharacters() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const charactersQuery  = await supabase
        .from("characters")
        .select("id, name, nick_name, image, slug")
        .order("id", {ascending: true});

    const {data, error} = charactersQuery;

    if(error) throw error;

    const characters: CharacterType[] = data;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
           <SeeCharactersSection
                characters={characters}
           />
        </div>
    );
}
