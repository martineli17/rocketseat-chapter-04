import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { ImagesQueryResponse, ImagesQueryResponseData, ImagesResponse, ImagesResponseData } from '../types/image';

interface ImageFormatted {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

export default function Home(): JSX.Element {

  const getImages = async ({ after = null }) => {
    const { data } = await api.get<ImagesResponse>('/api/images', {
      params: {
        after
      }
    });
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<ImagesResponse>
      (
        'images',
        async ({ pageParam = null }) => await getImages({ after: pageParam }),
        {
          getNextPageParam: (lastRequest) => lastRequest.after ?? null
        }
      );

  const formattedData = useMemo(() => {
    let images: ImagesResponseData[] = [];
    data?.pages?.forEach(page => page.data.forEach(image => images.push(image)))

    const newData = images
      ? images.map(image => {

        return {
          id: image.id,
          description: image.description,
          title: image.title,
          ts: image.ts,
          url: image.url
        } as ImageFormatted
      })
      : [];

    return newData;
  }, [data]);

  return (
    <>
      <Header />
      {
        isLoading
          ? <Loading />
          : isError
            ? <Error />
            : <Box maxW={1120} px={20} mx="auto" my={20}>
              <CardList cards={formattedData} />
              {
                hasNextPage &&
                <Button mt="10"
                  onClick={() => fetchNextPage()}>
                  {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
                </Button>
              }
            </Box>
      }
    </>
  );
}
