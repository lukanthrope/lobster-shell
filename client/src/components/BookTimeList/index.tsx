import * as React from 'react';
import { PostContext } from '../../pages/Post';
import { Schedule } from '../Posts';
import { dateToString } from '../../utils/handleDate';

const BookTimeList = () => {
  const { schedule } = React.useContext(PostContext);
  const [showSchedule, setShowSchedule] = React.useState<boolean>(false);

  return (
    <div className="m-t(30px) m-b(10px)">
      <a
        className="color(lobster-pink) pointer fw(600) fs(1.3rem) text-dec(underline)"
        onClick={() => setShowSchedule(prev => !prev)}
        >
        {showSchedule ? 'hide schedule' : 'show schedule'}
      </a>
      { showSchedule &&
      <ul className="listStyle(none)">
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
      }
    </div>
  )
}

export default React.memo(BookTimeList);