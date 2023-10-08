import React from 'react';

const Card = ({ coin }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <div className="text-lg font-semibold">{coin.name}</div>
      <div className="text-gray-500">{coin.symbol}</div>
      <div className="mt-2">
        <div className="text-green-600">{coin.current_price}</div>
        <div className="text-green-600">{coin.market_cap_rank}</div>
        <div className="text-green-600">{coin.market_cap}</div>
        <div className="text-green-600">{coin.price_change_percentage_24h}</div>
        <div className="text-green-600">{coin.price_change_percentage_7d}</div>

      </div>
    </div>
  );
};

export default Card;
