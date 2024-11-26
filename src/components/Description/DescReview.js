import React from 'react';
import '../App.css'
import DescReview from './reviewIndex';
import ProfileReviews from '.'
const DescReviews = ({ descReviews, refresh, books, reviewUser}) =>
    { console.log(descReviews)
    return <div className="profile" >
        {(descReviews || []).map(x =>
            <DescReview 
            // books = {books}
            // key ={x.objectId}
            descReviews={x}
            refresh={refresh}
            books = {books}
            reviewUser = {reviewUser}
            />
        )}
    </div>
    }

  export default DescReviews;