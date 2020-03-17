import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import PostPreview from './PostPreview';
import Spinner from '../../components/Spinner';

export interface Location {
  locationName: string;
  lon?: string;
  lat?: string;
}

export interface Post {
  id: string;
  title: string;
  userId?: string;
  pictures?: Array<string>;
  panoramas?: Array<string>;
  description?: string;
  price?: number;
  location: Location;
  createdAt?: string;
};

interface PostData {
  getPosts: Post[];
}

interface Variables {
  offset: number;
  limit: number;
}

const Posts = () => {
  const { loading, error, data, fetchMore } = useQuery<PostData, Variables>(FETCH_POSTS, {
    variables: {
      offset: 0,
      limit: 10,
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <div className="t-al(center) m-t(20px)">
      <h2>Recent places:</h2>

        <div className="d(flex) f-flow(row-wrap) just-cont(start)">
          {
            loading ? <Spinner />
            :
            data.getPosts && !error &&
            data.getPosts.map((el: Post) => 
              <PostPreview
                id={el.id}
                title={el.title}
                picture={el.pictures[0]}
                description={el.description}
                price={el.price}  
                location={el.location.locationName}
                key={el.id} 
                />
            )
          }
        </div>

        <button 
          className="m-t(20px)
                    m-b(30px) 
                    h(35px) 
                    submit 
                    bgc(l-pink) 
                    w(120px) 
                    bord(none) 
                    o-line(none) 
                    pointer 
                    col-h(white)
                    color(nrw) 
                    al-s(center)
                    shad(l-pink)
                    fs(1.1rem)"
            onClick={() => fetchMore({
              variables: {
                offset: data.getPosts.length
              },
              updateQuery: (prev: PostData, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts]
                });
              }
            })}
          >
          More
        </button>
    </div>
  )
}

const FETCH_POSTS = gql`
  query getPosts($limit: Int!, $offset: Int) {
    getPosts(limit: $limit, offset: $offset) {
      id
      title
      description
      price
      location {
        locationName
      }
      pictures
    }
  }
`;

export default Posts;