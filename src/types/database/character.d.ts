
export type CharacterType = {
    id: number,
    name: string,
    nick_name: string,
    image: string,
    slug: string,
}

type FavoriteSongType = {
    id: number;
    title: string;
    artist: string;
    image_album: string;
    song_url: string;
};

type CharacterSongType = {
    favorite_songs: FavoriteSongType;
};

export type CharacterDetailType = {
    name: string;
    characters_detail: {
        image: string,
        description: string,
        call_name_image: string
    };
    favorite_songs: FavoriteSongType[];
};