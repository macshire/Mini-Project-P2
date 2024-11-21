import { Button } from '@mui/material';
import '../Home.css';
import { Outlet, Link, useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';
import BookMark from '../BookMark';
import axios from 'axios';
import React, { useEffect, useState, createContext, useContext } from 'react';

const Story = ({ story, onArchive, onReview, onRemoveArchive}) => {
  const [bookDesc, setBookDesc] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const navigate = useNavigate();
  var selectedBook = null;

    const {
      title,
      url,
      author,
      num_comments,
      points,
      image,
      objectID,
      genre,
      ranking
    } = story;

    const handleClick = (id) => {
      setIsClicked(true);
      setClickedId(id);
      console.log("clickedId after click:", id);
      
      // Trigger the axios call here directly if immediate fetch is needed
      axios.get('http://localhost:7000/books')
        .then(response => {
          const storedBooks = Array.isArray(response.data) ? response.data : [];
          if (storedBooks.length === 0) {
            console.warn("No books found in response data.");
            return;
          }
          selectedBook = storedBooks.find(selectedBook => String(selectedBook.objectID) === String(id));
          if (selectedBook) {
            setBookDesc(selectedBook);
            console.log("BOOK IN INDEX.JS SET TO: ", selectedBook);
          } else {
            console.error('Book not found');
          }
        })
        .catch(error => {
          console.error('There was an error fetching the books!', error);
        });
    
      navigate(`/descriptions/${id}`);
    };
    
    
    // useEffect(() => {
    //   if (!clickedId) return; // Early return if clickedId is invalid
    
    //   console.log("clickedId:", clickedId);
    
    //   axios.get('http://localhost:7000/books')
    //     .then(response => {
    //       const storedBooks = Array.isArray(response.data) ? response.data : [];
    
    //       if (storedBooks.length === 0) {
    //         console.warn("No books found in response data.");
    //         return;
    //       }
    //       else {
    //         console.warn("books found in response data.")
    //       }
          
          
    //       const selectedBook = storedBooks.find(selectedBook => String(selectedBook.objectID) === String(clickedId));
    
    //       if (selectedBook) {
    //         setBookDesc(selectedBook);
    //         console.log("BOOK SET TO:", selectedBook);
    //       } else {
    //         console.error('Book not found');
    //       }
    //     })
    //     .catch(error => {
    //       console.error('There was an error fetching the books!', error);
    //     });
    // }, [clickedId]);
    

    
    // const handleArchive = (id) => {
    //   //store archived selectedBook in localStorage
    //   let archivedBooks = JSON.parse(localStorage.getItem('archivedBooks')) || [];
    //   //ensure archivedBooks is always an array even when returns empty/null
    //   if (!Array.isArray(archivedBooks)) {
    //     archivedBooks = [];
    //   }    
    //   const isBookMarked = archivedBooks.some(selectedBook => selectedBook.objectID === objectID)
    //   if (!isBookMarked) {
    //     archivedBooks.push(story);
    //     localStorage.setItem('archivedBooks', JSON.stringify(archivedBooks));
    //     alert(story.title + " has been added to bookmarks")
    //     console.log(archivedBooks)
    //     //if (onArchive) onArchive(id);
    //   }
    //   else {
    //     //do not use removeItem as it removes all items from the list
    //     //use filter just to keep books with different objectIDs from the unbookmarked selectedBook
    //     archivedBooks = archivedBooks.filter(selectedBook => selectedBook.objectID !== story.objectID);
    //     localStorage.setItem('archivedBooks', JSON.stringify(archivedBooks));
    //     alert(story.title + " has been removed from bookmarks")
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

          const isBookMarked = archivedBooks.some(selectedBook => selectedBook.objectID === id)

          if (!isBookMarked) {
            //if not archived, post and add selectedBook to archived books
            axios.post(`http://localhost:7000/books/archive/${id}`, {
              objectID: story.objectID, 
              title: story.title, 
              image: story.image,
              url: story.url,
              author: story.author,
              genre: story.genre,
              num_comments: story.num_comments,
              points: story.points,
              ranking: story.ranking
            })
            .then(() => {
              alert(story.title + " has been added to bookmarks");
              console.log(story.title + " archived");
              setUpdateTrigger(prev => !prev)
            })
            .catch(error => {
              console.error('Error archiving the selectedBook:', error);
            });
          }
          else {
            //if already bookmarked, delete and remove selectedBook from archived books
            axios.delete(`http://localhost:7000/books/archive/${id}`)
            .then(() => {
              alert(story.title + " has been removed from bookmarks");
              console.log(story.title + " unarchived");
              setUpdateTrigger(prev => !prev); 
            })
            .catch(error => {
              console.error('Error unarchiving the selectedBook:', error);
            })
          }
        })
    };
  
    /* layout of the UI when displaying the state from the store */
    return (
      <div className='homePageContainer' >
        <div className="story" onClick={() => handleClick(objectID)}>
            <img src={image} className='bookImage'></img>
            <br></br>
            <div className='homePageTitles'>
                <span>
                <a>{title}</a>
                </span>
                <br></br>
            </div>
        <div className='homePageText'>
            <span>{author}</span>
            <br></br>
            <span>{num_comments} comments</span>
            <br></br>
            <a href={url}>Website</a>
            <ButtonInline onClick={() => handleArchive(objectID)}>
            ❤️
            </ButtonInline>
        </div>
      </div>
      <Outlet context={{bookDesc, setBookDesc, selectedBook}}/>
      {/* <Outlet context={selectedBook}/> */}
      </div>  
    );
  }

  /*Button as reusable component*/
  const ButtonInline = ({
    onClick,
    type = 'button',
    children
  }) =>
    <button id='bookMark'
      type={type}
      className="button-inline"
      onClick={onClick}
    >
      {children}
    </button>

  export default Story;
