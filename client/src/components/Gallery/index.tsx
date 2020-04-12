import * as React from 'react';
import ImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = (props: ReactImageGalleryProps) =>
  <ImageGallery 
    items={props.items}
    onScreenChange={props.onScreenChange} 
    />

export default Gallery;