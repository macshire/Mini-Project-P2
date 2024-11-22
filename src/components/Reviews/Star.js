import React from 'react';
import PropTypes from 'prop-types';
import Rate from './StarRating';

const Star = ({filled, onClick}) => (
  <span 
    onClick={onClick} 

    style={{ 
      cursor: 'pointer', 
      color: filled ? 'gold' : 'gray', 
      fontSize: '3.5vw',  
      alignSelf: 'center'
    }}

  >
    ★
  </span> 

);

Star.propTypes = {
  filled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Star;