import {Button, Flex, Image, Text} from '@chakra-ui/react';
import {SpotifyApi} from 'common/constants';
import {formatMilliseconds} from 'lib/helper';

function Track({
  isSelected,
  track,
  onSelectTrack,
}: {
  isSelected: boolean;
  track: SpotifyApi.TrackObjectSimplified;
  onSelectTrack: (uri: string) => void;
}): JSX.Element {
  const {album, name: songName, artists, uri, duration_ms: duration} = track;
  return (
    <Flex align="center">
      <Image
        src={album.images[0]?.url}
        htmlHeight="50px"
        htmlWidth="50px"
        w="50px"
        alt={songName}
      />
      <Flex direction="column" mx={3} flex="1">
        <Text
          isTruncated
          maxW={{
            base: '200px',
            md: '300px',
          }}
        >
          {songName} - {album.name}
        </Text>
        <Text color="gray.500" isTruncated maxW="400px">
          {artists.map(artist => artist.name).join(', ')}
        </Text>
        <Text color="gray.500" isTruncated maxW="400px">
          {formatMilliseconds(duration)}
        </Text>
      </Flex>
      <Button w="80px" onClick={() => onSelectTrack(uri)} type="button">
        {isSelected ? 'Deselect' : 'Select'}
      </Button>
    </Flex>
  );
}

export default Track;
