import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Home from './components/Home.js'
import Vehicle from './components/Vehicle.js'
import Payment from './components/Payment.js'
import SingleVehicle from './components/SingleVehicle.js'
import SinglePayment from './components/SinglePayment.js'

import './App.scss';

class App extends React.Component {

  render() {
    return (
      <div className="App">

        <div className="home-header">
          <div>Burger Button</div>
          <div>Header Title</div>
        </div>

        <Router>

          <Link to="/">Home</Link>
          <Link to="/vehicle">Vehicles</Link>
          <Link to="/payment">Payment</Link>

          <Switch>

            <Route exact path="/" component={Home} />
            <Route exact path="/vehicle" component={Vehicle} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/vehicle/:vehicleId" component={SingleVehicle} />
            <Route exact path="/payment/:paymentId" component={SinglePayment} />

          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
