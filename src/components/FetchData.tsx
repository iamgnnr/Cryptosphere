import axios from 'axios';
import { Navigate } from 'react-router-dom';

const FetchData = async ({ pageParam = 1 }) => {
  // const navigate = useNavigate();

  try {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: pageParam,
        sparkline: false,
      },
    });
    return res.data;
  } catch (error) {

    console.error('An error occurred:', error);

    Navigate('/');

  }
}

export default FetchData;
