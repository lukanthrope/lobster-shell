import * as React from 'react';
const landingImage = require('../../images/landing-image.jpg');

const Landingpic:React.FC = () => 
  <div className="welcome w(100%) h(100vh) t-al(center)">
    <div className="pos(r) top(40%) fs(2rem) image-land pointer">
      <h1>Welcome to lobster-shell</h1>
      <p className="m-t(10px)">Share places to chill and find ones nearby you!</p>
    </div>
  </div>

export default Landingpic;