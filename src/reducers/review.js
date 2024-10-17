import { REVIEW_BOOK } from "../constants/actionTypes";
const INITIAL_STATE = [];

const applyReviewStory = (state, action) =>
  [ ...state, action.id ];

/* keeps list of references to searched stories */
function searchReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REVIEW_BOOK : {
      return applyReviewStory(state, action);
    }
    default : return state;
  }
}

export default searchReducer;