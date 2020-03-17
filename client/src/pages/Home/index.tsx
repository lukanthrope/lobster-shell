import * as React from 'react';
import Posts from '../../components/Posts';
import Spinner from '../../components/Spinner';
const Landingpic = React.lazy(() => import('../../components/Landingpic'));

const Home:React.FC = () => (
  <div className="w(100%)">
    <React.Suspense fallback={ <Spinner /> }>  
      <Landingpic />
    </React.Suspense>
    <Posts />
  </div>
);

export default Home;