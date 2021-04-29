import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Home, Dashboard, SignIn, SignUp } from './components'; 
import reportWebVitals from './reportWebVitals';

// Import From React-Router-DOM
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }> 
    <Router>
      <Switch>

      <Route exact path = '/'>
          <Home title={'Rangers 59 Car Inventory'} />
        </Route>

        <Route path = '/dashboard' component = {Dashboard} />

        <Route path = '/signin' component = {SignIn} />

        <Route path = '/signup' component = {SignUp} />
        
    </Switch>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
