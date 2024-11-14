import React from 'react';
import '../App.css';
import Description from '.'

const Description1 = ({ reviews }) =>
    <div className="app">
       <div className="reviews" >
      {(reviews || []).map(x =>
          <Description 
  
          review={x}
          />
      )}
    </div>
    </div>
  
  export default Description1;