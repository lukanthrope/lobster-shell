import * as React from 'react';

import HeaderContext from '../Header/HeaderContext';
import Login from './Login';
import Registration from './Registration';

interface AuthorizationProps {
  haveAccount: boolean;
}

const Authorization = ({ haveAccount }: AuthorizationProps) => {
  const handleShowModal = React.useContext<Function>(HeaderContext);

  return (
    <div
      className="Parent pos(f) w(100%) h(100%) bgc-op(black)"
      onClick={(e:any) => {
        if (e.target.className.includes('Parent')) 
          handleShowModal(); 
      }}
      >
      <div className={`
        d(flex) 
        f-dir(col) 
        pos(f) 
        bgc(white) 
        w(30%) 
        ${haveAccount ? 'h(60%)' : 'h(75%)'} 
        bord(l-pink) 
        left(20%) 
        abs-center`
      }
        >
        <div className="
          pointer 
          bord(round) 
          bord(l-pink)
          w(10px) 
          h(10px) 
          fs(1.1rem) 
          t-al(center)
          m-t(10px)
          m-r(10px)
          " 
          style={{'alignSelf': 'flex-end'}}
          onClick={() => handleShowModal()}>
            &#215;
        </div>
        <div className="d(flex) just-cont(center)">
          {haveAccount ? <Login /> : <Registration />}
        </div>
      </div>
    </div>
  );
};

export default Authorization;