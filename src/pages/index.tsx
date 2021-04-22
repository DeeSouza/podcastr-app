import { GetStaticProps } from 'next';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';

type FileEpisode = {
  duration: string;
  url: string;
}

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
  file: FileEpisode;
}

type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[],
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <Image
                  width={192} 
                  height={192} 
                  src={episode.thumbnail} 
                  alt={episode.title} 
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <a href="">{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="/play-green.svg" alt="Tocar Episódio"/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>

      </section>
    </div>
  )
}

export const getServerSideProps: GetStaticProps = async () => {
  const { data } = await api.get<Episode[]>('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      ...episode,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      url: episode.file.url,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
    }
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      allEpisodes,
      latestEpisodes
    },
  }
}