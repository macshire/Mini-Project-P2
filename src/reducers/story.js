import { FILTER_GENRE, STORY_ARCHIVE, SEARCH_BOOK, REVIEW_BOOK } from '../constants/actionTypes';

// const fs = require('fs')

const INITIAL_STATE = [];

// const initBooks = () => {
//   let raw = fs.readFileSync('../data/books.json');
// let itemList = JSON.parse(raw);

// }

const applyArchiveStory = (state, action) => { 
  console.log(action)
  //use this code for when implementing with actual API, filter code is right
  // newDataFilter = api.fetch("xxxx?q=${book.objectID}")
  // return newDateFilter;
  return state.filter((book) => {return action.id != book.objectID})
}

const applyFilterStory = (state, action) => { 
  console.log(action)
  return state.filter((book) => {return action.genre == book.genre})
}

const applySearchStory = (state, action) => { 
  console.log(action)
  /* toLowerCase() make it possible for lower case search */
  /* includes() make it possible for search with fewer words */
  return state.filter((book) => {return book.title.toLowerCase().includes(action.title.toLowerCase())})
}

const applyReviewStory = (state, action) => {
  console.log(action)
  return state.filter((book) => {return action.id === book.objectID})
}
  
function storyReducer(state = INITIAL_STATE, action) {
    switch(action.type) {

      case STORY_ARCHIVE: {
        return applyArchiveStory(state, action);
      }
      case FILTER_GENRE: {
        return applyFilterStory(state, action);
      }
      case SEARCH_BOOK: {
        return applySearchStory(state, action);
      }
      case REVIEW_BOOK: {
        return applyReviewStory(state, action);
      }
      default : return state;
    }
  }
  
  export default storyReducer;