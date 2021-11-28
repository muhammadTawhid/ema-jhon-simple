import './App.css';
import {createContext, useState} from 'react';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import NotFound from './component/NotFound/NotFound';
import Login from './component/Login/Login';
import Shipment from './component/Shipment/Shipment';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link  
} from "react-router-dom";
import ProductDetails from './component/ProductDetails/ProductDetails';
import PrivetRoute from './component/PrivetRoute/PrivetRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser);
  
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>email: {loggedInUser.email}</h3>
        <Router>
           <Header/>
          <Switch>
          <Route exact path="/">
            <Shop/>
          </Route>
            <Route path="/shop">
              <Shop/>
            </Route>
            <Route path="/review">
              <Review/>
            </Route>
            <PrivetRoute path="/inventory">
              <Inventory></Inventory>
            </PrivetRoute>
            <Route path="/login">
              <Login/>
            </Route>
            <PrivetRoute path="/shipment">
              <Shipment/>
            </PrivetRoute>
            <Route path="/product/:productKey">
              <ProductDetails/>
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
