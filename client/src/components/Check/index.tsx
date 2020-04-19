import * as React from 'react';

interface Props {
  func: Function;
  hide: Function;
  question: string;
}

const BUTTON_STYLE: string = `pointer m-t(10px) bord(none) h(35px) w(50px) 
                              color(lobster-pink) fs(1.1rem) bgc(white) bgc-hov(gray)`;

const Check = ({ func, hide, question }: Props) => 
  <div className="Parent top(0) pos(f) w(100%) h(100%) bgc-op(black)">
    <div className="
      p(20px)
      d(flex)
      f-dir(col)
      pos(f) 
      t-al(center)
      w(250px)
      h(70px)
      bgc(white)
      bord(l-pink) 
      m(auto) 
      top(0)
      bottom(0)
      right(0)
      left(0)"
      >
      <h2>{question}</h2>

      <div className="w(100%)">  
        <button
          className={BUTTON_STYLE} 
          onClick={() => {
            func();
            hide();
          }}
          >
          Yes
        </button>
        <button
          className={BUTTON_STYLE}
          onClick={() => hide()}
          >
          No
        </button>
      </div>
    </div>
  </div>

export default Check;