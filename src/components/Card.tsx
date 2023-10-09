
import Graph from './Graph';


const Card = ({ coin }) => {
  const data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 30 },
  ];

  return (
    <div className="bg-slate-950 shadow-md rounded-md p-4">
      <div className="text-lg font-semibold text-green-600">{coin.name}</div>
      <div className="text-gray-500">{coin.symbol}</div>
      <div className="mt-2">
        <div className="text-green-600">{coin.current_price}</div>
        <div className="text-green-600">{coin.market_cap_rank}</div>
        <div className="text-green-600">{coin.market_cap}</div>
        <div className="text-green-600">{coin.price_change_percentage_24h}</div>
        <div className="text-green-600">{coin.price_change_percentage_7d}</div>
        <Graph data={data} />
      </div>
    </div>
  );
};

export default Card;
