import * as React from 'react';
import { Link } from 'react-router-dom';

const defaultImage = require('../../images/no-img.png');

interface PostProps {
  id: string;
  title: string;
  picture?: string;
  isTaken?: boolean;
  location: string;
  distance?: string;
};

const PostPreview = ({ 
  title, 
  picture, 
  isTaken, 
  distance, 
  location, 
  id }: PostProps) => 
  <div className="f-basis(33%)">
      { isTaken && <p>(in use now)</p> }
      <Link className="text-dec(none)" to={id}>
        <img className="m-w(300px)" src={picture || defaultImage} />  
        <h3>{title}</h3>    
      </Link>
      <span className="d(in-flex)">
        <i className="material-icons" style={{'color': 'red'}}>
            room    
        </i>
        <p>{location} </p>
        
        { distance && <p> ~{distance} from you</p> }
      </span>
    
  </div>

export default PostPreview;