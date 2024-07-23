
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
};

type CharacterSongType = {
    favorite_songs: FavoriteSongType;
};

export type CharacterDetailType = {
    name: string;
    description: string;
    favorite_songs: FavoriteSongType[];
};