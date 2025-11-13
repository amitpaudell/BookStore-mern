import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import CartPage from '../pages/CartPage';
import CheckOut from '../pages/CheckOut';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home></Home> },
      { path: 'aboutus', element: <h1>About</h1> },
      { path: 'cart', element: <CartPage></CartPage> },
      { path: 'login', element: <Login></Login> },
      { path: 'register', element: <Register></Register> },
      { path: 'checkout', element: <CheckOut></CheckOut> },
    ],
  },
]);

export default router;
