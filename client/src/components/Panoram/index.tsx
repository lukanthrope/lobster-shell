import * as React from 'react';
// @ts-ignore
import { Pannellum } from "pannellum-react";
import { Config } from './panorama.types';
import { PostContext } from '../../pages/Post';

interface Props {
  url: string;
}

const Panoram = ({ url }: Props) => {
  const { isFullScreen } = React.useContext(PostContext);
  return <Pannellum
    image={url}
    height={isFullScreen ? '100vh' : '250px'}
    pitch={10}
    yaw={180}
    hfov={110}
    autoLoad
  />
};

export default Panoram;