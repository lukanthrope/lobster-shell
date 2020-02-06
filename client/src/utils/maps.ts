import axios from 'axios';

export interface Coordinates {
  lon: string;
  lat: string;
}

export async function isValidAdress(url:string):Promise<Coordinates> {
  if (!url || url.trim() === '')
    throw new Error('wrong adress');

  const res = await axios(`https://nominatim.openstreetmap.org/search/${encodeURIComponent(url)}?format=json&addressdetails=1&limit=1&polygon_svg=1`);
  
  if (res.data.length < 1) 
    throw new Error('wrong adress');
    
  const { lon, lat } = res.data[0];
  return { lon, lat}
}