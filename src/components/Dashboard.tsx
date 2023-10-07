import { useQuery } from 'react-query';
import axios from 'axios';

const fetchTopCoins = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd', // You can change this to the currency of your choice
      order: 'market_cap_desc',
      per_page: 10, // Number of top coins to fetch
      page: 1,
      sparkline: false, // You can set this to true if you want sparkline data
    },
  });

  return response.data;
};

const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery('topCoins', fetchTopCoins);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Top Coins</h1>
      <ul>
        {data.map((coin) => (
          <li key={coin.id}>
            <strong>{coin.name}</strong> ({coin.symbol}): ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
