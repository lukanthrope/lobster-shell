import * as React from 'react';

// @ts-ignore
import { Pannellum } from "pannellum-react";
import { Config } from './panorama.types';

interface Props {
  url: string;
  height: string;
}

const Panoram = ({ url, height }: Props) => 
  <Pannellum
    image={url}
    height={height}
    pitch={10}
    yaw={180}
    hfov={110}
    autoLoad
  />

export default Panoram;