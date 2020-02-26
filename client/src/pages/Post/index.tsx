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

  if (loading)
    return <h1>Loading..</h1>

  return (

    <div className="w(100%) m-t(10%)">
      <h2>{data.getPost.title}</h2>
      <article>{data.getPost.description}</article>
      <p>{data.getPost.location.locationName}</p>
      {lat && lon &&
        <MapDiv lat={lat} lon={lon} address={data.getPost.location.locationName}  />
      }

      <button>Rent</button>
    </div>

  )
}

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