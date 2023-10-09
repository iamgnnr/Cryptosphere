import { useQuery } from 'react-query';
import axios from 'axios';
import Layout from '../components/Layout';
import Card from '../components/Card';
import DataHelper from '../components/DataHelper';
import rd3 from 'react-d3-library';



const fetchTopCoins = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd', // You can change this to the currency of your choice
      order: 'market_cap_desc',
      per_page: 100, // Number of top coins to fetch
      page: 1,
      sparkline: false, // You can set this to true if you want sparkline data
    },
  });

  return response.data;
};


const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery('topCoins', DataHelper);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Layout>
        {data.map((coin, index) => (
          <Card key={index} coin={coin} />
        ))}
      </Layout>
    </>
  );
};

export default Dashboard;