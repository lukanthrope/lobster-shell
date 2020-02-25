import * as React from 'react';
import Posts from '../../components/Posts';
const Landingpic = React.lazy(() => import('../../components/Landingpic'));

const Home:React.FC = () => (
  <div className="w(100%)">
    <React.Suspense fallback={<p>loading...</p>}>  
      <Landingpic />
    </React.Suspense>
    <Posts />
  </div>
);

export default Home;