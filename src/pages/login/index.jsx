import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useLogin } from '../../hooks/auth';

import './index.css';

function Login() {
  const [login] = useLogin();
  return (
    <Flex height="100vh" display="flex" align="center" justify="center">
      <Box>
        <Text as="h1" textAlign="center" fontSize="3xl">
          Spotify Playlist Creator
        </Text>
        <Button
          type="button"
          onClick={login}
          colorScheme="green"
          mx="auto"
          d="block"
          my={4}
        >
          Login to Spotify
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
