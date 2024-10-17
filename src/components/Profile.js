import ReactDOM from "react-dom/client"
import React, { useEffect, useState, createContext, useContext } from 'react';
import "./Home.css";
import "./Profile.css"
// import { useOutletContext } from 'react-router-dom';
import "./Layout";
import Book from './Books/Book'; 
import { connect } from 'react-redux';
import store from "../store";
import { REVIEW_BOOK, STORY_ARCHIVE } from '../constants/actionTypes';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import booksData from "../data/booksData";
import axios from "axios";
import Layout from "./Layout";
import { useLocation } from "react-router-dom";
import ProfileReview from "./Profiles/ProfileReviews";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Profile = ({ stories }) => {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [age, setAge] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);
  //const [users, setUsers] = useState([]);
  // const { user } = useOutletContext();
  // useEffect(() => {
  //   //store the booksData in localStorage
  //   if (!localStorage.getItem('books')) {
  //     localStorage.setItem('books', JSON.stringify(booksData));
  // }

  // //retrieve books from localStorage and set state
  // const localBooks = JSON.parse(localStorage.getItem('books'));
  // setBooks(localBooks || []);
  // //empty array dependency so it only runs once
  // }, []);

  
  // useEffect(() => {
    // let filteredBooks = JSON.parse(localStorage.getItem('books'));
    
    // //filter by genre if a specific genre is selected
    // if (age !== '' && age !== 'All') {
      //   filteredBooks = filteredBooks.filter(book => book.genre === age);
      // }
      
      // //filter by search term
      // //checks for both book title and author input
      // if (searchTerm) {
        //   setShow(false);
        //   filteredBooks = filteredBooks.filter(book => 
          //     book.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     || book.author.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // }

    //set filtered list
  //   setBooks(filteredBooks);
  //   if (filteredBooks.length == 0) {
    //     console.log("filtered books nothing " );
    //     setShow(true);
    //   }
    //   else {
      //     setShow(false);
      //   }
      // }, [age, searchTerm]);
      
      // const handleChange = (event) => {
        //   const genre = event.target.value;
        //   console.log("EVENT TARGET VALUE = " + event.target.value);
        //   setAge(genre);
        
        //   //filter by genre and update state
        //   //if filter "All" display all books in local storage
        //   if (genre === 'All'){
          //     console.log("IT IS ALL BOOKS");
          //     const allBooks = JSON.parse(localStorage.getItem('books'));
          //     setBooks(allBooks);
          //   }
  //   //else display normal filtered books based on genre
  //   else {
    //     const filteredBooks = JSON.parse(localStorage.getItem('books')).filter(book => book.genre === genre);
    //     setBooks(filteredBooks);
    //   }
  // };
  const [pfpLink, setpfpLink] = useState('')
  const [refresh, setRefresh]= useState(null)
  const location = useLocation();
  const { setUser } = useOutletContext();
  const [user, setLocalUser] = useState(location.state?.user || null);
  const {isLoggedIn, setIsLoggedIn} = useOutletContext(); // Get the context from Outlet
  const [isPFPChanged, setIsPFPChanged] = useState(false);
  const navigate = useNavigate();  // This will help in redirecting
  const updateFromDelete = (data) => {
    axios.get('http://localhost:7000/books')
      .then(response => {
        setRefresh(data)
        setBooks(response.data);
  })
  }
  useEffect((data) => {
    axios.get('http://localhost:7000/books')
      .then(response => {

        // Set the sorted books to state
        setBooks(response.data);
        setRefresh(data)
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
      axios.get('http://localhost:7000/reviews')
      .then(response => {

        const reviews = response.data;

        const filteredReviews = reviews.filter(review => review.id === user.id);
        // Set the sorted books to state
        setReviews(filteredReviews);
  
      })
      .catch(error => {
        console.error('There was an error fetching the reviews!', error);
      });
  }, [refresh]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  //find a way to bring logged in user data into profile.js

  //access user data passed via state
  //const { user } = location.state || {};
  //console.log(user.profilePic);

  const handleLogOut = () => {
    alert('You have been logged out');
    setUser(null);
    setIsLoggedIn(false);
    console.log("user is " + user);
    navigate("/");
  }

  const handlePFPChange= (event) => {
    setpfpLink(event.target.value);
  }

  const fetchUsers = () => {
    axios.get('http://localhost:7000/users')
      .then(response => {
        setUser(response.data); // Update state with the user data
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  };

  const handlePFP = (id) => {
    console.log("User ID:", id); 
    //handle putting link and updating table for specific user
    axios.put(`http://localhost:7000/users/${id}/profilePic`, {
      profilePic: pfpLink
    })
    .then(response => {
      console.log(response.data.message);
      setUser(prevUser => ({
        ...prevUser,
        profilePic: pfpLink // Update only the profile picture
      }));
      setIsPFPChanged(true);
    })
    .catch(error => {
      console.error("Error updating profile picture")
    })
    alert('Changing PFP')
    //close modal
    setShow(false);
  }

  // useEffect(() => {
  //   if (isPFPChanged) {
  //     fetchUsers();
  //     setIsPFPChanged(false)
  //   }
  // }, [isPFPChanged]);

  return (
    <>
    {/* link makes pop up work but changes some layout, uncomment with caution */}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" 
      integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"></link>
      {/* pop up when registering/loging in */}
        <Modal show={show} onHide={handleClose} className="modalContainer">
          <Modal.Header closeButton>
            <Modal.Title>Change Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>Link:</Modal.Body>
          <input value={pfpLink} onChange={handlePFPChange} placeholder="Link..."></input>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handlePFP(user.id)}>
              Change
            </Button>
          </Modal.Footer>
        </Modal>
      <head>
        <link rel="stylesheet" type="text/css" href="App.css"/>
        <script defer src='activePage.js'></script>
      </head> 
      <div id="home">
      <div>
        {isLoggedIn ? (
            <>
            <div id="titleBackground">
              <div className="imageContainer">
                <img
                  className="profileImage"
                  // display profile pic if present, if not display guest profile pic
                  src={user.profilePic !== null? user.profilePic : "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg"}
                  //src="https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg"
                />
              </div>
              <div id="titleNameProfile">
                <p>{user.username}</p>
              </div>
              <div id="titleWordsProfile">
                <p>View your preferences and reviews here</p>
                
              </div>
            </div>
            <div className="headerBorder">
              <span className="headerTextProfile">Your Reviews</span>
              <span>
              <button onClick={() => { handleShow(); }} id="logOutButton">PFP</button>
              <button onClick={handleLogOut} id="logOutButton">Log Out</button>
              </span>
            </div>
            <div>
              <ProfileReview
              profileReviews = {reviews}
              refresh={updateFromDelete}
              books = {books} />
            </div>
            </>
        ) : (
          <>
            <br></br>
            <h1>No user data found. Please log in.</h1>
          </>
        )}
        </div>
        
      </div>
      <Outlet context={isLoggedIn} />
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
)(Profile);

//export default Home;