import { createBrowserRouter } from 'react-router-dom';
import App from '../src/App';
import Home from '../pages/home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home></Home> },
      { path: 'aboutus', element: <h1>About</h1> },
      { path: 'orders', element: <h1>Orders</h1> },
    ],
  },
]);

export default router;
