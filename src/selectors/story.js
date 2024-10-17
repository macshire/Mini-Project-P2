const isNotArchived = archivedIds => story =>
    archivedIds.indexOf(story.objectID) === -1;
  
const getReadableStories = ({ storyState, archiveState }) =>
    storyState.filter(isNotArchived(archiveState));

const isReviewed = reviewIds => story =>
  reviewIds.indexOf(story.objectID) === -1;

const getReviewedStories = ({ storyState, reviewState}) =>
  storyState.filter(isReviewed(reviewState));
  
  export {
    getReadableStories,
    getReviewedStories
  };