import React from 'react';
import '../App.css'
import Profile from '.'
import ProfileReviews from '.'
const ProfileReview = ({ profileReviews, refresh, books}) =>
    { console.log(profileReviews)
        
        return <div className="profile" >
        {(profileReviews || []).map(x =>
            <Profile 
            // books = {books}
            // key ={x.objectId}
            profile={x}
            refresh={refresh}
            books = {books}
            />
        )}
        {/* {(books || []).map(x =>
            <ProfileReviews
            key ={x.objectId}
            book={x}
            />
        )} */}
    </div>
    }

  export default ProfileReview;