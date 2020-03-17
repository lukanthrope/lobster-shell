import * as React from 'react';
import ImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = (props: ReactImageGalleryProps) =>
  <div>
    <ImageGallery items={props.items} />
  </div>

export default Gallery;