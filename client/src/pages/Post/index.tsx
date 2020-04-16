import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import { Post as PostResponse, Schedule } from '../../components/Posts';
import MapDiv from '../../components/MapDiv';
import Panoram from '../../components/Panoram';
import Spinner from '../../components/Spinner';
import Book from '../../components/Book';

import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";

interface Vars {
  postId: string;
}

export interface GetPost {
  getPost: PostResponse;
}

export const PostContext = React.createContext(null);

const Post = (props:any) => {
  const [items, setItems] = React.useState<Array<ReactImageGalleryItem>>([]);
  const { data, loading, error } = useQuery<GetPost, Vars>(GET_POST, {
    variables: {
      postId: props.match.params.placeId,
    },
    onCompleted(data) {
      data.getPost.pictures.map((el:string) => 
        setItems(prev => [
            ...prev,
            { 
              thumbnail: el, 
              original: el,
            }
        ])
      );

      data.getPost.panoramas.map((el:string) => 
        setItems(prev => [
          ...prev ,
          { 
            thumbnail: el, 
            original: el,
            renderItem: RenderPanorama,
          }
        ])
      );
      
      setBookList(data.getPost.schedule);
    }
  });
  const [bookList, setBookList] = React.useState<Schedule[]>(null);
  let [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  
  const lat = Number(data?.getPost.location.lat || 0);
  const lon = Number(data?.getPost.location.lon || 0);
  // isFUllscreen - state
  const RenderPanorama = (item:ReactImageGalleryItem) => 
    <Panoram url={item.original} />;
  
  const pushToBookList = (el: Schedule) => {
    setBookList((prev) => [...prev, el]);
  }

  React.useEffect(() => console.log(isFullScreen))

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
        
        <PostContext.Provider 
          value={{
            postId: props.match.params.placeId,
            schedule: bookList,
            pushToBookList,
            isFullScreen,
          }}>
          { 
            (data.getPost.pictures || data.getPost.panoramas) && 
            (data.getPost.pictures.length !== 0 || data.getPost.panoramas.length !== 0) &&
            <ImageGallery 
              items={items}
              onScreenChange={() => { setIsFullScreen(prev => !prev) }} 
            />
          }
        
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

export const GET_POST = gql`
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