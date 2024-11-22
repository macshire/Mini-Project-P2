import React from 'react';
import '../App.css';
import Story from '.';
import { useOutletContext } from 'react-router-dom';


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