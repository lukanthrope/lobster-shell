import * as React from 'react';
import { PostContext } from '../../pages/Post';
import { Schedule } from '../Posts';

const BookTimeList = () => {
  const { schedule } = React.useContext(PostContext);
  return (
    <React.Fragment>
      <ul>
        {
          schedule &&
          schedule.map((el: Schedule, index: number) =>
            <li key={index}>
              <span>{new Date(el.fromDate).toISOString()}</span>
              <span>{new Date(el.toDate).toISOString()}</span>
            </li>
          ) 
        }
      </ul>
    </React.Fragment>
  )
}

export default React.memo(BookTimeList);