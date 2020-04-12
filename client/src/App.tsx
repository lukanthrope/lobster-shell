import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//@ts-ignore
import ScrollUpButton from 'react-scroll-up-button';

import { AuthProvider } from './context/auth';

import Header from './components/Header';
import Home from './pages/Home';
import Host from './pages/Host';
import Post from './pages/Post';
import NoPageFound from './pages/NoPageFound';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './App.css';
import './index.css'; 

const App:React.FC = () =>
  <AuthProvider>
    <div className="App">
    <Router>
      <Header />
      <ScrollUpButton />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/:placeId" component={Post} />
        <Route component={NoPageFound} />
      </Switch>
    </Router>
    </div>
  </AuthProvider>

export default App;