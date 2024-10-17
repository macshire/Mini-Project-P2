import { FILTER_GENRE} from '../constants/actionTypes';
const INITIAL_STATE = [];

const applyFilterStory = (state, action) =>
  [ ...state, action.id ];

/* keeps list of references to filtered stories */
function filterReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FILTER_GENRE : {
      return applyFilterStory(state, action);
    }
    default : return state;
  }
}

export default filterReducer;