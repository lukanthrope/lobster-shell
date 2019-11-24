import * as React from 'react';

import { AuthProvider } from './context/auth';
import Header from './components/Header';
const Home = React.lazy(() => import('./pages/Home'));

import 'ungrid';
import './App.css';
import './index.css'; 

const App:React.FC = () => (
  <AuthProvider>
    <div className="App">
      <Header />
      <React.Suspense fallback={<p>loading...</p>}>  
        <Home />
      </React.Suspense>
    </div>
  </AuthProvider>
);

export default App;