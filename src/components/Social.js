import ReactDOM from "react-dom/client"
import React, { useEffect, useState, createContext, useContext } from 'react';
import "./Home.css";
import "./Layout";
import Book from './Books/Book'; 
import { connect } from 'react-redux';
import store from "../store";
import { type } from "@testing-library/user-event/dist/type";
import { REVIEW_BOOK, STORY_ARCHIVE } from '../constants/actionTypes';
import { getReadableStories } from '../selectors/story';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FILTER_GENRE } from "../constants/actionTypes";
import { Action } from "@remix-run/router";
import { SEARCH_BOOK } from "../constants/actionTypes";
import booksData from "../data/booksData";
import axios from "axios";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";


const Social = () => {

  const [books, setBooks] = useState([]);
  const [age, setAge] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);

  //DB, getting books from DB
  useEffect(() => {
    axios.get('http://localhost:7000/books')
      .then(response => {
        setBooks(response.data); // Update state with the user data
        console.log("setBooks = " + response.data);
      })
      .catch(error => {
        //console.error('There was an error fetching the users!', error);
      });
  }, [])

  //DB, filtering books based on DB
  useEffect(() => {
    axios.get('http://localhost:7000/books')
      .then(response => {
        let filteredBooks = response.data;

        //filter by genre when one of the options is clicked that is not '' and 'All'
        if (age !== '' && age !== 'All') {
          filteredBooks = filteredBooks.filter(book => book.genre === age);
        }

        //filter by both title and author through search bar 
        if (searchTerm) {
          //reset show state
          setShow(false); 
          //set filteredBooks to either title or author
          filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        //set the filtered list of books
        setBooks(filteredBooks);

        //show message if no book/author found
        if (filteredBooks.length === 0) {
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch(error => {
        console.error('There was an error filtering the books!', error);
      });
  }, [age, searchTerm]);

  //DB, handling change in genre
  const handleChange = (event) => {
    const genre = event.target.value;
    console.log("EVENT TARGET VALUE = " + event.target.value);
    setAge(genre);

    //fetch books
    axios.get('http://localhost:7000/books')
      .then(response => {
        //update state with the user data
        let books = response.data; 

        if (genre === 'All'){
          setBooks(books);
        }
        else {
          const filteredBooks = books.filter(book => book.genre === genre);
          setBooks(filteredBooks);
        }
      })
      .catch(error => {
        //console.error('There was an error fetching the users!', error);
      });
  }
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

    const booksPerPage = 4;
    const totalBooks = books.length;
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const moveSlides = (direction) => {
      console.log("ARROW CLICKED");
  
      //getting max page index, -1 because starts from 0
      const maxIndex = Math.ceil(totalBooks / booksPerPage) - 1;
      let newIndex = currentIndex + direction;
  
      //ensure the newIndex wraps around when going out of bounds
      if (newIndex < 0) {
        //wraps to last page if trying to go backward on first page
        newIndex = maxIndex;
      } else if (newIndex > maxIndex) {
        //wraps to first page if trying to go forward on last page
        newIndex = 0;
      }
      //update newIndex state
      setCurrentIndex(newIndex);
      //setting amount to slide the books (adjust the shiftAmount)
      const shiftAmount = newIndex * 2.78;
      const bookWrapper = document.querySelector('.books-wrapper');
      if (bookWrapper) {
        //updating transform of bookWrapper, controls the 'sliding' effect 
        bookWrapper.style.transform = `translateX(-${shiftAmount}%)`;
      }
  };



  return (
    <>
      <head>
        <link rel="stylesheet" type="text/css" href="App.css"/>
        <script defer src='activePage.js'></script>
      </head> 
      <div id="social">
        <div id="titleBackground">
          <div id="titleName">
            <p>Social</p>
          </div>
          <div id="titleWords">
            <p>Discuss with fellow book worms</p>
          </div>
        </div>
        <div className="headerBorder">
        <div className="dropDownContainer">
            <InputLabel id="dropDownLabel">Genre</InputLabel>
            <Select 
              labelId="dropDownLabel"
              id="dropDown"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={'All'}>All</MenuItem>
              <MenuItem value={'Adventure'}>Adventure</MenuItem>
              <MenuItem value={'Children'}>Children</MenuItem>
              <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
              <MenuItem value={'Romance'}>Romance</MenuItem>
              <MenuItem value={'Literature'}>Literature</MenuItem>
            </Select>
            </div>
        <span className="headerText">FRIENDS</span>
        <input
            type="text"
            id='searchBar'
            placeholder="Search for their name!"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          {/* conditionally renders the message */}
          {show && <div id="noSearch">No search results...</div>}
      </div>
        <span className="header2Text">
          List
        </span>
        <div>
            {/* put user layout thing here*/}
            <div className='socialPageContainer' >
                <div className="social-flex-container">

                <img className='socialImage'></img>
                <br></br>
                <div className='socialPageText'>
                    <span></span>
                    <br></br>
                    <span>Name</span>
                    <br></br>
                    <a>Reviews</a>
                </div>
                </div>
            </div> 
        </div>
      </div>
      </>
  );
}

const mapStateToProps = state => ({
  stories: state,
});

const mapDispatchToProps = dispatch => ({
  // onArchive: id => dispatch(doArchiveStory(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Social);

//Static Site Generation (SSG)
export async function getStaticProps() {
  //call an external API endpoint to get posts
  const res = await axios.get('http://localhost:7000/books')
  const filteredBooks = res.data;
  //eeeee
 
  //return filteredBooks as prop to component
  return {
    props: {
      filteredBooks,
    },
  }
}

//export default Home;