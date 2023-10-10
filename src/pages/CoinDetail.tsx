import { useQuery, QueryClient } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Graph from '../components/Graph';

const queryClient = new QueryClient();

const fetchCoinData = async (coinId) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
    params: {
      vs_currency: 'usd',
    },
  });

  return response.data;
};

const fetchGraphData = async (coinId) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: 7,
    },
  });

  return response.data;
};

const CoinDetail = () => {
  const { coinId } = useParams();
  const { data: coinData, isLoading: isCoinLoading, isError: isCoinError, error: coinError } = useQuery(['coinData', coinId], () =>
    fetchCoinData(coinId)
  );
  const { data: graphData, isLoading: isGraphLoading, isError: isGraphError, error: graphError } = useQuery(
    ['graphData', coinId],
    () => fetchGraphData(coinId),
    {
      enabled: !!coinData, // Only fetch graph data if coin data is available
    }
  );

  if (isCoinLoading) {
    return <div>Loading...</div>;
  }

  if (isCoinError) {
    return <div>Error: {coinError.message}</div>;
  }

  return (
    <div>
      <h1>Coin Detail</h1>
      <h2>Detail Page</h2>
      Render your Graph component with graphData here
      {isGraphLoading ? (
        <div>Loading graph data...</div>
      ) : isGraphError ? (
        <div>Error: {graphError.message}</div>
      ) : (
        <Graph data={graphData} />
      )}
      <ul>
        <li>Name: {coinData.name}</li>
        <li>Symbol: {coinData.symbol}</li>
        <li>Market Cap Rank: {coinData.market_cap_rank}</li>
        <li>Current Price (USD): {coinData.market_data.current_price.usd}</li>
        <li dangerouslySetInnerHTML={{ __html: coinData.description?.en }}></li>
      </ul>
    </div>
  );
};

export default CoinDetail;
