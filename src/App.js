import React from 'react'
import './styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UsersLobby from './pages/UsersLobby';
import Auction from './pages/Auction';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';



const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Dashboard /> 
        </Route>
        <Route path="/users/:auctionName">
            <UsersLobby /> 
        </Route>
        <Route path="/auction/:auctionName">
            <Auction /> 
        </Route>
        <Route path="/auth/register">
          <Register />
        </Route>
        <Route path="/auth/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
