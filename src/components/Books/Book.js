import React from 'react';
import '../App.css';
import Story from '.';


const Book = ({ stories, onArchive, onReview, onRemoveArchive}) =>
     <div className="stories" >
    {(stories || []).map(story =>
        <Story 
        key={story.objectID}
        story={story} 
        onArchive={onArchive}
        onRemoveArchive={onRemoveArchive}
        onReview={onReview}/>
    )}
  </div>

export default Book;