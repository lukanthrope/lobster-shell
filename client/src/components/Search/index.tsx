import * as React from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import { LIMIT_GET_POSTS, PostData } from '../Posts';

interface Props {
  find: Function;
  setSearchParam?: Function;
}

interface FetchMore {
  fetchMoreResult: PostData;
}

export const SUGGESTION_NUMBER:number = 5;

const Search = ({ find, setSearchParam }: Props) => {
  const [searchVal, setSearchVal] = React.useState<string>('');
  const [suggestions, setSuggestions] = React.useState(null);
  const delayedQuery = React.useCallback(debounce(async (q: string) => {
    const res = await axios.get(`http://photon.komoot.de/api/?q=${q}&limit=${SUGGESTION_NUMBER}`);
    setSuggestions(res);
  }, 500), []);

  const OnChange = async (e: React.ChangeEvent<HTMLInputElement>) => { 
      setSearchVal(e.target.value);
      if (e.target.value.trim() !== '')
        delayedQuery(e.target.value);
  };

  const OnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim() !== '') {
      setSearchParam(searchVal);
      find({ 
        variables: { 
          offset: 0, 
          limit: LIMIT_GET_POSTS, 
          request: searchVal,
        },
        updateQuery: (_:any, { fetchMoreResult }:FetchMore) => {
          if (!fetchMoreResult) 
            return null;
          return Object.assign({}, { getPosts: fetchMoreResult.getPosts});
        }
      });
    }
  }

  return (
    <form className="" onSubmit={(e) => OnSubmit(e)}>
      <input 
        list="search" 
        type="input" 
        name="searchField" 
        value={searchVal} 
        onChange={(e) => OnChange(e)} 
        />
      <datalist id="search">
        { 
          suggestions?.data.features.map((el:any, index:number) => 
            <option 
              value={`${el.properties.name} ${el.properties?.street ? el.properties?.street : ''}`} 
              key={index} 
              />
            )
        }
      </datalist>
      <button 
        type="submit" 
        className="
            m-t(20px) 
            h(35px) 
            submit 
            bgc(l-pink) 
            w(30px)
            bord(none) 
            o-line(none) 
            pointer 
            col-h(white)
            color(nrw) 
            al-s(center)
            
            fs(1.1rem)"  
        >
          <i className="material-icons">
            search
          </i>
      </button>
    </form>
  )
}
export default Search;