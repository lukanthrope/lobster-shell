import * as React from 'react';
import Posts from '../../components/Posts';
import Spinner from '../../components/Spinner';
const Landingpic = React.lazy(() => import('../../components/Landingpic'));

const Home:React.FC = () => {
  const [coords, setCoords] = React.useState([null, null]);
  const [err, setErr] = React.useState<string>(undefined);

  function success(pos: Position) {
    const res = pos.coords;
    setCoords([res.longitude, res.latitude]);
  }

  function fail(err: PositionError) {
    setErr(err.message);
  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  return (
    <div className="w(100%)">
      <React.Suspense fallback={ <Spinner /> }>  
        <Landingpic />
      </React.Suspense>
      
      {
        coords && <Posts coordinates={coords} /> 
      }

      {
        err && <Posts />
      }
    </div>
  )
};

export default Home;