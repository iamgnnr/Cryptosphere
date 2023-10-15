import axios from 'axios';

const DataHelper = async ({ pageParam = 1 }) => {
    const res = await axios.get(' http://localhost:3000/data')
    return res.data
  }


export default DataHelper;