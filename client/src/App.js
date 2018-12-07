import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LandingPage from './profile/LandingPage';
import Signup from './profile/Signup';
import Signin from './profile/Signin';
import ResetPass from './profile/ResetPass';
const HYPERTUBE_ROUTE = 'localhost:3001';



class App extends Component {
  constructor(props) {
    super(props);
    // this.App = this.App.bind(this);
    this.state = {
      connected: false,
    }
  }

  componentDidMount() {
    fetch('http://' + HYPERTUBE_ROUTE + '/')
      .then(res => res.json())
      .then(users => {
        console.log(users);
      })
  }



  render() {
    return (
      <Router>
        <div className="App">
          <div>
            {/* <Route exact path="/" component={LandingPage} /> */}
            <Route exact path="/" render={() => (
              this.state.connected ? (
                <Redirect to="/index" />
              ) : (
                  <LandingPage />
                )
            )} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/resetPass" component={ResetPass} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
