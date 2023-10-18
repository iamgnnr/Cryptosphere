import axios from 'axios';

const FetchData = async ({ pageParam = 1 }) => {

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

  }
}

export default FetchData;
