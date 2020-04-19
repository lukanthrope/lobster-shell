import * as React from 'react';
import { AuthContext } from '../../context/auth';
import Posts from '../../components/Posts';

const PersonalCabinet = () => {
  const { user } = React.useContext(AuthContext);
  
  return (
    <div>
      <Posts userId={user.id} />
    </div>
  )
}

export default PersonalCabinet;