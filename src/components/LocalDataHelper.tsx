import axios from 'axios';

export const DataHelper = async ({ pageParam = 1 }) => {
  const res = await axios.get(' http://localhost:3000/data')
  return res.data
}


export const DetailDataHelper = async () => {
  const response = await axios.get('http://localhost:3002/data');

  return response.data;
};


export const LocalGraphData = async () => {
  const response = await axios.get(`http://localhost:3004/data`);

  return response.data;
};

