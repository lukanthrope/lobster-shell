import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import { Post as PostResponse } from '../../components/Posts';
import MapDiv from '../../components/MapDiv';
import Panoram from '../../components/Panoram';
import Spinner from '../../components/Spinner';
import Book from '../../components/Book';

import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";

interface Vars {
  postId: string;
}

interface GetPost {
  getPost: PostResponse;
}

export const PostContext = React.createContext(null);

const Post = (props:any) => {
  const { data, loading, error } = useQuery<GetPost, Vars>(GET_POST, {
    variables: {
      postId: props.match.params.placeId,
    }
  });

  let isFullScreen:boolean = false;
  const lat = Number(data?.getPost.location.lat || 0);
  const lon = Number(data?.getPost.location.lon || 0);
  const items:Array<ReactImageGalleryItem> = [];

  const RenderPanorama = (item:ReactImageGalleryItem) =>
    <Panoram url={item.original} height={isFullScreen ? '100vh' : '250px'} />;

  React.useEffect(() => {
    if (data) {
      data.getPost.pictures.map((el:string) => 
        items.push({ 
          thumbnail: el, 
          original: el,
        })
      );
        
      data.getPost.panoramas.map((el:string) => 
        items.push({ 
          thumbnail: el, 
          original: el, 
          renderItem: RenderPanorama, 
        })
      );
    }
  });

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
        
        
        { 
          (data.getPost.pictures || data.getPost.panoramas) && 
          (data.getPost.pictures.length !== 0 || data.getPost.panoramas.length !== 0) && 
          <ImageGallery 
            items={items}
            onScreenChange={() => { isFullScreen = !isFullScreen }} 
          />
        }

        <PostContext.Provider 
          value={{
            postId: props.match.params.placeId,
            schedule: data.getPost.schedule,
          }}>
          <Book />
        </PostContext.Provider>
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
      schedule {
        fromDate
        toDate
      }
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