import axios from 'axios';

const FetchData = async ({ pageParam = 1 }) => {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: pageParam,
        sparkline: false,
      },
    })
    return res.data
  }


export default FetchData;