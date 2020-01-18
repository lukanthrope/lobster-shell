import * as React from 'react';

import CloseButton from '../CloseButton';

interface Props {
  url: string;
  del: Function;
  imageNum: number;
  isPanoram: boolean;
}

const ImgPrev = ({ url, del, imageNum, isPanoram }:Props) => 
  <div className="pos(r)" style={{'width': '200px', 'height': '200px'}}>
    <img src={url} className="w(100%) h(100%)" />
    <CloseButton 
      onClick={() => del(imageNum, isPanoram)}
      className="
        test
        pointer
        pos(a)
        top(0)
        right(0)
        al-s(f-end)
        color(lobster-pink)
        col-h(white)
        bgc-op(white)
        bord(round) 
        bord(l-pink)
        w(10px) 
        h(10px) 
        fs(1.1rem) 
        t-al(center)
        m-t(10px)
        m-r(10px)
        "
      />
  </div>

export default ImgPrev;