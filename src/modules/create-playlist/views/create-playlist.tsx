import {useState} from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import {useAuth} from 'lib/auth-provider/context';
import {SpotifyApi} from 'common/constants';

import PlaylistContainer from '../components/playlist-container';
import SearchBar from '../components/search-bar';

import * as playlistService from '../services/playlist';
import * as trackService from '../services/track';

function CreatePlaylist(): JSX.Element {
  const toast = useToast();

  const [playlistDescription, setPlaylistDescription] = useState<string>('');
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [playlistTitle, setPlaylistTitle] = useState<string>('');
  const [errorForm, setErrorForm] = useState<any>(null);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectSimplified[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  const [user] = useAuth(state => [state.user], shallow);

  const resetPlaylistCreator = (): void => {
    setSelectedTracks([]);
    setPlaylistTitle('');
    setPlaylistDescription('');
  };

  const handleCreatePlaylist = async (): Promise<void> => {
    if (!user?.id) return;

    setErrorForm(null);

    if (selectedTracks.length < 1) {
      toast({
        title: 'Error',
        description: 'You must select at least one track',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    if (!playlistTitle) {
      setErrorForm((prevValue: any) => {
        return {
          ...prevValue,
          title: 'Please enter a title',
        };
      });
      return;
    }

    if (playlistTitle && playlistTitle.length < 10) {
      setErrorForm((prevValue: any) => {
        return {
          ...prevValue,
          title: 'Title must be at least 10 characters',
        };
      });
      return;
    }

    if (!playlistDescription) {
      setErrorForm((prevValue: any) => {
        return {
          ...prevValue,
          description: 'Please enter a description',
        };
      });
      return;
    }

    if (playlistDescription && playlistDescription.length < 10) {
      setErrorForm((prevValue: any) => {
        return {
          ...prevValue,
          description: 'Description must be at least 10 characters',
        };
      });
      return;
    }

    setIsCreatingPlaylist(true);

    const payload = {
      name: playlistTitle,
      description: playlistDescription,
    };

    try {
      const {
        data: {id},
      } = await playlistService.create(user.id, payload);
      await playlistService.addTracks(id, selectedTracks);
      resetPlaylistCreator();
      toast({
        title: 'Success',
        description: 'Playlist created successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } catch (e: any) {
      const errorMessage = e.response.data.error.message;
      setErrorForm(errorMessage);
    } finally {
      setIsCreatingPlaylist(false);
    }
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const {value} = event.target;
    setPlaylistTitle(value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const {value} = event.target;
    setPlaylistDescription(value);
  };

  const onHandleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const {value} = event.target;
    setSearch(value);
  };

  const geTracks = async (query: string): Promise<void> => {
    setIsLoadingTracks(true);
    try {
      const {
        data: {
          tracks: {items},
        },
      } = await trackService.search(query);
      setTracks(items);
    } catch (e: any) {
      const errorMessage = e.response.data.error.message;
      setError(errorMessage);
    } finally {
      setIsLoadingTracks(false);
    }
  };

  const onSearch = async (): Promise<void> => {
    if (!user?.id) return;

    setError('');

    if (!search) {
      setError('Please enter a search term');
      return;
    }

    await geTracks(search);
  };

  const onSelectTrack = (uri: string): void => {
    if (selectedTracks.includes(uri)) {
      setSelectedTracks(selectedTracks.filter(item => item !== uri));
    }
    setSelectedTracks([...selectedTracks, uri]);
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        Create Playlist
      </Text>
      <form onSubmit={handleCreatePlaylist}>
        <FormControl my={3} isInvalid={errorForm?.title}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            aria-label="title-input"
            type="text"
            value={playlistTitle}
            onInput={handleTitleChange}
            isDisabled={isCreatingPlaylist}
          />
          <FormErrorMessage>{errorForm?.title}</FormErrorMessage>
        </FormControl>
        <FormControl my={3} isInvalid={errorForm?.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            aria-label="description-input"
            value={playlistDescription}
            onChange={handleDescriptionChange}
            isDisabled={isCreatingPlaylist}
          />
          <FormErrorMessage>{errorForm?.description}</FormErrorMessage>
        </FormControl>
      </form>
      <Text fontSize="2xl" fontWeight="bold">
        Select Songs
      </Text>
      <Box>
        <SearchBar
          my={4}
          onSearch={onSearch}
          onHandleSearchChange={onHandleSearchChange}
          value={search}
          isLoading={isLoadingTracks}
        />

        {tracks.length > 0 && !error && (
          <PlaylistContainer
            tracks={tracks}
            onSelectTrack={onSelectTrack}
            selectedTracks={selectedTracks}
            isLoading={isLoadingTracks}
          />
        )}

        {tracks.length < 1 && !error && (
          <Alert status="info">
            <AlertIcon />
            Start searching for songs by typing in the search bar above
          </Alert>
        )}

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
      </Box>
      <Box
        position="fixed"
        bottom="35px"
        left="0"
        zIndex="sticky"
        py={2}
        w="full"
      >
        <Container maxW="700px">
          <Button
            onClick={handleCreatePlaylist}
            isFullWidth
            colorScheme="green"
            boxShadow="lg"
            my={3}
            type="submit"
            isLoading={isCreatingPlaylist}
          >
            Create playlist
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default CreatePlaylist;
