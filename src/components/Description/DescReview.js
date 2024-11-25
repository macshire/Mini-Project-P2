import React from 'react';
import '../App.css'
import DescReview from '.'
import ProfileReviews from '.'
const DescReviews = ({ descReviews, refresh, books, reviewUser}) =>
    { console.log(descReviews)
        
        return <div className="profile" >
        {(descReviews || []).map(x =>
            <DescReview 
            // books = {books}
            // key ={x.objectId}
            profile={x}
            refresh={refresh}
            books = {books}
            reviewUser = {reviewUser}
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

  export default DescReviews;