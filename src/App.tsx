import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import CoinDetail from './pages/Coin_Detail';

const queryClient = new QueryClient;

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin/:coinId" element={<CoinDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
