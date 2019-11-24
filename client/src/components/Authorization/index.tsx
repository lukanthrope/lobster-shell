import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import HeaderContext from '../Header/HeaderContext';
import Login from './Login';
import Registration from './Registration';


const Authorization = ({ haveAccount }: AuthorizationProps) => {
  const handleShowModal = React.useContext<Function>(HeaderContext);

  return (
    <div className="pos(f) bgc(white) w(50%) h(60%) left(20%) abs-center">
      <h2 className="pointer" onClick={() => handleShowModal()}>&#215;</h2>
      {haveAccount ? <Login /> : <Registration />}
    </div>
  );
};

interface AuthorizationProps {
  haveAccount: boolean;
}

export default Authorization;