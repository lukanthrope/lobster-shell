import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';

import { AuthContext } from '../../context/auth';
import HeaderContext from './HeaderContext';
import Authorization from '../Authorization';

const Header = ({ history }: RouteComponentProps) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [haveAccount, setHaveAccount] = React.useState<boolean>(false);
  const authContext = React.useContext(AuthContext);
  const { user, logout } = authContext;

  const Logout = () => {
    logout();
    history.push('/');
  }

  const handleShowModal = (login:boolean = false, show:boolean = false):void => {
    setShowModal(show);
    setHaveAccount(login);
  }

  return (
    <>
      <header className="bgc-op(white) pos(f) d(in-flex) left(0) top(0) just-cont(center) w(100%) bord(bot) h(70px)">
        <div className="d(in-flex) just-cont(sp-between) al-items(center) w(90%) ">
          <h2 className="font(logo) select-off">
            <Link to="/" className="text-dec(none)">lobster-shell</Link>
          </h2>
            <div className="color(lobster-pink) fs(1.1rem) fw(600)">
              {
                user 
                  ? <>
                    <Link to="/account" className="text-dec(none) p(left:15px) pointer col-h(white)">{user.username}</Link>
                    <Link to="/host" className="text-dec(none) p(left:15px) pointer col-h(white)">host</Link>
                    <a className="p(left:15px) pointer col-h(white)" onClick={() => Logout()}>logout</a>
                    </>
                  : <>
                      <a className="pointer col-h(white)" onClick={() => handleShowModal(false, true)}>sign up</a>
                      <a className="p(left:15px) pointer col-h(white)" onClick={() => handleShowModal(true, true)}>login</a>
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

export default withRouter(Header);