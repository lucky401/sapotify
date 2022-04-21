import shallow from 'zustand/shallow';

import {
  Box,
  IconButton,
  Code,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
  Image,
} from '@chakra-ui/react';
import {FaGithub} from 'react-icons/fa';
import {MdLogout} from 'react-icons/md';

import {useAuth} from 'lib/auth-provider/context';
import {useLogout} from 'lib/auth-provider/context/hooks';

import {ColorModeSwitcher} from './components/ColorModeSwitcher';

function BasicLayout({
  children,
  title = 'Spotify Playlist Creator',
}: {
  children: JSX.Element;
  title?: string;
}): JSX.Element {
  const [user] = useAuth(state => [state.user], shallow);
  const [logout] = useLogout();

  return (
    <Box id="app">
      <Container maxW="700px">
        <Flex align="center" pt={10} pb={10}>
          <Image
            src={user.avatar}
            alt={user.display_name}
            htmlHeight="60px"
            htmlWidth="60px"
            rounded="full"
            mr={4}
          />
          <Box>
            <Heading
              fontSize={{
                base: 'lg',
                md: '3xl',
              }}
            >
              {title}
            </Heading>
            <Text
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
              fontWeight="extrabold"
              fontSize={{
                base: 'sm',
                md: 'xl',
              }}
            >
              Welcome, {user.display_name}!
            </Text>
          </Box>
          <Spacer />
          <HStack gap={1}>
            <ColorModeSwitcher />
            <IconButton
              size="md"
              fontSize="lg"
              variant="ghost"
              color="current"
              aria-label="Logout"
              icon={<Icon as={MdLogout} />}
              onClick={logout}
            />
          </HStack>
        </Flex>
        <Box pb={28}>{children}</Box>
        <Box
          position="fixed"
          bottom="0"
          left="0"
          zIndex="sticky"
          borderTop="1px"
          borderColor="gray.300"
          py={2}
          w="full"
          backdropFilter="auto"
          backdropBlur="8px"
        >
          <footer>
            <Container maxW={{xl: '1200px'}}>
              <Flex
                align="center"
                justify={{
                  base: 'center',
                  md: 'auto',
                }}
              >
                <Box>
                  <span>Spotify Playlist Creator</span>
                </Box>
                <Spacer />
                <HStack align="center">
                  <Link
                    href="https://github.com/lucky401/sapotify"
                    isExternal
                    mx={4}
                  >
                    <Icon
                      as={FaGithub}
                      w={6}
                      h={6}
                      color={{
                        dark: 'gray.300',
                        light: 'gray.600',
                      }}
                    />
                  </Link>
                  <Code ml={4}>Lucky Dewa Satria</Code>
                </HStack>
              </Flex>
            </Container>
          </footer>
        </Box>
      </Container>
    </Box>
  );
}

export default BasicLayout;
