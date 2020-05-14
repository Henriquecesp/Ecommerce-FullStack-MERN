import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import UserDashboard from "./components/user/UserDashboard";
import PrivateRoute from "./auth/PrivateRouter";
import AdminDashboard from "./components/user/AdminDashboard";
import AddCategory from "./components/admin/AddCategory";
import AdminRoute from "./auth/AdminRoute";
import AddProduct from "./components/admin/AddProduct";
import Home from "./components/core/Home";
import Shop from "./components/core/Shop";
import Product from "./components/core/Product";
import Cart from "./components/cart/Cart";
import Orders from "./components/admin/Orders";
import UpdateProfile from "./components/user/Profile";
import UserProfile from "./components/user/UserProfile";
import ManageProducts from "./components/admin/ManageProducts";
import UpdateProduct from "./components/admin/UpdateProduct";
import FooterComponent from "./components/menu/footer";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute
          path="/user/profile/edit/:userId"
          exact
          component={UpdateProfile}
        />
        <PrivateRoute
          path="/user/profile/:userId"
          exact
          component={UserProfile}
        />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/product" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <Route path="/product/:productId" exact component={Product} />
      </Switch>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default Routes;
