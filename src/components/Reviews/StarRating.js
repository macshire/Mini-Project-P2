import React, { useEffect, useState } from 'react';
import Star from './Star';
import PropTypes from 'prop-types';

const StarRating = ({ initialRatingR, maxRatingR, onRate }) => {
  const [rating, setRating] = useState(initialRatingR);

  useEffect(() => {
    setRating(initialRatingR);
  }, [initialRatingR]);

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onRate) onRate(newRating);
  };
  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: maxRatingR }, (_, index) => (
        <Star 
          key={index}
          filled={index < rating}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  initialRatingR: PropTypes.number,
  maxRatingR: PropTypes.number,
  onRate: PropTypes.func,
};

StarRating.defaultProps = {
  initialRatingR: 0,
  maxRatingR: 5,
};

const StarDisplay = ({ initialRating, maxRating }) => {
  const [rating] = useState(initialRating);


  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: maxRating }, (_, index) => (
        <Star 
          key={index}
          filled={index < rating}
        />
      ))}
    </div>
  );
};

StarDisplay.propTypes = {
  initialRating: PropTypes.number,
  maxRating: PropTypes.number,
};

StarDisplay.defaultProps = {
  initialRating: 0,
  maxRating: 5,
};

const Rate = ({starR, onRatingChange}) => {
  const [newRating, setNewRating] = useState(starR);
  // console.log("wwwww" + starR);

  // newRating = starR;
  useEffect(() => {
    setNewRating(starR);
  }, [starR]);

  // console.log(newRating);
  const handleRatingChange = (rating) => {
  // console.log('New rating:', newRating);
  setNewRating(rating);
  if (onRatingChange){
    onRatingChange(rating);
  }
  };
  
    return (
      <div>
        <StarRating 
          initialRatingR={newRating} 
          maxRating={5} 
          onRate={handleRatingChange} 
          
        />
      </div>
    );
  };
  
  const DisplayRate = ({star}) => {

    return (
      <div>
        <StarDisplay
          initialRating={star} 
          maxRating={5} 
        />
      </div>
    );
  }

 
// const BookList = () => {
//   const [books, setBooks] = useState(booksData);

//   const updatePoints = (objectID, newPoints) => {
//     setBooks((prevBooks) =>
//       prevBooks.map((book) =>
//         book.objectID === objectID ? { ...book, points: newPoints } : book
//       )
//     );
//   };

// };
  export {Rate, DisplayRate};
