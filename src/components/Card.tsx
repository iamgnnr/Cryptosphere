
import Graph from './Graph';


const Card = ({ coin }) => {
  const data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 30 },
  ];

  return (
    <div className="bg-slate-950 shadow-md rounded-md w-60 p-4">
      <div className="text-lg font-semibold text-green-600">{coin.name}</div>
      <div className="text-gray-500">{coin.symbol}</div>
      <div className="mt-2">
        <div className="flex flex-row justify-between text-green-600">
         <p>Current Price</p>
         <p>{coin.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
       </div>
      <div className="flex flex-row justify-between text-green-600">
        <p>Market Cap Rank</p>
        <p>{coin.market_cap_rank.toLocaleString()}</p>
     </div>
     <div className="flex flex-row justify-between text-green-600">
       <p>Market Cap</p>
       <p>${coin.market_cap.toLocaleString()}</p>
    </div>
    <div className="flex flex-row justify-between text-green-600">
      <p>Change 24hrs</p>
      <p>{coin.price_change_percentage_24h.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</p>
    </div>
 
        {/* <Graph data={data} /> */}
      </div>
    </div>
  );
};

export default Card;
