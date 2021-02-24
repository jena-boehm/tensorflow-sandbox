import React, {useRef} from 'react';
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom';
import './App.css';
import Facemesh from './facemesh/Facemesh';
import Handpose from './handpose/Handpose';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact path='/facemesh'
            render={() => 
            <Facemesh />}
          />
          <Route
            exact path='/handpose'
            render={() => 
            <Handpose />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
