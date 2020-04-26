import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// @ts-ignore
import DateTimePicker from 'react-datetime-picker';

import { PostContext } from '../../pages/Post';
import { AuthContext } from '../../context/auth';
import BookTimeList from '../BookTimeList'; 

interface Check {
  bookPost: boolean;
}

interface Vars {
  postId: string;
  start: number;
  end: number;
}

const Book = () => {
  const { postId, pushToBookList } = React.useContext(PostContext);
  const [stateDate, setStateDate] = React.useState<Date>(new Date());
  const [stateDate2, setStateDate2] = React.useState<Date>(new Date());
  const [bookErr, setBookErr] = React.useState<boolean>(false);

  const [ bookPost, { data }] = useMutation<Check, Vars>(BOOK_POST);
  const { user } = React.useContext(AuthContext);
  
  const onTimeChange = (date:Date) => setStateDate(date);
  const onTimeChange2 = (date:Date) => setStateDate2(date);

  const Submit = () => {
    if (stateDate2 <= stateDate) {
      setBookErr(true);
      return;
    }
    bookPost({ 
      variables: { 
        postId, 
        start: stateDate.getTime(), 
        end: stateDate2.getTime(),
      } 
    });

    pushToBookList({ 
      fromDate: stateDate, 
      toDate: stateDate2 
    });
    if (bookErr)
      setBookErr(false);
  }

  return (
    <div className="zIndex(4) pos(r)">
      {
        user ?
          <>
          <div className="d(flex) m-t(30px)">
            <DateTimePicker
              onChange={onTimeChange}
              value={stateDate}
              />
            <p className="m-t(5px) m-l(5px) m-r(5px) fw(600)">-</p>
            <DateTimePicker
              onChange={onTimeChange2}
              value={stateDate2}
              />
            <button
              className={`pointer bord(l-pink) w(50px) m-l(10px)
              color(lobster-pink) fs(1.1rem) bgc(white) bgc-hov(gray)`} 
              onClick={Submit}
              >
                Book
            </button>
          </div>
          {
            bookErr && <p>Set correct range of dates</p>
          }
          {
            !bookErr && data && (data.bookPost ? <p>Successfully booked!</p> : <p>Theese dates are already taken</p>)
          }
          </> :
          <p>Log in to book this place</p>
      }
      
      <BookTimeList />
    </div>
  )
}

const BOOK_POST = gql`
  mutation bookPost($postId: ID!, $start: Date!, $end: Date!) {
    bookPost(postId: $postId, start: $start, end: $end) 
  }
`;

export default Book;