import {Box, Flex, Text, Image, Button} from '@chakra-ui/react';
import {useLogin} from 'lib/auth-provider/context/hooks';

import logo from 'assets/images/Spotify_Logo_RGB_Green.png';

function Login(): JSX.Element {
  const [login] = useLogin();

  return (
    <Flex minHeight="100vh" direction="column" justify="center">
      <Box maxWidth={320} mx="auto">
        <Image
          src={logo}
          alt="wish-logo"
          htmlHeight={24}
          htmlWidth="auto"
          objectFit="contain"
        />
        <Box mb={14} mt={10}>
          <Text
            mb={3}
            fontSize="3xl"
            textAlign="center"
            lineHeight={9}
            fontWeight="bold"
          >
            Login
          </Text>
          <Text
            fontSize="xl"
            textAlign="center"
            lineHeight={7}
            fontWeight="medium"
          >
            Spotify playlist creator
          </Text>
          <Button
            mt={8}
            mx="auto"
            display="block"
            colorScheme="teal"
            onClick={login}
          >
            Login with Spotify
          </Button>
        </Box>
      </Box>
      <Box mt={12} maxHeight={24}>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Made with love by{' '}
          <a
            href="https://www.linkedin.com/in/lucky-dewa-satria/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lucky Dewa Satria
          </a>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
