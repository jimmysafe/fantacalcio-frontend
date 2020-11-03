import './styles.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import UsersLobby from './pages/UsersLobby';
import Auction from './pages/Auction';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';


const App = () => {
  const authToken= localStorage.getItem('authToken');
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authToken ? 
            <Dashboard /> 
            :
            <Redirect 
              to={{
                pathname: "/auth/login",
                state: { prevUrl: window.location.pathname }
              }} 
            />
          }
        </Route>
        <Route path="/users/:auctionName">
          {authToken ?
            <UsersLobby /> 
            :             
            <Redirect 
              to={{
                pathname: "/auth/login",
                state: { prevUrl: window.location.pathname }
              }} 
            />
          }
        </Route>
        <Route path="/auction/:auctionName">
          {authToken ?
            <Auction /> 
            : 
            <Redirect 
              to={{
                pathname: "/auth/login",
                state: { prevUrl: window.location.pathname }
              }} 
            />
          }
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
