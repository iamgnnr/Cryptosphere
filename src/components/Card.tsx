import React from 'react';

const Card = ({ coin }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <div className="text-lg font-semibold">{coin.id}</div>
      <div className="text-lg font-semibold">{coin.name}</div>
      <div className="text-gray-500">{coin.symbol}</div>
      <div className="mt-2">
        <span className="text-green-600">{coin.current_price}</span>
        <span className="text-gray-500"> USD</span>
      </div>
    </div>
  );
};

export default Card;
