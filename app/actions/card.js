import fetch from "node-fetch"

const prefix = "[Card]"

export const cardActionTypes = {
  SEARCH_REQUEST: `${prefix} Search Request`,
  SEARCH_SUCCESS: `${prefix} Search Success`,
  SEARCH_ERROR: `${prefix} Search Error`,
  DETAILS_REQUEST: `${prefix} Details Request`,
  DETAILS_SUCCESS: `${prefix} Details Success`,
  DETAILS_ERROR: `${prefix} Details Error`
}

// actions are functions
// actions will dispatch
export const searchRequest = () => ({
  type: cardActionTypes.SEARCH_REQUEST
})

export const searchSuccess = results => ({
  type: cardActionTypes.SEARCH_SUCCESS,
  results, // means 'results: results'
})

export const searchError = () => ({
  type: cardActionTypes.SEARCH_ERROR
})

export const detailsRequest = () => ({
  type: cardActionTypes.DETAILS_REQUEST,
})

export const detailsSuccess = details => ({
  type: cardActionTypes.DETAILS_SUCCESS,
  details,
})

export const detailsError = () => ({
  type: cardActionTypes.DETAILS_ERROR
})

// this returns dispatch
export const fetchCards = searchPhrase => {
  return async dispatch => {
    dispatch(searchRequest());
    const res = await fetch(
      `https://api.scryfall.com/cards/search?q=${searchPhrase}`
    );
    const { data } = await res.json();
    return dispatch(searchSuccess(data || []))
  }
}

export const fetchCardDetails = cardId => {
  return async dispatch => {
    dispatch(detailsRequest());
    const res = await fetch(`https://api.scryfall.com/cards/${cardId}`);
    const data = await res.json();
    return dispatch(detailsSuccess(data || {}))
  }
}
