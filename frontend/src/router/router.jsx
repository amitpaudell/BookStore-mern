import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Login from '../components/Login';
import Register from '../components/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home></Home> },
      { path: 'aboutus', element: <h1>About</h1> },
      { path: 'orders', element: <h1>Orders</h1> },
      { path: 'login', element: <Login></Login> },
      { path: 'register', element: <Register></Register> },
    ],
  },
]);

export default router;
