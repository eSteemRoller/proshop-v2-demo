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
import UserProfileScreen from './screens/UserProfileScreen';
// import MyOrdersScreen from './screens/MyOrderScreen';
import BillingScreen from './screens/BillingScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import SubmitOrderScreen from './screens/SubmitOrderScreen';
import ConfirmOrderScreen from './screens/ConfirmOrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import AdminRoute from './components/AdminRoute';
import CreateUserByAdminScreen from './screens/admin/CreateUserByAdminScreen';
import ReadAllOrdersScreen from './screens/admin/ReadAllOrdersScreen';
import ReadAllProductsScreen from './screens/admin/ReadAllProductsScreen';
import ReadAllUsersScreen from './screens/admin/ReadAllUsersScreen';
import UpdateProductScreen from './screens/admin/UpdateProductScreen';
import UpdateUserScreen from './screens/admin/UpdateUserScreen';
import UserResetPasswordScreen from './screens/UserResetPasswordScreen';

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
      <Route path='/reset_password/:token' element={<UserResetPasswordScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/user/:id/my_profile' element={<UserProfileScreen />} />
        <Route path='/user/:id/my_orders' element={<UserProfileScreen />} />
        <Route path='/user/:id/my_orders/page/:pageNumber' element={<UserProfileScreen />} />
        <Route path='/user/:id/order/billing' element={<BillingScreen />} />
        <Route path='/user/:id/order/shipping' element={<ShippingScreen />} />
        <Route path='/user/:id/order/payment' element={<PaymentScreen />} />
        <Route path='/user/:id/order/submit_order' element={<SubmitOrderScreen />} />
        <Route path='/user/:id/order/:id/order_confirmed' element={<ConfirmOrderScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/all_orders' element={<ReadAllOrdersScreen />} />
        <Route path='/admin/all_orders/page/:pageNumber' element={<ReadAllOrdersScreen />} />

        <Route path='/admin/all_products' element={<ReadAllProductsScreen />} />
        <Route path='/admin/all_products/page/:pageNumber' element={<ReadAllProductsScreen />} />
        <Route path='/admin/all_products/product/:id/edit_product' element={<UpdateProductScreen />} />
        <Route path='/admin/all_products/product/:id/delete_product' element={<ReadAllProductsScreen />} />

        <Route path='/admin/all_users' element={<ReadAllUsersScreen />} />
        <Route path='/admin/all_users/page/:pageNumber' element={<ReadAllUsersScreen />} />
        <Route path='/admin/all_users/add_user' element={<CreateUserByAdminScreen />} />
        <Route path='/admin/all_users/user/:id/edit_user' element={<UpdateUserScreen />} />
        <Route path='/admin/all_users/user/:id/delete_user' element={<ReadAllUsersScreen />} />
        <Route path='/admin/all_users/page/:pageNumber/user/:id/delete_user' element={<ReadAllUsersScreen />} />
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
