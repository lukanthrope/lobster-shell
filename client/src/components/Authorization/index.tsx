import * as React from 'react';

import HeaderContext from '../Header/HeaderContext';
import Login from './Login';
import Registration from './Registration';
import CloseButton from '../CloseButton';

interface AuthorizationProps {
  haveAccount: boolean;
}

const Authorization = ({ haveAccount }: AuthorizationProps) => {
  const handleShowModal = React.useContext<Function>(HeaderContext);

  return (
    <div
      className="Parent top(0) pos(f) w(100%) h(100%) bgc-op(black)"
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
        overfl-y(auto) 
        w(30%) 
        ${haveAccount ? 'h(60%)' : 'h(75%)'} 
        bord(l-pink) 
        m(auto) 
        top(0)
        bottom(0)
        right(0)
        left(0)`
      }
        >
        <CloseButton
          className="
            pointer 
            al-s(f-end)
            col-h(white)
            bord(round) 
            bord(l-pink)
            w(10px) 
            h(10px) 
            fs(1.1rem) 
            t-al(center)
            m-t(10px)
            m-r(10px)
            "
          onClick={() => handleShowModal()} 
          />
        <div className="d(flex) just-cont(center)">
          {haveAccount ? <Login /> : <Registration />}
        </div>
      </div>
    </div>
  );
};

export default Authorization;