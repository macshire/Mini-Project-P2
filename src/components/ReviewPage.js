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
      {bookDetails && (
        <>
          <div className="book-info">
            <h1>{bookDetails.title}</h1>
            <h3>by {bookDetails.author}</h3>
            <img src={bookDetails.image} alt={bookDetails.title} className="book-image"/>
            <p>{bookDetails.description}</p>
          </div>

          <div className="review-section">
            <h2>User Reviews</h2>
            {reviews.length > 0 ? (
              <Review reviews={reviews} />
            ) : (
              <p>No reviews yet. Be the first to review this book!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewPage;
