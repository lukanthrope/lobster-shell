import * as React from 'react';
const Landingpic = React.lazy(() => import('../../components/Landingpic'));

const Home:React.FC = () => (
  <div>
    <React.Suspense fallback={<p>loading...</p>}>  
      <Landingpic />
    </React.Suspense>
  </div>
);

export default Home;