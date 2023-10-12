import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import Layout from '../components/Layout';
import Card from '../components/Card';
import InfiniteScroll from '../components/InfiniteScroll';


const Dashboard = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery('topCoins', async ({ pageParam = 1 }) => {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: pageParam,
        sparkline: false,
      },
    })
    console.log(`Page param is ${pageParam}`)
    return res.data
  }, 
  {
    retry: false,
    getNextPageParam: (lastPage, pages) => {
  if (lastPage.length < 100) {
    return undefined; // No more pages to fetch
  }
  console.log(`page length: ${pages.length}`);
  return ( pages.length > 1) ? pages.length : 2; // Calculate the next page number
},

  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <>
    <Layout>
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
