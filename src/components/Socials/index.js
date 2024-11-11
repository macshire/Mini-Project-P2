import { Button } from '@mui/material';
import '../Home.css';
import { Outlet, Link, useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';
import BookMark from '../BookMark';
import axios from 'axios';
import { useState } from 'react';
import { isSignInWithEmailLink } from 'firebase/auth';

const Friend = ({ friend, onArchive, onReview, onRemoveArchive}) => {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

    const {
      username,
      profilePic
    } = friend;

    const handleClick = (id) => {
      navigate(`/about/${id}`);
      // onReview(id);
    }

    // const handleArchive = (id) => {
    //   //store archived book in localStorage
    //   let archivedBooks = JSON.parse(localStorage.getItem('archivedBooks')) || [];
    //   //ensure archivedBooks is always an array even when returns empty/null
    //   if (!Array.isArray(archivedBooks)) {
    //     archivedBooks = [];
    //   }    
    //   const isBookMarked = archivedBooks.some(book => book.objectID === objectID)
    //   if (!isBookMarked) {
    //     archivedBooks.push(friend);
    //     localStorage.setItem('archivedBooks', JSON.stringify(archivedBooks));
    //     alert(friend.title + " has been added to bookmarks")
    //     console.log(archivedBooks)
    //     //if (onArchive) onArchive(id);
    //   }
    //   else {
    //     //do not use removeItem as it removes all items from the list
    //     //use filter just to keep books with different objectIDs from the unbookmarked book
    //     archivedBooks = archivedBooks.filter(book => book.objectID !== friend.objectID);
    //     localStorage.setItem('archivedBooks', JSON.stringify(archivedBooks));
    //     alert(friend.title + " has been removed from bookmarks")
    //     console.log(archivedBooks)
    //     //if (onRemoveArchive) onRemoveArchive(id);
    //   }
    // };

    const [updateTrigger, setUpdateTrigger] = useState(false);

    const handleArchive = (id) => {
      //fetch archived books
      axios.get('http://localhost:7000/books/archive')
        .then(response => {
          //set archived books as data received from GET
          let archivedBooks = response.data;

          const isBookMarked = archivedBooks.some(book => book.objectID === id)

          if (!isBookMarked) {
            //if not archived, post and add book to archived books
            axios.post(`http://localhost:7000/books/archive/${id}`, {
              objectID: friend.objectID, 
              title: friend.title, 
              image: friend.image,
              url: friend.url,
              author: friend.author,
              genre: friend.genre,
              num_comments: friend.num_comments,
              points: friend.points,
              ranking: friend.ranking
            })
            .then(() => {
              alert(friend.title + " has been added to bookmarks");
              console.log(friend.title + " archived");
              setUpdateTrigger(prev => !prev)
            })
            .catch(error => {
              console.error('Error archiving the book:', error);
            });
          }
          else {
            //if already bookmarked, delete and remove book from archived books
            axios.delete(`http://localhost:7000/books/archive/${id}`)
            .then(() => {
              alert(friend.title + " has been removed from bookmarks");
              console.log(friend.title + " unarchived");
              setUpdateTrigger(prev => !prev); 
            })
            .catch(error => {
              console.error('Error unarchiving the book:', error);
            })
          }
        })
    };

    const handleChat = () => {
      alert('PRESSED CHAT')
      setShow(true);
      console.log(show)
    }
  
    /* layout of the UI when displaying the state from the store */
    return (
        <div className='socialPageContainer' >
            <div className="social-flex-container">
            <img className='socialImage' src={profilePic !== null? profilePic : "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg"}></img>
            <br></br>
            <div className='socialPageText'>
                <span></span>
                <br></br>
                <span>{username}</span>
            </div>
            </div>
            <button id='chatButton' onClick={handleChat}>Chat</button>
            <Outlet context={{username, show, setShow}}/>
        </div> 
    );
  }

  /*Button as reusable component*/
  //can be used for ADD FRIEND BUTTON
  const ButtonInline = ({
    onClick,
    type = 'button',
    children
  }) =>
    <button id='chatButton'
      type={type}
      className="button-inline"
      onClick={onClick}
    >
      {children}
    </button>

  export function useShow() {
    return useOutletContext;
  }

  export default Friend;