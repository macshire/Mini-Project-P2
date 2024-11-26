import { Button } from '@mui/material';
import '../Leaderboard.css';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';
import { useState } from 'react';
import {DisplayRate} from '../Reviews/StarRating';
import axios from 'axios';
import '../Profile.css'
import Modal from 'react-bootstrap/Modal';
const DescReview = ({ descReviews, refresh, books, reviewUser}) => {

const navigate = useNavigate();
const [show, setShow] = useState(false);
const handleClose = () => setShow(false); 
const handleShow = () => setShow(true);
const {
    review,
    stars,
    reviewID,
    bookID,
    created_at,
    id
} = descReviews;

const {
    title,
    url,
    author,
    num_comments,
    points,
    objectID,
    ranking,
    image,
} = books.length ? books[bookID] : {}

//might not be getting user data
const {
    username,
    profilePic,
} = reviewUser;

const handleClick = (id) => {
  // navigate(`/about/${id}`);
  // onReview(id);
  console.log("profile hi " + {reviewID});
}
const [updateTrigger, setUpdateTrigger] = useState(false);

const handleDelete = (id) =>{
  console.log("delete" + id)
  const data ="review deleted"

  refresh(data)
  // axios.get('http://localhost:7000/reviews')

    axios.delete(`http://localhost:7000/remove/${id}`)
    .then(() => {
    })
    .catch(error => {
      console.error('Error deleting the book:', error);
    })

};
/* layout of the UI when displaying the state from the store */
    return (
      <>
      <div className='profreview-container' >
        <div className="story">
          <div className='homePageTitles1'>
            <div>{username}</div>
          </div>
            <div className='homePageTitles1' >
                <span>
                <a>{username}</a>
                <a>{review}</a>
                </span>
                <br></br>
            </div>
            <br></br>
        <div><p className="ReviewDisplay"> {created_at}</p></div>
        <img src={profilePic} className='bookImage1' ></img>
        <br></br>
        <div  className ="RankStar">
          <DisplayRate
          star = {stars}>
          </DisplayRate>
        </div>
      </div>
      </div>  
      </>
    );
  }

// const ProfileReviews = ({profileReview}) => {
//   const {
//     id,
//     review,
//     stars,
// } = profileReview;


//     return (
//       <div>test work</div>
//     );
// };


  export default DescReview;