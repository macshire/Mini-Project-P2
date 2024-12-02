import '../Description.css';
import { Rate } from '.././Reviews/StarRating';
import { useOutletContext } from 'react-router-dom';

import booksData from '../../data/booksData';
import InputLabel from '@mui/material/InputLabel';
import About from '../About';
import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import '../Layout';
import StarRating from '.././Reviews/StarRating';
import { object } from 'prop-types';
const Description = ({ review, users}) => {
    const {
      title,
      url,
      author,
      num_comments,
      image,
      points,
      objectID,
    } = review || {};

    const [reviewText, setReviewText] = useState('');
    const { isLoggedIn, userId } = useOutletContext();
    console.log('User Logged In:', isLoggedIn);
    console.log('User ID:', userId);
    const handleTextChange = (event) => {
      setReviewText(event.target.value); // Update state with the textarea value
      setUserReviews(reviewText);
    };

    const processUserInfo = () => {
      if (isLoggedIn) {
        console.log(`User ID: ${userId}`);
      } else {
        console.log('User is not logged in.');
      }
    };
    const [userReviews, setUserReviews] = useState([]);

  
    //call at beginning of function so that it immediately checks for users instead of only checking after the account is made
  
    const [newRating, setNewRating] = useState(0);
    const [isReviewCreated, setIsReviewCreated] = useState(false);
    
    const handleRatingChange = (rating) => {
      setNewRating(rating); // Update the newRating state
    };

    const handleCreateReview = () => {
      console.log(userReviews);
      console.log("idk" + newRating);
      console.log(userId);
      console.log(objectID);
    
      if (!isLoggedIn) {
        alert("Please log in to add a review");
        return; // Exit the function early if not logged in
      }
    
      // Proceed to create a review if the user is logged in
      axios.post('http://localhost:7000/comment', {
        id: userId,
        review: userReviews,
        stars: newRating,
        bookID: objectID,
        created_at: new Date().toISOString() // Use current date and time
      })
      .then(response => {
        console.log("Added review", response.data);
        alert("Review successfully added");
        setIsReviewCreated(true);
        // fetchUserReviews();
      })
      .catch(error => {
        console.log("Didn't add review", error);
      });
    };
    
    // Function to fetch user reviews
    const fetchUserReviews = () => {
      axios.get('http://localhost:7000/reviews')
        .then(response => {
          setUserReviews(response.data); // Update state with the reviews
          console.log("get works");
        })
        .catch(error => {
          console.error('There was an error fetching the reviews!', error);
        });
    };
    
    // useEffect to fetch reviews when the component mounts
    useEffect(() => {
      fetchUserReviews();
      setIsReviewCreated(false);
      console.log("why");
    }, [isReviewCreated]); // Empty dependency array to run on mount

    const fetchBookDetails = async (volumeID) => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${volumeID}`,
          { params: { key: 'my key' } }
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
      }
    };
    
    return (
      <div className='review-container'>
      <div className="reviewBig">
        <div>
          <img src={image} className='reviewImage'></img>
        </div>
        <div className='reviewTitle'>
          <div className='reviewTitle'>
            <p id='p-title'>{title}</p>
            <p id='p-author'>{author}</p>
          </div>
          {/* replace textarea with description of the book */}
          <p id='p-desc'>Description goes here blah blah blah</p>
          {/* can convert rating into avrg star rating and put a button to go to about page for review*/}
          <div className = "rateStyle">
            <Rate 
            starR = {newRating}
            onRatingChange={handleRatingChange}
            >  
            </Rate>
          </div>
          <button id='readBookButton' onClick={fetchBookDetails}>
              Read
            </button>
          {/* convert to button to go to review page */}
          <button id="reviewButton">Review</button>
          <div>
            {/* insert section for comments on that specific book */}
          </div>
        </div>
      </div>

      </div>
      
    );

  };


  export default Description;

  