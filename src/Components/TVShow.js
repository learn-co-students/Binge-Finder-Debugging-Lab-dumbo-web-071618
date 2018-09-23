import React from 'react';

const tvShow = (props) => {
  return (
    <div>
      <br/>
      <img src={props.show.image.medium} onClick={show => props.selectShow(props)} alt=""/>
    </div>
  );
}

export default tvShow;
