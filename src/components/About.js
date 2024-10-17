import "./About.css";


import React, { useEffect, useState, createContext, useContext } from 'react';


import "./About.css";
import "./Layout";
import Review from "./Reviews/Review";
import Rate from "./Reviews/StarRating";
import Book from './Books/Book'; 
import { REVIEW_BOOK, STORY_ARCHIVE } from '../constants/actionTypes';
import store from "../store";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from "axios";
// import { withRouter } from "react-router-dom";

const About = (props) => {
  const { reviews } = props;

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


 return (
   <>
     <head>
       <link rel="stylesheet" type="text/css" href="App.css"/>
       <script defer src='activePage.js'></script>
     </head>

     <div id="about">
     <div id="titleBackground">
     <div id="titleName">
           <p>「✦ Book reviews ✦」</p>
       </div>

       </div>
       <div className="headerBorder">
        <p className="ABheaderText">Review</p>
        </div>
        <div className="tester">
        <Review reviews={reviewedBooks ? [reviewedBooks] : []} onReview ={id => store.dispatch({type: REVIEW_BOOK, id}) }/>
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
)(About);
