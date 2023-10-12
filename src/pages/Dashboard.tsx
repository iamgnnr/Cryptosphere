import React from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import Layout from '../components/Layout';
import Card from '../components/Card';
import InfiniteScroll from '../components/InfiniteScroll';



let callNum = 0;

const Dashboard = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery('topCoins', async ({ pageParam = 0 }) => {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: pageParam,
        sparkline: false,
      },
    })
    callNum += 1;
    console.log(`You have made ${callNum} calls`);
    return res.data
  }, 
  {
    retry: false,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < 100) {
        return null; // No more pages to fetch
      }
      return lastPage.length / 100; // Calculate the next page number
    } 
  });


  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <>
    <Layout>
        {/* {data.pages.flatMap((page, pageIndex) => (
          page.map((coin, index) => (
            <Card key={coin.id} coin={coin} />
          ))
        ))} */}
        {data.pages.flatMap((page, pageIndex) =>
          page.map((coin, index) => (
            <Card key={`${pageIndex}-${coin.id}`} coin={coin} />
          ))
        )}
    </Layout>
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} />
    </>
  );
};

export default Dashboard;
