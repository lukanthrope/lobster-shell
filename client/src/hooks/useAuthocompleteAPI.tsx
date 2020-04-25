import * as React from 'react';
import { debounce } from 'lodash';
import axios from 'axios';

const SUGGESTION_NUMBER:number = 5;

type HookResult = {
  suggestions: any,
  delayedQuery: (q: string) => void,
}

type Hook = () => HookResult;

const useAuthocompleteAPI: Hook = () => {
  const [suggestions, setSuggestions] = React.useState(null);

  const delayedQuery = React.useCallback(debounce(async (q: string) => {
      const res = await axios.get(`http://photon.komoot.de/api/?q=${q}&limit=${SUGGESTION_NUMBER}`);
      setSuggestions(res);
    }, 500), []);

  return {
    delayedQuery,
    suggestions,
  }
} 

export default useAuthocompleteAPI;