import { Button } from '@mui/material';
import '../Leaderboard.css';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';
import BookMark from '../BookMark';
import {DisplayRate} from '../Reviews/StarRating';
const Ranks = ({ ranks }) => {

const navigate = useNavigate();

const {
    title,
    url,
    author,
    num_comments,
    points,
    image,
    objectID,
    ranking,
} = ranks;

const handleClick = (id) => {
  navigate(`/about/${id}`);
  // onReview(id);
  console.log("heloi");
}
  
/* layout of the UI when displaying the state from the store */
    return (
      <div className='leaderboard-container' onClick={() => handleClick(objectID)}>
      <span className='rank' >#{ranking}</span>
        <div className="story">
            
            <div className='homePageTitles1' >
                <span>
                <a>{title}</a>
                </span>
                <br></br>
            </div>
            
        <div className='homePageText1'>
            <span>{author}</span>
            <br></br>
            <span>{num_comments} comments</span>
            <br></br>

        </div>
        <img src={image} className='bookImage1' ></img>
        <br></br>
        <div  className ="RankStar">
          <DisplayRate
          star = {points}>
            
          </DisplayRate>
        </div>

      </div>
      </div>  
    );
  }



  export default Ranks;