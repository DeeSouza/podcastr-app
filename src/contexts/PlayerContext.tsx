import { createContext, useState, ReactNode } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodes: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasPrevious: boolean;
    hasNext: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
};

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodes, setEpisodes] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode: Episode) {
        setEpisodes([ episode ]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodes(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(state => !state);
    }
    
    function setPlayingState(state: boolean){
        setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex + 1) < episodes.length;

    function playNext() {
        const nextEpisodeIndex = currentEpisodeIndex + 1;

        if(hasNext) {
            setCurrentEpisodeIndex(nextEpisodeIndex);
        }
    }

    function playPrevious() {
        const previousEpisodeIndex = currentEpisodeIndex - 1;

        if(hasPrevious) {
            setCurrentEpisodeIndex(previousEpisodeIndex);
        }
    }

    return (
        <PlayerContext.Provider 
            value={{
                episodes,
                currentEpisodeIndex,
                isPlaying,
                hasPrevious,
                hasNext,
                play,
                togglePlay,
                playNext,
                playPrevious,
                setPlayingState,
                playList
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}