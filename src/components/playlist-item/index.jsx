function Track({ isSelected, track, onSelectTrack }) {
  const { album, name: songName, artists, uri } = track;
  return (
    <div className="playlist-item-flex">
      <img
        className="playlist-image"
        src={album.images[0]?.url}
        alt={songName}
      />
      <div className="playlist-content">
        <h2 className="playlist-title">{songName}</h2>
        <h3 className="playlist-description text-truncate">
          {artists.map((artist) => artist.name).join(', ')}
        </h3>
        <h3 className="playlist-description text-truncate">{album.name}</h3>
      </div>
      <div className="playlist-actions">
        <button
          onClick={() => onSelectTrack(uri)}
          type="button"
          className="playlist-action"
        >
          {isSelected ? 'Deselect' : 'Select'}
        </button>
      </div>
    </div>
  );
}

export default Track;
