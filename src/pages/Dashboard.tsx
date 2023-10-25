import React from 'react';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import GridLayout from '../components/GridLayout';
import Card from '../components/Card';
import InfiniteScroll from '../components/InfiniteScroll';
import FetchData from '../components/FetchData';
import Hero from '../components/Hero';
import { Dna } from 'react-loader-spinner';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  market_cap: number;
  price_change_percentage_24h?: number;
}

const Dashboard: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
  }: UseInfiniteQueryResult<Coin[], Error> = useInfiniteQuery('topCoins', FetchData, {
    retry: false,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 100) {
        return undefined; // No more pages to fetch
      }
      return pages.length > 1 ? pages.length : 2; // Calculate the next page number
    },
  });

  if (status === 'loading') {
    return (
      <div>
        <Dna
          visible={true}
          height={80}
          width={80}
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  return (
    <>
      <Hero />
      <GridLayout>
        {data?.pages.flatMap((page, pageIndex) =>
          page.map((coin) => (
            <Card key={`${pageIndex}-${coin.id}`} coin={coin} />
          ))
        )}
      </GridLayout>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage !== false && !fetchNextPage} />
    </>
  );
};

export default Dashboard;
