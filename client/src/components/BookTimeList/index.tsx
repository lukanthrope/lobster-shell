import * as React from 'react';
import { PostContext } from '../../pages/Post';
import { Schedule } from '../Posts';
import { dateToString } from '../../utils/handleDate';

const BookTimeList = () => {
  const { schedule } = React.useContext(PostContext);
  return (
    <React.Fragment>
      <ul>
        {
          schedule &&
          schedule.map((el: Schedule, index: number) =>
            <li key={index}>
              <span>{dateToString(new Date(el.fromDate))} </span>-
              <span> {dateToString(new Date(el.toDate))}</span>
            </li>
          ) 
        }
      </ul>
    </React.Fragment>
  )
}

export default React.memo(BookTimeList);