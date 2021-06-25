import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = 0 }): Promise<any> => {
    const response = await api.get(`api/images?after=${pageParam}`);
    const { data } = response;
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: pageParam => pageParam,
  });
  // } = useInfiniteQuery(
  //   'images',

  //   // TODO AXIOS REQUEST WITH PARAM
  //   ,
  //   // TODO GET AND RETURN NEXT PAGE PARAM
  // );

  const formattedData = useMemo(() => {
    console.log(data);
    const newData = data?.pages.map(value => value.data.flat());
    return newData ? newData.flat() : null;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  // TODO RENDER LOADING SCREEN
  // TODO RENDER ERROR SCREEN

  if (isError) {
    return <Error />;
  }
  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
