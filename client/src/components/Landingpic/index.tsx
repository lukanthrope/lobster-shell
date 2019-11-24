import * as React from 'react';
const landingImage = require('../../images/aa.jpg');

const Landingpic:React.FC = () => (
  <img 
    className="image-land select-off" 
    src={landingImage} 
  />
);

export default Landingpic;