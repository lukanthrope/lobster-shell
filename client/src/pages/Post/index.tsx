import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Post as PostResponse } from '../../components/Posts';
import MapDiv from '../../components/MapDiv';

interface Vars {
  postId: string;
}

interface GetPost {
  getPost: PostResponse;
}



const Post = (props:any) => {
  const { data, loading, error } = useQuery<GetPost, Vars>(GET_POST, {
    variables: {
      postId: props.match.params.placeId,
    }
  });
  const lat = Number(data?.getPost.location.lat || 0);
  const lon = Number(data?.getPost.location.lon || 0);

  if (error) 
    return <div><h1>No post found</h1></div>

  return (

      <div>

        {lat && lon &&
          <MapDiv lat={lat} lon={lon} />
        }
      </div>

  )
}

/*
<div className="m-t(20%)">
      
      <div className="m-t(20%)" style={{ 'width': '400px', 'height': '400px' }}>
      <Map center={[lat, lon]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={[lat, lon]}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      </Map>
      </div>

      
      
    </div>
      */

const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      title
      description
      price
      location {
        locationName
        lon
        lat
      }
      pictures
      panoramas
      createdAt
    }
  }
`;

export default Post;