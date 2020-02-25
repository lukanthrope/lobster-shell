import * as React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';

import 'leaflet/dist/leaflet.css';
const RedIcon  = require('../../images/loc.png');

interface Coordinates {
  lat: number;
  lon: number;
}

const myIcon = L.icon({
  iconUrl: RedIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 5],
  popupAnchor: [0, -41],
});

const MapDiv = ({ lat, lon }: Coordinates) => 
  <Map center={[lat, lon]} zoom={15} maxZoom={19} style={{ 'height': '100vh' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={[lat, lon]} icon={myIcon}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>

export default MapDiv;