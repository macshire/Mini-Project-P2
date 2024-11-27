import React from 'react';
import '../App.css'
import DescReview from './reviewIndex';
import ProfileReviews from '.'
const DescReviews = ({ descReviews, refresh, books, reviewUser}) =>
    { console.log(descReviews)
        const enrichedReviews = (descReviews || []).map(review => {
            const user = (reviewUser || []).find(user => user.id === review.id);
            return {
              ...review,
              username: user?.username || 'Unknown User',
              profilePic: user?.profilePic || 'default-profile.png', // Placeholder for missing profile pics
            };
          });
    //need to map reviewUser as well
    return <div className="profile" >
        {(enrichedReviews || []).map(x =>
            <DescReview 
            // books = {books}
            //key ={x.id}
            descReviews={x}
            refresh={refresh}
            books = {books}
            reviewUser = {reviewUser}
            />
        )}
    </div>
    }

  export default DescReviews;