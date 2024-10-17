import React from 'react';
import '../App.css';
import Ranks from '.';


const Ranks1 = ({ ranks }) =>
     <div className="stories" >
    {(ranks || []).map(ranks =>
        <Ranks
        key={ranks.objectID}
        ranks={ranks} />
    )}
  </div>

export default Ranks1;