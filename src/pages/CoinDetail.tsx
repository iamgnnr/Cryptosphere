import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Graph from '../components/Graph';
import Footer from '../components/Footer';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Dna } from 'react-loader-spinner';
import { DetailDataHelper } from '../components/LocalDataHelper';
import { LocalGraphData } from '../components/LocalDataHelper';


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
              <img src={coinData.image?.large} className='sm: invisible md:visible h-20' alt="Coin Image" />
              <div className='flex flex-col'>
                <h2 className='text-zinc-200'>Symbol: {coinData.symbol}</h2>
                <h2 className='text-zinc-200'>Market Cap Rank: {coinData.market_cap_rank}</h2>
                <h2 className='text-zinc-200'>Current Price (USD): {coinData.market_data.current_price.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
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
        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='md:w-full text-zinc-300 p-4' dangerouslySetInnerHTML={{ __html: coinData.description?.en }}></div>
          <div className='flex flex-col w-full lg:w-3/4 justify-evenly border-2 border-stone-100 p-4 rounded-md w-80'>
            <h3 className='text-zinc-200'>Genesis Date: {coinData.genesis_date}</h3>
            <h3 className='text-zinc-200'>Fully Diluted Valuation: {coinData.market_data.fully_diluted_valuation.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
            <h3 className='text-zinc-200'>Total Volume: {coinData.market_data.total_volume?.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
            <h3 className='text-zinc-200'>High 24hrs: {coinData.market_data.high_24h?.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
            <h3 className='text-zinc-200'>Low 24hrs: {coinData.market_data.low_24h?.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
            <h3 className='text-zinc-200'>24hr: {coinData.market_data.price_change_percentage_24h.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</h3>
            <h3 className='text-zinc-200'>7d: {coinData.market_data.price_change_percentage_7d.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</h3>
            <h3 className='text-zinc-200'>14d: {coinData.market_data.price_change_percentage_14d.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</h3>
            <h3 className='text-zinc-200'>30d: {coinData.market_data.price_change_percentage_30d.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</h3>
            <h3 className='text-zinc-200'>Market Cap Change 24hr: {coinData.market_data.market_cap_change_percentage_24h.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</h3>
            <h3 className='text-zinc-200'>Max Supply: {coinData.market_data.max_supply?.toLocaleString('en-US')}</h3>
            <h3 className='text-zinc-200'>Circulating Supply: {coinData.market_data.circulating_supply?.toLocaleString('en-US')}</h3>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default CoinDetail;
