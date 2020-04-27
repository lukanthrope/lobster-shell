import * as React from 'react';
import Authocomplete from '../Authocomplete';
import { LIMIT_GET_POSTS, PostData } from '../Posts';
import useAuthocompleteAPI from '../../hooks/useAuthocompleteAPI';

interface Props {
  find: Function;
  setSearchParam?: Function;
}

interface FetchMore {
  fetchMoreResult: PostData;
}


const Search = ({ find, setSearchParam }: Props) => {
  const [searchVal, setSearchVal] = React.useState<string>('');
  const { delayedQuery, suggestions } = useAuthocompleteAPI();

  const OnChange = async (e: React.ChangeEvent<HTMLInputElement>) => { 
    setSearchVal(e.target.value);
    if (e.target.value.trim() !== '')
      delayedQuery(e.target.value);
  };

  const OnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim() !== '') {
      setSearchParam(searchVal);
      setSearchVal('');
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
    <form onSubmit={(e) => OnSubmit(e)}>
        <input 
          className="h(40px) w(50%) fs(1.3rem)"
          list="search" 
          type="input" 
          name="searchField" 
          value={searchVal} 
          onChange={(e) => OnChange(e)} 
          placeholder="search places.."
          />
        <Authocomplete 
          id="search"
          suggestions={suggestions?.data.features}
          />

        <button 
          type="submit" 
          className="
              pos(r)
              bord-l(none)
              top(3px)
              h(45px) 
              
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