import axios from 'axios';


const DataHelper = async () => {
    const response = await axios.get('http://localhost:3000/data');
    return response.data;
  };

export default DataHelper;