import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './pages/Home/Home.page';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path='/'>
      <Home />
    </Route>
  </Switch>
)

export default App;