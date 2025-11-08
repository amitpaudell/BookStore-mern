import { createBrowserRouter } from 'react-router-dom';
import App from '../src/App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <h1>Home</h1> },
      { path: 'aboutus', element: <h1>About</h1> },
      { path: 'orders', element: <h1>Orders</h1> },
    ],
  },
]);

export default router;
