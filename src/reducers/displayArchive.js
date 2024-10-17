import { DISPLAY_ARCHIVE } from '../constants/actionTypes';
const INITIAL_STATE = [];

const displayArchiveStory = (state, action) =>
  [ ...state, action.id ];

/* keeps list of references to archived stories */
function displayArchiveReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case DISPLAY_ARCHIVE : {
      return displayArchiveStory(state, action);
    }
    default : return state;
  }
}

export default displayArchiveReducer;