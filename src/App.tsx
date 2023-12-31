import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import CoinDetail from './pages/CoinDetail';
import ErrorPage from './pages/Error';
import NotFoundPage from './pages/404';

const queryClient = new QueryClient;

const router = createBrowserRouter(createRoutesFromElements(
    <Route>
    <Route path='/' element={<Dashboard />} />
    <Route path='coins/:coinId' element={<CoinDetail />} errorElement={<ErrorPage />} />
    <Route path='*' element={<NotFoundPage />} />
    </Route>
))


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
