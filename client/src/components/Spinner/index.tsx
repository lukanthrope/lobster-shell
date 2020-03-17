import * as React from 'react';
import Loader from 'react-loader-spinner';

interface Props {
  fullPage?: boolean;
}

const Spinner = ({ fullPage = true }: Props) => 
  <>
    { fullPage ? 
      <div className="pos(f) top(0) left(0) w(100vw) h(100vh) zIndex(6) d(flex) just-cont(center) al-items(center) bgc-op(gray)">
        <Loader color="#ac08a3" />
      </div> :
      <Loader color="#ac08a3" /> }
  </>

export default Spinner;