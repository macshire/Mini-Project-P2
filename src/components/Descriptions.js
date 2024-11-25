import React, { useEffect, useState, createContext, useContext } from 'react';
import "./Description.css";
import "./Home.css";
import Review from "./Reviews/Review";
import Rate from "./Reviews/StarRating";
import Book from './Books/Book'; 
import { REVIEW_BOOK, STORY_ARCHIVE } from '../constants/actionTypes';
import store from "../store";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from "axios";
import Description from "./Description/Description";
import ProfileReview from "./Profiles/ProfileReviews";
import DescReviews from './Description/DescReview';
import { useOutletContext } from 'react-router-dom';
import Story from './Books';
// import { withRouter } from "react-router-dom";

const Descriptions = (props) => {
  const { reviews } = props;
  const [comments, setComments] = useState([]);
  const [books, setBooks] = useState([]);
  const [reviewUser, setReviewUser] = useState([]);
  const [refresh, setRefresh]= useState(null)
  const bookDesc = useOutletContext();
  var selectedBook = useOutletContext();
  const { id } = useParams();
  // const bookDesc = outletContext ? outletContext[0] : {}; 
  // const book = outletContext ? outletContext[0] : {}; 
  const updateFromDelete = (data) => {
    axios.get('http://localhost:7000/books')
      .then(response => {
        setRefresh(data)
        setBooks(response.data);
  })
  }

  const mockReviews = [{ review: "no reviews yet", stars: "0" }]

  // const [reviewItem, setReviewItem] = useState(null);

  const pa = useParams();

  const [reviewedBooks, setReviewedBooks] = useState([]);
  
  useEffect(() => {
    // console.log("bookDesc in desc.js is = " + bookDesc);
    // if (!bookDesc || !bookDesc.objectID) {
    //   console.warn("bookDesc or bookDesc.objectID is not available");
    //   //return; // Prevent further execution
    // }
    // if (selectedBook) {
    //   console.log("selectedBook = ", selectedBook);
    // }
  
    axios.get('http://localhost:7000/books')
      .then(response => {
        console.log("params id = ", id)
        const storedBooks = Array.isArray(response.data) ? response.data : [];
        console.log("storedBooks array = ", storedBooks)
        console.log("Type of id:", typeof id, "Value of id:", id);
        const book = storedBooks.find(book => book.objectID === parseInt(id, 10));
  
        if (book) {
          setReviewedBooks([book]);
          console.log("REVIEWEDBOOK IN DESC.JS SET TO:", book);
        } else {
          console.error("Book not found for the given objectID");
        }
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, [id, reviews.length]); // Including bookDesc as a dependency
  
  
  //getting and setting reviews based on bookID of review and id of prop
  useEffect(() => {
    axios.get('http://localhost:7000/reviews')
      .then(response => {
        const storedComments = response.data;
        console.log("storedComments = ", storedComments)
        const comment = storedComments.filter(comment => comment.bookID === parseInt(id, 10));
        console.log("filteredComments = ", comment);
        if (comment) {
          setComments(comment);
          console.log("setComments = ", comment)
          //fetching and setting reviewUser for the specific review
          axios.get('http://localhost:7000/users')
          .then(response => {
            const storedUsers = response.data;
            const revUser = storedUsers.filter(revUser => revUser.id === comment.id)
            if (revUser) {
              setReviewUser(revUser);
              console.log("setReviewUser", revUser)
            }
          })
        }
        else {
          console.warn("no reviews match the book id")
        }
      })
      .catch(error => {
        console.error('There was an error fetching the reviews!', error);
      });
  }, [id]);
  


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
       <div className='descBG'>
        <div className="tester">
          <Description reviews={Array.isArray(reviewedBooks) ? reviewedBooks : []} />
            {/* <Description reviews={reviewedBooks ? [reviewedBooks] : []} onReview ={id => store.dispatch({type: REVIEW_BOOK, id}) }/> */}
        </div>
        <div className="headerTextDesc">
          Reviews
        </div>
        <div>
          {/* component for layout of comments */}
          <div className='descReview-container'>
            <div>
              <ProfileReview
              profileReviews={Array.isArray(comments) ? comments : []}
              refresh={updateFromDelete}
              books={books} />
            </div>
          </div>
        </div>
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
