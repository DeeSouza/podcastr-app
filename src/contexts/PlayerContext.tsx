import { createContext, useState, ReactNode, useContext } from 'react';

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
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
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
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

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

    function toggleLoop() {
        setIsLooping(state => !state);
    }
    
    function toggleShuffle() {
        setIsShuffling(state => !state);
    }

    function setPlayingState(state: boolean){
        setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex + 1) < episodes.length;

    function playNext() {
        if(isShuffling){
            const handleRandomEpisodeIndex = Math.floor(Math.random() * episodes.length);

            setCurrentEpisodeIndex(handleRandomEpisodeIndex);
        }
        else if(hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        if(hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
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
                isLooping,
                isShuffling,
                play,
                togglePlay,
                playNext,
                playPrevious,
                setPlayingState,
                playList,
                toggleLoop,
                toggleShuffle
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}