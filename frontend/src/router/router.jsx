import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import CartPage from '../pages/CartPage';
import CheckOut from '../pages/CheckOut';
import SingleBook from '../pages/SingleBook';
import PrivateRoute from './PrivateRoute';
import OrdersPage from '../pages/OrdersPage';
import AdminRoute from './AdminRoute';
import AdminLogin from '../components/AdminLogin';

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
      {
        path: 'orders',
        element: (
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      { path: '/books/:id', element: <SingleBook></SingleBook> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLogin></AdminLogin>,
  },
  {
    path: '/dashboard',
    element: (
      <AdminRoute>
        <div>Admin Dashboard</div>
      </AdminRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <AdminRoute>
            <div> Dashboard Home</div>
          </AdminRoute>
        ),
      },
      {
        path: 'add-new-book',
        element: (
          <AdminRoute>
            <div>Add new book</div>
          </AdminRoute>
        ),
      },
      {
        path: 'edit-book/:id',
        element: (
          <AdminRoute>
            <div>Edit book</div>
          </AdminRoute>
        ),
      },
      {
        path: 'manage-book',
        element: (
          <AdminRoute>
            <div>Manage books</div>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
