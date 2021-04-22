import { useContext } from 'react';
import Image from 'next/image';
import { PlayerContext } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';

export function Player() {
    const { episodes, currentEpisodeIndex } = useContext(PlayerContext);
    const episodeCurrent = episodes[currentEpisodeIndex];

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora..."/>
                <strong>Tocando agora</strong>
            </header>

            {episodeCurrent ? (
                <div className={styles.episodeCurrent}>
                    <Image 
                        width={592}
                        height={592} 
                        src={episodeCurrent.thumbnail} 
                        objectFit="cover" 
                    />
                    <strong>{episodeCurrent.title}</strong>
                    <span>{episodeCurrent.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}
            

            <footer>
                <div className={styles.progress}>
                    <span>00:00</span>
                    
                    <div className={styles.slider}>
                        <div className={styles.emptySlider} />
                    </div>
                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button">
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>

                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar Anterior"/>
                    </button>

                    <button type="button" className={styles.playButton}>
                        <img src="/play.svg" alt="Tocar"/>
                    </button>

                    <button type="button">
                        <img src="/play-next.svg" alt="Tocar Anterior"/>
                    </button>

                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar Anterior"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}