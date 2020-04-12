import * as React from 'react';
import { Link } from 'react-router-dom';

const defaultImage = require('../../images/no-img.png');

interface PostProps {
  id: string;
  title: string;
  picture?: string;
  description?: string;
  isTaken?: boolean;
  location: string;
};

const PostPreview = ({ title, description, picture, isTaken, location, id }: PostProps) => 
  <div className="f-basis(33%)">
    
      <Link className="text-dec(none)" to={id}>
        <img className="m-w(300px)" src={picture || defaultImage} />  
        <h3>{title}</h3>    
      </Link>
      <span className="d(in-flex)">
        <i className="material-icons" style={{'color': 'red'}}>
            room    
        </i>
        <h4>{location}</h4>
      </span>
      <p>{description || ''}</p>
    
  </div>

export default PostPreview;