import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import { usePlayer } from '../../contexts/PlayerContext';

import styles from './episode.module.scss';
import Image from 'next/image';
import Link from 'next/link';

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

type EpisodeProps = {
    episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
    const player = usePlayer();

    return (
        <div className={styles.episode}>
            <Head>
                <title>Podcastr | {episode.title}</title>
            </Head>
            
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar"/>
                    </button>
                </Link>

                <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />

                <button type="button" onClick={() => player.play(episode)}>
                    <img src="/play.svg" alt="Tocar Episódio"/>
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{
                __html: episode.description
            }} />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get<Episode[]>('episodes', {
        params: {
          _limit: 12,
          _sort: 'published_at',
          _order: 'desc'
        }
      });

      const paths = data.map(episode => ({
          params: {
              slug: episode.id
          }
      }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;
    const { data } = await api.get(`/episodes/${slug}`);

    const episode = {
        ...data,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
          locale: ptBR
        }),
        url: data.file.url,
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      }

    return {
        props : {
            episode
        },
        revalidate: 60 * 60 * 24
    }
}