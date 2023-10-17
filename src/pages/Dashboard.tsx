import { useInfiniteQuery } from 'react-query';
import GridLayout from '../components/GridLayout';
import Card from '../components/Card';
import InfiniteScroll from '../components/InfiniteScroll';
import FetchData from '../components/FetchData';
import DataHelper from '../components/DataHelper';
import Hero from '../components/Hero';
import { Dna } from 'react-loader-spinner';


const Dashboard = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery('topCoins', FetchData,
    {
      retry: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 100) {
          return undefined; // No more pages to fetch
        }
        return (pages.length > 1) ? pages.length : 2; // Calculate the next page number
      },

    });

  if (status === 'loading') {
    return <div>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>;
  }
  return (
    <>
      <Hero />
      <GridLayout>
        {data.pages.flatMap((page, pageIndex) =>
          page.map((coin, index) => (
            <Card key={`${pageIndex}-${coin.id}`} coin={coin} />
          ))
        )}
      </GridLayout>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} />
    </>
  );
};

export default Dashboard;
