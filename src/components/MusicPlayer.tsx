"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import Image from "next/image";
import {Pause, Play} from "lucide-react";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {cn} from "@/lib/cn";

type Song = {
    id: number;
    title: string;
    artist: string;
    image_album: string | StaticImport;
    song_url: string;
};

type AudioContextType = {
    currentSong: Song | null;
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
    audio: HTMLAudioElement | null;
    currentlyPlayingId: number | null;
    setCurrentlyPlayingId: React.Dispatch<React.SetStateAction<number | null>>;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState<number | null>(null);

    useEffect(() => {
        setAudio(new Audio());
    }, []);

    useEffect(() => {
        const newAudio = new Audio();
        setAudio(newAudio);

        // Cleanup function
        return () => {
            newAudio.pause();
            newAudio.src = '';
            setCurrentSong(null);
            setCurrentlyPlayingId(null);
        };
    }, []);

    const value: AudioContextType = {
        currentSong,
        setCurrentSong,
        audio,
        currentlyPlayingId,
        setCurrentlyPlayingId,
    };

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useMusicPlayer() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useMusicPlayer must be used within an AudioProvider");
    }
    return context;
}

type MusicPlayerProps = {
    song: Song;
};

export function MusicPlayer({ song }: MusicPlayerProps) {
    const { currentSong, setCurrentSong, audio, currentlyPlayingId, setCurrentlyPlayingId } = useMusicPlayer();
    const [play, setPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const isCurrentlyPlaying = currentlyPlayingId === song.id;

    useEffect(() => {
        if (currentSong?.id === song.id) {
            setPlay(true);
        } else {
            setPlay(false);
        }

        // Add this check
        if (!currentSong) {
            setPlay(false);
        }
    }, [currentSong, song.id]);



    useEffect(() => {
        if (!audio || !isCurrentlyPlaying) return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateTime);
        audio.addEventListener("ended", handleSongEnd);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateTime);
        };
    }, [audio, isCurrentlyPlaying]);

    function handleSongEnd() {
        setPlay(false);
        setCurrentlyPlayingId(null);
        setCurrentSong(null);
    }



    function playMusic() {
        if (!audio) return;

        if (currentSong?.id !== song.id) {
            audio.src = song.song_url;
        }
        audio.play().catch(error => console.error("Error playing audio:", error));
        setCurrentSong(song);
        setCurrentlyPlayingId(song.id);
        setPlay(true);
    }

    function pauseMusic() {
        if (!audio) return;

        audio.pause();
        setPlay(false);
        setCurrentlyPlayingId(null);
    }

    function formatTime(time: number) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        if(isNaN(minutes) && isNaN(seconds)){
            return `0:00`;
        }

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div key={song.id} className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Image
                        className={cn(play ? "player-spin" : "")}
                        src={song.image_album}
                        alt="music player"
                        width={50}
                        height={50}
                    />
                    <div className="flex flex-col">
                        <h3 className="text-sm text-primary">{song.title}</h3>
                        <p className="text-xs text-secondary">{song.artist}</p>
                    </div>
                </div>
                {!play ? (
                    <Play
                        onClick={playMusic}
                        className="cursor-pointer w-4 h-4 text-secondary"
                        strokeWidth={2}
                    />
                ) : (
                    <Pause
                        onClick={pauseMusic}
                        className="cursor-pointer w-4 h-4 text-secondary"
                        strokeWidth={2}
                    />
                )}
            </div>
            {/*<AnimatePresence>*/}
            {/*    {isCurrentlyPlaying && (*/}
            {/*        <motion.div  initial={{opacity: 0, width: 0}} animate={{opacity: 1, width: "100%"}} exit={{opacity: 0, width: 0}} className="w=full">*/}
            {/*            <motion.div className="bg-gray-100/90 rounded-full h-[3px] dark:bg-gray-700">*/}
            {/*                <div*/}
            {/*                    className="bg-gray-500 h-[3px] rounded-full"*/}
            {/*                    style={{width: `${progress}%`}}*/}
            {/*                ></div>*/}
            {/*            </motion.div>*/}
            {/*            <div className="flex justify-between text-xs mt-1">*/}
            {/*                <span>{formatTime(currentTime)}</span>*/}
            {/*                <span>{formatTime(duration)}</span>*/}
            {/*            </div>*/}
            {/*        </motion.div>*/}
            {/*    )}*/}
            {/*</AnimatePresence>*/}
        </div>
    );
}