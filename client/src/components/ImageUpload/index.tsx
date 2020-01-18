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
    <div className="m-t(10px)">{title}</div>
      
      <label className={classes}
        >
        <span>+</span>
        <input 
          className="pointer pos(a) top(0) right(0) file-uploader"
          name="photos"
          type="file"
          accept="image/*"
          onChange={(e: any) => callback(e, isPanoram)}
          />
      </label>
  
    <div>
      {images.length > 0 && 
        images.map((el:string, index:number) => 
          <ImgPrev key={index} imageNum={index} url={el} isPanoram={isPanoram} del={delImage} />
      )}
    </div>    
  </div>

export default ImageUpload;