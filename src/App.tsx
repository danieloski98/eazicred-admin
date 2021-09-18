import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';


function App() {
  
  return (
    <Router>
        <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/dashboard/' component={Dashboard} />
        </Switch>
    </Router>
  );
}

export default App;
