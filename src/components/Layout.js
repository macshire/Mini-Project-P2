import { Outlet, Link } from "react-router-dom";
import "./Home.css";
import "./About.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { SEARCH_BOOK } from "../constants/actionTypes";
import store from "../store";
import Home from "./Home.js";
import booksData from "../data/booksData";
import React, { useEffect, useState, createContext, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// const InputCustom = React.memo((props) => {
//   console.log('render');
//   return (
//     <input onChange={props.onChange} value={props.value} type="text" id='searchBar' placeholder="Find a book for yourself!" />
//   )
// });

const Layout = ({ stories }) => {
  /*
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load search term from local storage on mount
  React.useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  const handleChange = (event) => {
    const title = event.target.value;
    console.log(title);
    setSearchTerm(title);
    
    // Store the search term in local storage
    localStorage.setItem('books', JSON.stringify(booksData))
    //store filteredSearch in localStorage
    const filteredSearch = JSON.parse(localStorage.getItem('books')) || [];
    //ensure archivedBooks is always an array even when returns empty/null
    if (!Array.isArray(filteredSearch)) {
      filteredSearch = [];
    }    

      filteredSearch = filteredSearch.filter(book =>
      searchTerm.toLowerCase().includes(book.title.toLowerCase()));
      setBooks(filteredSearch);
      console.log(filteredSearch);
      //find a way to pass filteredSearch to Books
  };

  // React.useEffect (() => {
  //   store.dispatch({ type: SEARCH_BOOK, title: input });
  // },[input]);
*/

const [show, setShow] = useState(false);
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const location = useLocation();
const [user, setUser] = useState(location.state?.user || null);
//CHANGE NULL TO A BLANK STRING FOR TESTING, REMEMBER TO CHANGE BACK
const [userLoggedIn, setUserLoggedIn] = useState();
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userId, setUserId] = useState(null);
const [passwordVisible, setPasswordVisibility] = useState(false)
const [registerPressed, setRegisterPressed] = useState(false)

const handleClose = () => setShow(false); 
const handleShow = () => setShow(true);


const fetchUsers = () => {
  axios.get('http://localhost:7000/users')
    .then(response => {
      setUser(response.data); // Update state with the user data
    })
    .catch(error => {
      //console.error('There was an error fetching the users!', error);
    });
};

//call at beginning of function so that it immediately checks for users instead of only checking after the account is made
//fetchUsers();

const handleUsernameChange = (event) => {
  setUsername(event.target.value);
};

const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};

const handleCreateAccount = () => {
  //criteria, 1 uppercase, 1 number, 1 symbol, >= 10 characters
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
  if (!passwordRegex.test(password)) {
    alert('Invalid password: 1 uppercase, 1 number, 1 symbol, and minimum 10 characters required.');
    return;
  } 
  const existingUser = user.find(user => user.username === username);
  console.log(existingUser);
  console.log(user, username);
  if (existingUser) {
    alert('Username already exists, please choose another one.');
    return;
  }
  
  //close the modal if password is valid
  alert('Account created successfully!');
  setShow(false);
  //add logic to send post to db in order to create a new user
  //creating a new user in DB
  axios.post('http://localhost:7000/register', {
    username: username,
    password: password,
    created_at: 'now'
  }).then(response => {
    console.log("MADE ACC YAY", response.data);
    fetchUsers();
   }).catch(error => {
    console.log("didnt make acc booo", error);
  })
};

const handleLoginAccount = () => {
  // call sqlDB and check for login detail
  //checking if both username and password exist in DB
  const existingUser = user.find(user => user.username === username && user.password === password);
  console.log(username, password)
  if (existingUser) {
    alert('Login successful!');
    setShow(false);
    //setting logged in user
    setUserLoggedIn(existingUser);
    setUser(existingUser);
    setIsLoggedIn(true);
    setUserId(existingUser.id);
    // setUserId(existingUser.id);
    console.log(existingUser);
    // be able to store data that there is a logged in user so when refresh, still stays
  } else {
    alert('Invalid username or password.');
  }
};

const handlePasswordVisibility = () => {
  var pw = document.getElementById("pwInput");
  if (pw.type === "password"){
    pw.type = "text";
    setPasswordVisibility(true)
  }
  else{
    pw.type = "password";
    setPasswordVisibility(false)
  }
};

const userInfo = {
  isLoggedIn,
  userId,
};

const handleRegisterClicked = () => {
  setRegisterPressed(true);
}

const handleLogInClicked = () => {
  setRegisterPressed(false);
}

// const location = useLocation();
//   //access user data passed via state
//   const { user } = location.state || {};

//firebase config
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

    return(
      <>
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      {/* link makes pop up work but changes some layout, uncomment with caution */}
      {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" 
      integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"></link> */}
      {/* pop up when registering/loging in */}
      <Modal show={show} onHide={handleClose} className="modalContainer">
        <div className="modalContent">
        {registerPressed? (
              <>
                <div className="modalHeader">
                  Register
                  <button onClick={handleClose} id="xButton">
                    &times;
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modalHeader">
                  Login
                  <button onClick={handleClose} id="xButton">
                    &times;
                  </button>
                </div>
              </>
            )}
          <div className="modalBody">
            <label className="modalText">Username:</label>
            <input className="modalInput" value={username} onChange={handleUsernameChange} placeholder="Name that will be seen by others." />
          </div>
          <div className="modalBody">
            <label className="modalText">Password:</label>
            <input className="modalInput" type="password" id="pwInput" value={password} onChange={handlePasswordChange} placeholder="1 Caps, 1 Number, 1 Symbol, minimum 10 characters." />
            {passwordVisible ? (
              <>
                <img id="eyeVisible" onClick={handlePasswordVisibility} src="https://github.com/macshire/Mini-Project-P2/blob/main/eye-visible.png?raw=true" alt="Show" />
                {/* <button className="showPWButton" onClick={handlePasswordVisibility}>Hide Password</button> */}
              </>
            ) : (
              <>
                <img id="eyeInvisible" onClick={handlePasswordVisibility} src="https://github.com/macshire/Mini-Project-P2/blob/main/eye-invisible.png?raw=true" alt="Hide" />
                {/* <button className="showPWButton" onClick={handlePasswordVisibility}>Show Password</button> */}
              </>
            )}
          </div>
          <div className="modalFooter">
            <button className="button" onClick={handleClose}>Close</button>
            {registerPressed? (
              <>
                <button className="button" onClick={handleCreateAccount}>Create Account</button>
              </>
            ) : (
              <>
                <button className="button" onClick={handleLoginAccount}>Log In</button>
              </>
            )}
          </div>
        </div>
      </Modal>
        <nav>
            <li className='navHeight'>
              <div className='nav-flex-container'>
                <Link to="/">Home</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/bookmark">BookMark</Link>
                <div className="navButtonContainer">
                {/* conditional rendering based on if logged in or not, and whose account is logged in ((condition) true : false)*/}
                {isLoggedIn? (
                  <>
                  <span className="profileName">{user.username}</span>
                    <Link to="/profile" state={{user: user}}id="linkPFP">
                      <img className="pfpPlaceHolder" 
                      src={user.profilePic !== null? user.profilePic : "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg"}
                      ></img>
                    </Link>
                  </>
                ) : 
                (
                <>
                  <button className="navButtons" onClick={() => { handleShow(); fetchUsers(); handleRegisterClicked();}}>Register</button>
                  <button className="navButtons" onClick={() => { handleShow(); fetchUsers(); handleLogInClicked();}}>Log In</button>
                </>
                )}
                </div>
              </div>
            </li>
        </nav>
        <Outlet context={{userInfo, isLoggedIn, setIsLoggedIn, userId, setUser}} />
        </>
    )
  };

  export default React.memo(Layout);