import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Home from './components/Home.js'
import Vehicle from './components/Vehicle.js'
import Payment from './components/Payment.js'
import SingleVehicle from './components/SingleVehicle.js'
import SinglePayment from './components/SinglePayment.js'

import './App.scss';

class App extends React.Component {

  state = {
    burgerButtonToggle: true,
  }

  onClickBurgerButton = () => {
    this.setState({ burgerButtonToggle: !this.state.burgerButtonToggle })
  }

  render() {
    return (
      <div className="App">



        <Router>


          <div className="home-header">



            {this.state.burgerButtonToggle === true
              ?
              <div className="burger-toggle">
                <div onClick={this.onClickBurgerButton} className="burger">
                  <div className="menu-piece"></div>
                  <div className="menu-piece"></div>
                  <div className="menu-piece"></div>
                </div>

              </div>
              :
              <div className="x-burger-toggle">
                <div onClick={this.onClickBurgerButton} className="x-burger">
                  <div className="x-piece-one"></div>
                  <div className="x-piece-two"></div>
                </div>
                <div className="nav-links">
                  <div className="home-icon-container">
                    <Link className="link" onClick={this.onClickBurgerButton} to="/">
                      <span class="material-icons">
                        place
                    </span>
                    Park</Link>
                  </div>

                  <div className="home-icon-container">
                    <Link className="link" onClick={this.onClickBurgerButton} to="/vehicle">
                      <span class="material-icons">
                        directions_car
                      </span>Vehicles</Link>
                  </div>

                  <div className="home-icon-container">
                    <Link className="link" onClick={this.onClickBurgerButton} to="/payment">
                      <span class="material-icons">
                        credit_card
                      </span>Payment</Link>
                  </div>

                </div>
              </div>}

            <div className="header-container">


            </div>

          </div>

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
