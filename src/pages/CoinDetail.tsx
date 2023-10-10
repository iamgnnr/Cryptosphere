import React from 'react'; // Import React
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from "react-router-dom";
import DataHelper from '../components/DataHelper';
import Graph from '../components/Graph';

const fetchCoinData = async (coinId: string) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
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

const CoinDetail = () => {

  const dataPoints = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 30 },
  ];
  const { coinId } = useParams();
  const { data, isLoading, isError, error } = useQuery(['coinData', coinId], ()=>fetchCoinData(coinId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Coin Detail</h1>
      <h2>Detail Page</h2>
      <Graph data={dataPoints}/>
      <ul>
        <li>Name: {data.name}</li>
        <li>Symbol: {data.symbol}</li>
        <li>Market Cap Rank: {data.market_cap_rank}</li>
        <li>Current Price (USD): {data.market_data.current_price.usd}</li>

        <li dangerouslySetInnerHTML={{__html: data.description?.en}}></li>
      </ul>


    </div>
  );
};

export default CoinDetail;
