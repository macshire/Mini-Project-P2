import { combineReducers } from 'redux';
import storyReducer from './story';
import archiveReducer from './archive';
import filterReducer from './filter';
import reviewReducer from './review';

const rootReducer = combineReducers({
  storyState: storyReducer,
  archiveState: archiveReducer,
  filterState: filterReducer,
  reviewState: reviewReducer,
});

export default rootReducer;