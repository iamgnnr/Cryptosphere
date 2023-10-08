import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from "react-router-dom";

const fetchCoinData = async (coinId) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
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



const CoinDetail = () => {
  const { coinId } = useParams();
  const { data, isLoading, isError, error } = useQuery(['coinData', coinId], () => fetchCoinData(coinId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <h1>Coin Detail</h1>
      <h1>Detail Page</h1>
      <ul>
      {data.name}
     
      </ul>
    </>
  
  );
};

export default CoinDetail;
