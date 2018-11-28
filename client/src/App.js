import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LandingPage from './profile/LandingPage';
import Signup from './profile/Signup'
import Signin from './profile/Signin'




// class Users extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { users: [] };
//   }

//   // componentDidMount is invoked after a component is mounted (inserted into the DOM).
//   // componentDidMount is used if we need to load data from a remote endpoint (network request).
//   componentDidMount() {
//     fetch('/users')
//       .then(res => res.json())
//       .then(users => this.setState({ users }));
//   }

//   render() {
//     return (
//       <div>
//         <h1>Users</h1>
//         <ul>
//           {this.state.users.map(user =>
//             <li key={user.id}>{user.username}</li>
//           )}
//         </ul>
//       </div>
//     );
//   }
// }


// const MainMenu = () => (
//   <div>
//     <Link to="/">
//       <button>home</button>
//     </Link>
//     <Link to="/users">
//       <button>Users</button>
//     </Link>
//   </div>
// )

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <div className="App">
//           {/* <MainMenu/> */}
//           <div>
//             <Route exact path="/" component={LandingPage} />
//             <Route exact path="/users" component={Users} />
//           </div>
//         </div>
//       </Router>
//     );
//   }
// }

const App = () => (
  <Router>
    <div className="App">
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </div>
    </div>
  </Router>
)

export default App;
