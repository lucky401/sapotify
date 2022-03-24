import React from 'react';

function Track({ image, songName, albumName, artists }) {
  return (
    <div className="playlist-item">
      <img className="playlist-image" src={image} alt={songName} />
      <div className="playlist-content">
        <h2 className="playlist-title">{songName}</h2>
        <h3 className="playlist-description text-truncate">
          {artists.map((artist) => artist.name).join(', ')}
        </h3>
        <h3 className="playlist-description text-truncate">{albumName}</h3>
      </div>
      <div className="playlist-actions">
        <button type="button" className="playlist-action">
          Select
        </button>
      </div>
    </div>
  );
}

export default Track;
