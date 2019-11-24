import * as React from 'react';

import { AuthContext } from '../../context/auth';
import HeaderContext from './HeaderContext';
import Authorization from '../Authorization';

const Header:React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [haveAccount, setHaveAccount] = React.useState<boolean>(false);
  const authContext = React.useContext(AuthContext);
  const { user, logout } = authContext;

  const handleShowModal = (login:boolean = false, show:boolean = false):void => {
    setShowModal(show);
    setHaveAccount(login);
  }

  return (
    <>
      <header className="bgc-op(white) pos(f) d(in-flex) just-cont(center) w(100%) bord(bot) h(70px)">
        <div className="d(in-flex) just-cont(sp-between) al-items(center) w(90%) ">
          <h2 className="font(logo) select-off">lobster-shell</h2>
            <div className="color(lobster-pink) fs(1.1rem) fw(600)">
              {
                authContext.user 
                  ? <>
                    <a>{user.username}</a>
                    <a className="p(left:15px) pointer" onClick={() => logout()}>logout</a>
                    </>
                  : <>
                      <a className="pointer" onClick={() => handleShowModal(false, true)}>sign up</a>
                      <a className="p(left:15px) pointer" onClick={() => handleShowModal(true, true)}>login</a>
                    </> 
              }
            </div>
        </div>
      </header>
      {
        showModal && 
        <HeaderContext.Provider value={handleShowModal}>
          <Authorization haveAccount={haveAccount} />
        </HeaderContext.Provider>  
      }
    </>
  );
};

export default Header;