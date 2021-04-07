import * as React from 'react';

const LocationMessageTemplate = ({ username, createdAt, url }) => {
  return (
    <div className="message">
      <p>
        <span className="message__name">{username}</span>
        <span className="message__meta">{createdAt}</span>
      </p>
      <p>
        <a href={url} target="_blank" rel="noreferrer">
          My current location
        </a>
      </p>
    </div>
  );
};

export default LocationMessageTemplate;
