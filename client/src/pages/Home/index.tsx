import * as React from 'react';
import Posts from '../../components/Posts';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../context/auth';
const Landingpic = React.lazy(() => import('../../components/Landingpic'));

const Home:React.FC = () => {
  const [coords, setCoords] = React.useState([null, null]);
  const [err, setErr] = React.useState<string>(null);
  const { user } = React.useContext(AuthContext);

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
    <div className={`w(100%) ${user && 'm-t(100px)'}`}>
      { !user &&
      <React.Suspense fallback={ <Spinner /> }>  
        <Landingpic />
      </React.Suspense>
      }
      
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