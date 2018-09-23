import React from 'react';

const Episode = (props) => {
  let myEpisode = props
  return (
    <div>
      Episode {myEpisode.eachEpisode.number} - {myEpisode.eachEpisode.name}
    </div>
  )
}

export default Episode;
