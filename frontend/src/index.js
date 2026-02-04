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
import SignUpScreen from './screens/SignUpScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

import PrivateRoute from './components/PrivateRoute';
import MyProfileScreen from './screens/MyProfileScreen';
// import MyOrdersScreen from './screens/MyOrderScreen';
import BillingScreen from './screens/BillingScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import SubmitOrderScreen from './screens/SubmitOrderScreen';
import ConfirmOrderScreen from './screens/ConfirmOrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import AdminRoute from './components/AdminRoute';
import AllOrdersListScreen from './screens/admin/AllOrdersListScreen';
import AllProductsListScreen from './screens/admin/AllProductsListScreen';
import EditProductScreen from './screens/admin/EditProductScreen';
import AllUsersListScreen from './screens/admin/AllUsersListScreen';
import CreateUserByAdminScreen from './screens/admin/CreateUserByAdminScreen';
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
      <Route path='/reset_password/:token' element={<ResetPasswordScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/user/:id/my_profile' element={<MyProfileScreen />} />
        <Route path='/user/:id/my_orders' element={<MyProfileScreen />} />
        <Route path='/user/:id/my_orders/:pageNumber' element={<MyProfileScreen />} />
        <Route path='/billing' element={<BillingScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/submit_order' element={<SubmitOrderScreen />} />
        <Route path='/order_confirmed' element={<ConfirmOrderScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/all_users' element={<AllUsersListScreen />} />
        <Route path='/admin/all_users/:pageNumber' element={<AllUsersListScreen />} />
        <Route path='/admin/all_users/user/:id/edit_user' element={<EditUserScreen />} />
        <Route path='/admin/all_users/add_user' element={<CreateUserByAdminScreen />} />
        
        <Route path='/admin/all_products' element={<AllProductsListScreen />} />
        <Route path='/admin/all_products/:pageNumber' element={<AllProductsListScreen />} />
        <Route path='/admin/all_products/product/:id/edit_product' element={<EditProductScreen />} />
        
        <Route path='/admin/all_orders' element={<AllOrdersListScreen />} />
        <Route path='/admin/all_orders/:pageNumber' element={<AllOrdersListScreen />} />
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
