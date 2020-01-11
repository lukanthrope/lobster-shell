import * as React from 'react';

interface LinkProps {
  haveAnAccount: boolean,
  redirect: Function,
}

const AuthLink = ({ haveAnAccount, redirect }: LinkProps) => (
  <a className="fs(0.8rem)">{haveAnAccount ? 'Have an account?': 'Have no account?'} 
      <a 
      className="pointer col-h(white) color(lobster-pink)"
      onClick={() => haveAnAccount ? redirect(true, true): redirect(false, true)}
      >{haveAnAccount ? ' Log in': ' Register'}
    </a>
  </a>
);

export default AuthLink;