import React from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import Layout from '../components/Layout';
import Card from '../components/Card';
import InfiniteScroll from '../components/InfiniteScroll';

const fetchTopCoins = async ({ pageParam = 0 }) => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 20,
      page: pageParam,
      sparkline: false,
    },
  });
  return response.data;
};

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
    return res.data
  }, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < 5) {
        return lastPage.page + 1;
      }
      return null;
    }
  });


  if (status === 'loading') {
    return <div>Loading...</div>;
  }


  return (
    <Layout>
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((coin, index) => (
            <Card key={coin.id} coin={coin} />
          ))}
        </div>
      ))}
      <InfiniteScroll loadMore={fetchNextPage()} hasMore={hasNextPage} />
    </Layout>
  );
};

export default Dashboard;
