import { SEARCH_BOOK } from "../constants/actionTypes";
const INITIAL_STATE = [];

const applySearchStory = (state, action) =>
  [ ...state, action.id ];

/* keeps list of references to searched stories */
function searchReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SEARCH_BOOK : {
      return applySearchStory(state, action);
    }
    default : return state;
  }
}

export default searchReducer;