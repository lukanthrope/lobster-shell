import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ReactImageGalleryItem } from 'react-image-gallery';

import { Post as PostResponse } from '../../components/Posts';
import MapDiv from '../../components/MapDiv';
import Panoram from '../../components/Panoram';
import Gallery from '../../components/Gallery';
import Spinner from '../../components/Spinner';

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
  const items:Array<ReactImageGalleryItem> = [];

  const RenderPanorama = (item:ReactImageGalleryItem) =>
    <Panoram url={item.original} />;

  React.useEffect(() => {
    if (data) {
      data.getPost.pictures.map((el:string) => 
        items.push({ 
          thumbnail: el, 
          original: el,
        })
      );
        console.log(data.getPost.userId)
      data.getPost.panoramas.map((el:string) => 
        items.push({ 
          thumbnail: el, 
          original: el, 
          renderItem: RenderPanorama, 
        })
      );
    }
  }, [data]);

  if (error) 
    return <h1>No post found</h1>

  if (loading)
    return <Spinner />

  return (

    <div className="w(100%)">
      <div className="m-t(10%) w(30vw) m-l(10%)">
        <h1>{data.getPost.title}</h1>
        <article>{data.getPost.description}</article>
        <p>{data.getPost.location.locationName}</p>
        <h2>{data.getPost.price <= 0 ? `free` : data.getPost.price}</h2>
        
        { 
          (data.getPost.pictures || data.getPost.panoramas) && 
          (data.getPost.pictures.length !== 0 || data.getPost.panoramas.length !== 0) && 
            <Gallery items={items} /> 
        }
        
        <button>Rent</button>
      </div>
      {lat && lon &&
        <MapDiv 
          lat={lat} 
          lon={lon} 
          address={data.getPost.location.locationName}  
          />
      }
    </div>

  )
}

const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      userId
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