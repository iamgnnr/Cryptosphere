import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import CoinDetail from './pages/CoinDetail';
import NotFound from './pages/404';

const queryClient = new QueryClient;

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path=':coinId' element={<CoinDetail />} />
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
