import React from 'react';
import '../App.css'
import DescReview from './reviewIndex';
import ProfileReviews from '.'
import { useState, useEffect } from 'react';
import axios from 'axios';

const DescReviews = ({ descReviews, refresh, books, reviewUser}) =>
    { 
      const [enrichedReviews, setEnrichedReviews] = useState([]);

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            // map userIDs to the ids in the reviews
            const userIDs = descReviews.map(review => review.id);
            const response = await axios.get(`http://localhost:7000/users`, {
              params: { ids: userIDs }, 
            });

            const users = response.data;
            //mapping the user to their reviews
            const enriched = (descReviews || []).map(review => {
              const user = users.find(user => user.id === review.id);
              return {
                ...review,
                username: user?.username || 'Unknown User',
                profilePic: user?.profilePic || 'default-profile.png',
              };
            });

            setEnrichedReviews(enriched);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };

        if (descReviews?.length) {
          fetchUserData();
        }
      }, [descReviews]);
      
    //need to map reviewUser as well
    return <div className="profile" >
        {(enrichedReviews || []).map(x =>
            <DescReview 
            // books = {books}
            //key ={x.id}
            descReviews={x}
            refresh={refresh}
            books = {books}
            //reviewUser = {reviewUser}
            />
        )}
    </div>
    }

  export default DescReviews;