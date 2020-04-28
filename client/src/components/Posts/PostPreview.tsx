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
  <div className="f-basis(33%) w(300px) w-child(300px) h(300px)">
      { isTaken && <p>(in use now)</p> }
      <Link className="text-dec(none)" to={id}>
        <img className="w(300px) image-land" src={picture || defaultImage} />  
        <h3 className="color(lobster-pink)">{title}</h3>    
      </Link>
      <span className="d(in-flex)">
        <i className="material-icons errorMes">
            room    
        </i>
        <p>{location} </p>
      </span>
      { distance && <p> ~{distance} away</p> }
  </div>

export default PostPreview;