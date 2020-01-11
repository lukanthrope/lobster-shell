import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './context/auth';

import Header from './components/Header';
import Home from './pages/Home';
import Host from './pages/Host';
import NoPageFound from './pages/NoPageFound';

import 'ungrid';
import './App.css';
import './index.css'; 

const App:React.FC = () => (
  <AuthProvider>
    <div className="App">
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route component={NoPageFound} />
      </Switch>
    </Router>
    </div>
  </AuthProvider>
);

export default App;