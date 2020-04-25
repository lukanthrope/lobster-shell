import * as React from 'react';

interface Props {
  id: string;
  suggestions: any;
}

const Authocomplete = ({ id, suggestions }: Props) => 
  <datalist id={id}>
  { 
    suggestions?.map((el:any, index:number) => 
      <option 
        value={`${el.properties.name} ${el.properties?.street ? el.properties?.street : ''}`} 
        key={index} 
        />
      )
  }
  </datalist>

export default Authocomplete;