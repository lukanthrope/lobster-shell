import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import { Post as PostResponse, Schedule } from '../../components/Posts';
import MapDiv from '../../components/MapDiv';
import Panoram from '../../components/Panoram';
import Spinner from '../../components/Spinner';
import Book from '../../components/Book';
import { AuthContext } from '../../context/auth';
import Check from '../../components/Check';
import { isTakenNowText } from '../../utils/handleDate';

import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";

const defaultImage = require('../../images/no-img.png');

interface Vars {
  postId: string;
}

export interface GetPost {
  getPost: PostResponse;
}

export const PostContext = React.createContext(null);

const Post = (props:any) => {
  const [items, setItems] = React.useState<Array<ReactImageGalleryItem>>([]);
  const { user } = React.useContext(AuthContext);
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
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [deletePost] = useMutation<boolean, Vars>(DELETE_POST, {
    variables: {
      postId: props.match.params.placeId,
    }
  })
  const [bookList, setBookList] = React.useState<Schedule[]>(null);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  
  const lat = data?.getPost.location.coordinates[0] || 0;
  const lon = data?.getPost.location.coordinates[1] || 0;
  
  const RenderPanorama = (item:ReactImageGalleryItem) => 
    <Panoram url={item.original} />;
  
  const pushToBookList = (el: Schedule) => {
    setBookList((prev) => [...prev, el]);
  }

  const modalCallack = () => {
    deletePost();
    props.history.push('/');
  }

  const hideModal = () => {
    setShowModal(false);
  }

  const isSmallScreen = () => window.screen.width >= 760;


  if (error) 
    return <h1>No post found</h1>

  if (loading)
    return <Spinner />

  return (
    <div className="w(100%) m-t-portrait">
      <div className="m-t(10%) w(30vw) m-l(10%)">
        <div className="d(flex) just-cont(sp-between)">
          <h1 className="color(lobster-pink)">
            {data.getPost.title}
          </h1>
          <p className="errorMes">{data.getPost?.schedule.length !== 0 && `${isTakenNowText(data.getPost?.schedule)}`}</p>
        </div>
        
        <article>{data.getPost.description}</article>
        <p className="h(10px) d(flex) m-t(10px) m-b(10px)">
          <i className="material-icons" style={{'color': 'red'}}>
            room    
          </i> 
          {data.getPost.locationName}
        </p>
        
        <PostContext.Provider 
          value={{
            postId: props.match.params.placeId,
            schedule: bookList,
            pushToBookList,
            isFullScreen,
          }}>
          { 
            ((data.getPost.pictures || data.getPost.panoramas) && 
            (data.getPost.pictures.length !== 0 || data.getPost.panoramas.length !== 0)) ?
            <ImageGallery 
              items={items}
              onScreenChange={() => { setIsFullScreen(prev => !prev) }}
              showFullscreenButton={isSmallScreen()}
              showPlayButton={false}
            /> :
            <img src={defaultImage} className="m-w(90%)" />
          }
        
          <Book />
        </PostContext.Provider>
        {
          
          user?.id === data.getPost.userId &&
          <button 
            className="bord(red) errorMes fs(1.1rem) bgc(white) bgc-hov(gray) pointer m-t(10px) m-b(10px) p(5px)"
            onClick={() => setShowModal(true)}
            >
              delete
          </button>
        }
      </div>
      {lat && lon &&
        <MapDiv 
          lat={lat} 
          lon={lon} 
          address={data.getPost.locationName}  
          />
      }
      {
        showModal && 
        <Check
          func={modalCallack} 
          hide={hideModal} 
          question="Delete post?"
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
      locationName
      location {
        coordinates
      }
      pictures
      panoramas
      createdAt
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default Post;