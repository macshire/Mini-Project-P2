import React from 'react';
import '../App.css';
import Friend from '.';


const Friends = ({ friends, onArchive, onReview, onRemoveArchive}) =>
     <div className="stories" >
    {(friends || []).map(friend =>
        <Friend 
        key={friend.objectID}
        friend={friend} 
        onArchive={onArchive}
        onRemoveArchive={onRemoveArchive}
        onReview={onReview}/>
    )}
  </div>

export default Friends;