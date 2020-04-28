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
  <div className="f-basis(33%) m-b(100px)">
    <div className="pos(r) m(auto) w(300px) h(300px) w-child(300px) shad">
      <Link className="text-dec(none)" to={id}>
        <img className={`w(300px) h(200px) image-land ${isTaken ? 'opacity(0.5)' : ''}`} src={picture || defaultImage} />   
      </Link>
      <div className="pos(a) bottom(1px) left(0) right(0) m-l(auto) m-r(auto)">
        <Link className="text-dec(none)" to={id}> 
          <h3 className="m-t(30px) color(lobster-pink)">{title}</h3>    
        </Link>
        <span className="d(in-flex)">
          <i className="material-icons errorMes">
              room    
          </i>
          <p>{location}</p>
        </span>
      </div>
      { isTaken && <p className="pos(a) fs(1.3rem) fs(600) errorMes top(10px) right(10px)">in use now</p> }
      { distance && <p className="pos(r) color(gray) m-t(5px) left(-20px)">{distance} away</p> }
    </div>
  </div>

export default PostPreview;