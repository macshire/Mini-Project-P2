import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Description.css";
import "./Home.css";
import Review from "./Reviews/Review";
import Description from "./Description/Description";

const ReviewPage = () => {
  const { id } = useParams(); // Get book ID from URL
  const [bookDetails, setBookDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch book details
    axios.get(`http://localhost:7000/books/${id}`)
      .then(response => {
        setBookDetails(response.data);
      })
      .catch(error => {
        console.error("Error fetching book details:", error);
      });

    // Fetch reviews for the book
    axios.get(`http://localhost:7000/reviews?bookID=${id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
      });
  }, [id]);

  return (
    <div className="review-page">
      <>
     <head>
       <link rel="stylesheet" type="text/css" href="App.css"/>
       <script defer src='activePage.js'></script>
     </head>
     <div id="about">
        <div id="titleBackground">
            <div id="titleName">
                <p>Description</p>
            </div>
       </div>
       <div className='descBG'>
        <div className="tester">
        {reviews.map((review, index) => (
            <Review key={index} review={review} />
        ))}
            {/* <Description reviews={reviewedBooks ? [reviewedBooks] : []} onReview ={id => store.dispatch({type: REVIEW_BOOK, id}) }/> */}
        </div>
       </div>
        {/* <span className="backgroundE">
         <Review reviews={reviewedBooks ? [reviewedBooks] : []} onReview ={id => store.dispatch({type: REVIEW_BOOK, id}) }/>
         </span> */}
     </div>
     </>
    </div>
  );
};

export default ReviewPage;
