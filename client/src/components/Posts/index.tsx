import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Search from '../../components/Search';
import PostPreview from './PostPreview';
import Spinner from '../../components/Spinner';
import { convertDistance } from '../../utils/handleDistance';
import { isTakenNow } from '../../utils/handleDate';

export interface Location {
  coordinates: number[];
  type: string
}

export interface Schedule {
  fromDate: Date;
  toDate: Date;
}; 

export interface Dist {
  calculated: number;
}

export interface Post {
  id: string;
  title: string;
  userId?: string;
  schedule?: Array<Schedule>;
  pictures?: Array<string>;
  panoramas?: Array<string>;
  description?: string;
  isTaken?: boolean;
  locationName: string;
  location: Location;
  createdAt?: string;
  dist?: Dist;
};

export interface PostData {
  getPosts: Post[];
}

interface Variables {
  offset: number;
  limit: number;
  request?: string;
  userId?: string; 
  lon?: number;
  lat?: number;
}

interface Props {
  userId?: string;
  coordinates?: number[]; 
}

export const LIMIT_GET_POSTS:number = 12;

const Posts = ({ userId, coordinates = [null, null] }: Props) => {
  const [searchParam, setSearchParam] = React.useState<string>('');
  const { loading, error, data, fetchMore } = useQuery<PostData, Variables>(FETCH_POSTS, {
    variables: {
      offset: 0,
      limit: LIMIT_GET_POSTS,
      request: searchParam,
      userId,
      lon: coordinates[0],
      lat: coordinates[1],
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <div className="t-al(center) m-t(30px) m-b(100px)">
      {
        !userId &&
        <Search 
          find={ fetchMore } 
          setSearchParam={ setSearchParam }
          />
      }

      <div className="m-t(50px) m-b(100px) d(flex) m-l(8%) fs(0.8rem)">
      {
        !userId && !loading && data?.getPosts.length === 0 ? 
          <h1>No posts found</h1> : 
          !userId && <h1 className="fw(100)">The nearest places to you:</h1>
      }

      {
        userId && !loading && data?.getPosts.length === 0 ?
          <h1 className="fw(100)">You haven't shared places yet</h1> :
          userId && <h1 className="fw(100) m-t(50px)">Your posts:</h1>
      }
      </div>

        <div className="d(flex) f-flow(row-wrap) just-cont(start)">
          {
            loading ? <Spinner />
            :
            data?.getPosts && !error &&
            data?.getPosts.map((el: Post) => 
              <PostPreview
                id={el.id}
                title={el.title}
                picture={el.pictures[0] || el.panoramas[0]}
                location={el.locationName}
                key={el.id} 
                isTaken={isTakenNow(el.schedule)}
                distance={convertDistance(el?.dist?.calculated)}
                />
            )
          }
          
        </div>

        { data?.getPosts.length % 12 === 0 && data?.getPosts.length !== 0 &&
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
                      fs(1.1rem)"
              onClick={() => fetchMore({
                variables: {
                  offset: data.getPosts.length,
                  request: searchParam,
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
        }
    </div>
  )
}

const FETCH_POSTS = gql`
  query getPosts($limit: Int!, $offset: Int, $request: String, $userId: ID, $lon: Float, $lat: Float),  {
    getPosts(limit: $limit, offset: $offset, request: $request, userId: $userId, lon: $lon, lat: $lat) {
      id
      title
      description
      locationName
      schedule {
        fromDate
        toDate
      }
      pictures
      panoramas
      dist {
        calculated
      }
    }
  }
`;

export default Posts;