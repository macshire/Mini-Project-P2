import React, { useEffect, useState, createContext, useContext } from 'react';
import "./Description.css";
import "./Home.css";
import "./Layout";
import Review from "./Reviews/Review";
import Rate from "./Reviews/StarRating";
import Book from './Books/Book'; 
import { REVIEW_BOOK, STORY_ARCHIVE } from '../constants/actionTypes';
import store from "../store";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from "axios";
import Description from "./Description/Description";
// import { withRouter } from "react-router-dom";

const Descriptions = (props) => {
  const { reviews } = props;
  const [comments, setComments] = useState([]);

  // const [reviewItem, setReviewItem] = useState(null);

  const pa = useParams();


  const [reviewedBooks, setReviewedBooks] = useState([]);
  
  useEffect(() => {
    //get archived books from localStorage
    // const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    axios.get('http://localhost:7000/books')
    .then(response => {
      const storedBooks = response.data;
    
      const book = storedBooks.find(book => book.objectID == pa.id);

      // Set the sorted books to state
      setReviewedBooks(book);

    })
    .catch(error => {
      console.error('There was an error fetching the books!', error);
    });
  }, [pa.id, reviews.length]);
  
  //getting and setting reviews based on bookID of review and id of prop
  useEffect(() => {
    //axios get reviews, set review if bookID of review = id of book selected
    //reviews will show up  in the review section
    axios.get('http://localhost:7000/reviews')
      .then(response => {

        const comments = response.data;

        const filteredComments = comments.filter(review => review.bookID === props.id);
        // Set the sorted books to state
        setComments(filteredComments);
  
      })
      .catch(error => {
        console.error('There was an error fetching the reviews!', error);
      });
  })


 return (
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
        <div className="tester">
            <Description reviews={reviewedBooks ? [reviewedBooks] : []} onReview ={id => store.dispatch({type: REVIEW_BOOK, id}) }/>
        </div>
        <div className="headerTextDesc">
          Reviews
        </div>
        <div>
          {/* component for layout of comments */}
        </div>
        {/* <span className="backgroundE">
         <Review reviews={reviewedBooks ? [reviewedBooks] : []} onReview ={id => store.dispatch({type: REVIEW_BOOK, id}) }/>
         </span> */}
     </div>
     </>
 );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    reviews: state,
  };
}

export default connect(
  mapStateToProps,
)(Descriptions);
