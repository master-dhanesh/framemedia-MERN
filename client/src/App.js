import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './component/Landing/Landing';
import Register from './component/register/Register';
import Login from './component/login/Login';
import Timeline from './component/Timeline/Timeline';
import Profile from './component/Profile/Profile';
import Update from './component/Update/Update';

function App() {
  return (
    <Router>
    <div className="App">
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/profile" component={Profile} />
        <Route path="/update" component={Update} />
    </div>
    </Router>
  );
}

export default App;
