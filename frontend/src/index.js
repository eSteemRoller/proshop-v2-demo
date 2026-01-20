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
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

import PrivateRoute from './components/PrivateRoute';
import MyProfileScreen from './screens/MyProfileScreen';
import MyOrdersScreen from './screens/OrderScreen';
import BillingScreen from './screens/BillingScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import AdminRoute from './components/AdminRoute';
import AllOrdersListScreen from './screens/admin/AllOrdersListScreen';
import AllProductsListScreen from './screens/admin/AllProductsListScreen';
import EditProductScreen from './screens/admin/EditProductScreen';
import AllUsersListScreen from './screens/admin/AllUsersListScreen';
import AddUserByAdminScreen from './screens/admin/AddUserByAdminScreen';
import EditUserScreen from './screens/admin/EditUserScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import reportWebVitals from './reportWebVitals';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/sign_in' element={<SignInScreen />} />
      <Route path='/sign_up' element={<SignUpScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/my_profile' element={<MyProfileScreen />} />
        <Route path='/my_orders' element={<MyOrdersScreen />} />
        <Route path='/billing' element={<BillingScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/submit_order' element={<PlaceOrderScreen />} />
        <Route path='/order_confirmed' element={<OrderScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/all_orders' element={<AllOrdersListScreen />} />
        <Route path='/admin/all_products' element={<AllProductsListScreen />} />
        <Route path='/admin/product/:id/edit_product' element={<EditProductScreen />} />
        <Route path='/admin/all_users' element={<AllUsersListScreen />} />
        <Route path='/admin/user/add_user' element={<AddUserByAdminScreen />} />
        <Route path='/admin/user/:id/edit_user' element={<EditUserScreen />} />
      </Route>
      <Route path='/reset_password/:token' element={<ResetPasswordScreen />} />
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
