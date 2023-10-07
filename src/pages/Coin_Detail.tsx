import { useParams } from "react-router-dom";



const CoinDetail = () => {
  const { coinId } = useParams();
  console.log(coinId);
  return (
    <div>
      <h1>Coin Detail Page</h1>
    </div>
  );
};

export default CoinDetail;
