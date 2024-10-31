import ReactDOM from "react-dom/client"
import React, { useEffect, useState, createContext, useContext } from 'react';
import "./Home.css";
import "./Layout";
import Friends from "./Socials/Friends";
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
import Modal from 'react-bootstrap/Modal';


const Social = () => {

  const [friends, setFriends] = useState([]);
  const [age, setAge] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleClose = () => {
    setShow(false); 
  }

  const handleShow = () => {
    setShow(true);
  }

  //DB, getting books from DB
  useEffect(() => {
    axios.get('http://localhost:7000/users')
      .then(response => {
        setFriends(response.data); // Update state with the user data
        console.log("setBooks = " + response.data);
      })
      .catch(error => {
        //console.error('There was an error fetching the users!', error);
      });
  }, [])

  //DB, filtering books based on DB
  useEffect(() => {
    axios.get('http://localhost:7000/users')
      .then(response => {
        let filterFriends = response.data;

        // //filter by genre when one of the options is clicked that is not '' and 'All'
        // if (age !== '' && age !== 'All') {
        //   filterFriends = filterFriends.filter(friend => friend.genre === age);
        // }

        //filter by both title and author through search bar 
        if (searchTerm) {
          //reset show state
          setShow(false); 
          //set filterFriends to either title or author
          filterFriends = filterFriends.filter(friend => 
            friend.username.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        //set the filtered list of books
        setFriends(filterFriends);

        //show message if no friend/author found
        if (filterFriends.length === 0) {
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
    axios.get('http://localhost:7000/users')
      .then(response => {
        //update state with the user data
        let friends = response.data; 

        if (genre === 'All'){
          setFriends(friends);
        }
        else {
          const filterFriends = friends.filter(friend => friend.genre === genre);
          setFriends(filterFriends);
        }
      })
      .catch(error => {
        //console.error('There was an error fetching the users!', error);
      });
  }
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <head>
        <link rel="stylesheet" type="text/css" href="App.css"/>
        <script defer src='activePage.js'></script>
      </head> 
      <Modal show={show} onHide={handleClose} className="modalContainer">
        <div className="modalContent">
            <div className="modalHeader">
              Register
              <button onClick={handleClose} id="xButton">
                &times;
              </button>
            </div>
          <div className="modalBody">
            <label className="modalText">Username:</label>
            <input className="modalInput" value={username} onChange={handleUsernameChange} placeholder="Name that will be seen by others." />
          </div>
          <div className="modalFooter">
            <button className="button" onClick={handleClose}>Close</button>
          </div>
        </div>
      </Modal>
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
            <InputLabel id="dropDownLabel">Filter</InputLabel>
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
      <div className="homepageBody">
        <span className="header2Text">
          List
        </span>
        <Friends friends={friends} onArchive={id => store.dispatch({type: STORY_ARCHIVE, id})} onReview ={id => store.dispatch({type: REVIEW_BOOK, id}) }/>
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

// //Static Site Generation (SSG)
// export async function getStaticProps() {
//   //call an external API endpoint to get posts
//   const res = await axios.get('http://localhost:7000/users')
//   const filterFriends = res.data;
 
//   //return filterFriends as prop to component
//   return {
//     props: {
//       filterFriends,
//     },
//   }
// }

//export default Home;