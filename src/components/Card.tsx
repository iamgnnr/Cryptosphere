import { Link } from "react-router-dom";



const Card = ({ coin }) => {
  return (
    <Link to={`/coins/${coin.id}`}>
    <div className="bg-slate-900 shadow-md rounded-md w-60 p-4 min-w-max">
      <h1 className="text-lg font-semibold text-zinc-200">{coin.name}</h1>
      <div className="text-zinc-200">{coin.symbol}</div>
      <div className="text-zinc-200"><img src={coin.image} alt="Coin Image" /></div>
      <div className="mt-2">
        <div className="flex flex-row justify-between text-zinc-200">
         <p>Current Price</p>
         <p>{coin.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
       </div>
      <div className="flex flex-row justify-between text-zinc-200">
        <p>Market Cap Rank</p>
        <p>{coin.market_cap_rank.toLocaleString()}</p>
     </div>
     <div className="flex flex-row justify-between text-zinc-200">
       <p>Market Cap</p>
       <p>${coin.market_cap.toLocaleString()}</p>
    </div>
    <div className="flex flex-row justify-between text-zinc-200">
      <p>Change 24hrs</p>
      <p>{coin.price_change_percentage_24h?.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</p>
    </div>
      </div>
    </div>
    </Link>
  );
};

export default Card;
