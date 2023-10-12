import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Graph from '../components/Graph';

interface CoinData {
  name: string;
  symbol: string;
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
    };
  };
  description?: {
    en: string;
  };
}

const fetchCoinData = async (coinId: string): Promise<CoinData> => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
    params: {
      vs_currency: 'usd',
    },
  });

  return response.data;
};

interface GraphData {
  // Define the structure of your graph data here
}

const fetchGraphData = async (coinId: string): Promise<GraphData> => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: 7,
    },
  });

  return response.data;
};

const CoinDetail: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const {
    data: coinData,
    isLoading: isCoinLoading,
    isError: isCoinError,
    error: coinError,
  } = useQuery<CoinData, Error>(['coinData', coinId], () =>
    fetchCoinData(coinId)
  );
  const {
    data: graphData,
    isLoading: isGraphLoading,
    isError: isGraphError,
    error: graphError,
  } = useQuery<GraphData, Error>(
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
      {/* Render your Graph component with graphData here */}
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
