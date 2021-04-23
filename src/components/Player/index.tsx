import { useContext } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';

import { PlayerContext } from '../../contexts/PlayerContext';

import 'rc-slider/assets/index.css';
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
            

            <footer className={!episodeCurrent ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    
                    <div className={styles.slider}>
                        {episodeCurrent ? (
                            <Slider 
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : <div className={styles.emptySlider} />}
                    </div>

                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button" disabled={!episodeCurrent}>
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>

                    <button type="button" disabled={!episodeCurrent}>
                        <img src="/play-previous.svg" alt="Tocar Anterior"/>
                    </button>

                    <button type="button" className={styles.playButton} disabled={!episodeCurrent}>
                        <img src="/play.svg" alt="Tocar"/>
                    </button>

                    <button type="button" disabled={!episodeCurrent}>
                        <img src="/play-next.svg" alt="Tocar Anterior"/>
                    </button>

                    <button type="button" disabled={!episodeCurrent}>
                        <img src="/play-previous.svg" alt="Tocar Anterior"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}