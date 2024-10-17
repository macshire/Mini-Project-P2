import React from 'react';
import '../App.css';
import Review from '.'

const Review1 = ({ reviews }) =>
    <div className="app">
       <div className="reviews" >
      {(reviews || []).map(x =>
          <Review 
  
          review={x}
          />
      )}
    </div>
    </div>
  
  export default Review1;