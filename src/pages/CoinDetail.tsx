import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Graph from '../components/Graph';
import Footer from '../components/Footer';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';


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

const DetailDataHelper = async () => {
  const response = await axios.get('http://localhost:3000/data');

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

const LocalGraphData = async () => {
  const response = await axios.get(`http://localhost:3004/data`);

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
    // fetchCoinData(coinId)
    DetailDataHelper()
  );
  const {
    data: graphData,
    isLoading: isGraphLoading,
    isError: isGraphError,
    error: graphError,
  } = useQuery<GraphData, Error>(
    ['graphData', coinId],
    () => LocalGraphData(coinId),
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
    <Layout>
      <div className='container mx-auto p-10'>
        <div className='flex flex-col'>
          <div>
            <Link to='/'>
              <div>
                <ArrowLeftIcon className="h-6 w-6 text-zinc-200" />
              </div>
            </Link>
            <div className='flex flex-row justify-between items-center p-10'>
              <h1 className='text-5xl pt-6 pb-6 text-zinc-100'>{coinData.name}</h1>
              <img src={coinData.image?.large} className='h-20' alt="Coin Image" />
              <div className='flex flex-col'>
                <h2 className='text-zinc-200'>Symbol: {coinData.symbol}</h2>
                <h2 className='text-zinc-200'>Market Cap Rank: {coinData.market_cap_rank}</h2>
                <h2 className='text-zinc-200'>Current Price (USD): {coinData.market_data.current_price.usd}</h2>
              </div>
            </div>

          </div>
          <div>
            {isGraphLoading ? (
              <div>Loading graph data...</div>
            ) : isGraphError ? (
              <div>Error: {graphError.message}</div>
            ) : (
              <Graph data={graphData} />
            )}
          </div>
        </div>
        <h2 className='text-xl pb-2 text-zinc-200 p-4'>Description:</h2>
        <div className='flex flex-row justify-between'>
          <div className='max-w-lg text-zinc-300 p-4' dangerouslySetInnerHTML={{ __html: coinData.description?.en }}></div>
          <div className='flex flex-col border-2 border-stone-100 p-4 rounded-md'>
            <h3 className='text-zinc-200'>Symbol: {coinData.symbol}</h3>
            <h3 className='text-zinc-200'>Market Cap Rank: {coinData.market_cap_rank}</h3>
            <h3 className='text-zinc-200'>Current Price (USD): {coinData.market_data.current_price.usd}</h3>
            <h3 className='text-zinc-200'>Symbol: {coinData.symbol}</h3>
            <h3 className='text-zinc-200'>Market Cap Rank: {coinData.market_cap_rank}</h3>
            <h3 className='text-zinc-200'>Current Price (USD): {coinData.market_data.current_price.usd}</h3>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default CoinDetail;
