import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

import PrivateRoute from './components/PrivateRoute';
import BillingScreen from './screens/BillingScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


import reportWebVitals from './reportWebVitals';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/signin' element={<SignInScreen />} />
      <Route path='/profile' element={<UserProfileScreen />} />
      <Route path='/signup' element={<SignUpScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/billing' element={<BillingScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order' element={<OrderScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
