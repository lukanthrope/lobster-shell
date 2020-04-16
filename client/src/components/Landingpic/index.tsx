import * as React from 'react';
const landingImage = require('../../images/aa.jpg');

const Landingpic:React.FC = () => 
  <div>
    <img 
      className="image-land select-off" 
      src={landingImage} 
    />
  </div>

export default Landingpic;