import * as React from 'react';

// @ts-ignore
import { Pannellum } from "pannellum-react";
import { Config } from './panorama.types';

interface Props {
  url: string;
}

const Panoram = ({ url }: Props) => 
  <Pannellum
    image={url}
    pitch={10}
    yaw={180}
    hfov={110}
    autoLoad
    onLoad={() => {
      console.log("panorama loaded");
    }}
  />

export default Panoram;