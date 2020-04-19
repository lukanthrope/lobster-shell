import * as React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './index.css';
const RedIcon  = require('../../images/loc.png');

interface Coordinates {
  address: string;
  lat: number;
  lon: number;
  isPreview?: boolean;
}

const myIcon = L.icon({
  iconUrl: RedIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 5],
  popupAnchor: [0, -41],
});

const MapDiv = ({ lat, lon, isPreview = true, address }: Coordinates) => 
  <div className={`${isPreview ? 'map': 'map-preview'}`}  >
    <Map
      center={[lon, lat]} 
      zoom={15} 
      maxZoom={19} 
      style={{'height': 'calc(100vh - 70px)'}}
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker style={{'zIndex': '3'}} position={[lon, lat]} icon={myIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </Map>
  </div>

export default MapDiv;