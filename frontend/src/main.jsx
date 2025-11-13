import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import 'sweetalert2/dist/sweetalert2.js';

import { store } from './redux/store';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
