import * as React from 'react';

import ImgPrev from '../ImgPrev';

interface Props {
  title?: string;
  classes: string;
  callback: Function;
  delImage: Function;
  images: string[];
  isPanoram?: boolean;
}

const ImageUpload = ({ 
    title = 'Upload photos', 
    classes, 
    callback, 
    images, 
    delImage,
    isPanoram = false,
  }: Props) => 
  <div>
    <section>
      <p className="m-t(10px)">{title}</p>
      
      <label className={`${classes} pos(r) top(-20px) left(150px)`}
        >
        <span className="p(0px;5px)">+</span>
        <input 
          className="pointer pos(a) top(0) right(0) file-uploader"
          name="photos"
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => callback(e, isPanoram)}
          />
      </label>
    </section>
  
    <div className="d(flex) f-wrap(wrap) just-cont(sp-around)">
      {images.length > 0 && 
        images.map((el:string, index:number) => 
          <ImgPrev key={`${el}_${index}`} imageNum={index} url={el} isPanoram={isPanoram} del={delImage} />
      )}
    </div>    
  </div>

export default ImageUpload;