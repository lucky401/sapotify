import {Grid, Spinner} from '@chakra-ui/react';

import {SpotifyApi} from 'common/constants';

import PlaylistItem from './playlist-item';

function PlaylistContainer({
  tracks,
  onSelectTrack,
  selectedTracks,
  isLoading = false,
}: {
  tracks: SpotifyApi.TrackObjectSimplified[];
  onSelectTrack: (uri: string) => void;
  selectedTracks: string[];
  isLoading?: boolean;
}): JSX.Element {
  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={4}>
      {isLoading && <Spinner size="xl" mx="auto" my={6} />}
      {!isLoading &&
        tracks.map(item => {
          const {uri} = item;
          return (
            <PlaylistItem
              key={uri}
              track={item}
              onSelectTrack={onSelectTrack}
              isSelected={selectedTracks.includes(uri)}
            />
          );
        })}
    </Grid>
  );
}

export default PlaylistContainer;
