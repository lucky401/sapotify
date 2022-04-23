![Demo Application](https://snipboard.io/LJx2cH.jpg "Demo Application")

# Sapotify 🎶

Making a playlist is as simple as a single tap of your thumb.

- Seamless integration with your Spotify account
- Cloud-enabled and mobile-ready
- Search songs, select, and create your awesome playlist

## Live Demo

You can see the running example here [the deployment of the app on Vercel](https://sapotify.vercel.app).

## Features

- Using Implicit Grant Flow auth
- Search your favorite tracks from any genre
  - Look at the song title, album name, artists, and durations
- Select or deselect your favorite track to add to the new playlist
- Write your playlist title (min 10 characters) and descriptions
- Create private playlist with your selected tracs, title and descriptions
- All playlists you make will be kept private.
- Maintainable Tests using react-testing-library
- Using zustand and redux for state management

## Additional Features

- Dark and ligt mode
- You can see your picture profile
- You can log out once you've finished creating your playlist.
- Error boundary and succes handling
- Using modular architecture
- Improved User experience, thanks to [Chakra UI]
- Improved security using hash and provides protection against attacks such as cross-site request forgery.

## Tech

Sapotify uses a number of open source projects to work properly:

- [React] - A JavaScript library for building user interfaces
- [developer.spotify.com] - Build experiences for millions of music lovers with playback, personalization, and much, much more.
- [Axios] -  a simple promise based HTTP client for the browser and node.js.
- [Chakra UI] -  a simple, modular and accessible component library

## System Requirements

- [git][git] v2.13 or greater
- [NodeJS][node] `14 || 15 || 16`
- [npm][npm] v6 or greater

All of these must be available in your `PATH`. To verify things are set up properly, you can run this:

```shell
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment variable and how to fix it here for [windows][win-path] or [mac/linux][mac-path].

## Setup

After you've made sure to have the correct things (and versions) installed, you should be able to just run a few commands to get set up:

```
git clone https://github.com/lucky401/sapotify.git
cd sapotify
npm run setup
```

This may take a few minutes. If you get any errors, please read through them and see if you can find out what the problem is. If you can't work it out on your own then please [file an issue][issue] and provide _all_ the output from the commands you ran (even if it's a lot).

If you can't get the setup script to work, then just make sure you have the
right versions of the requirements listed above, and run the following commands:

```
npm install
```

If you are still unable to fix issues and you know how to use Docker 🐳 you can
setup the project with the following command:

```shell
docker-compose up --detach --build
```

## Running the app

**Set up the proper environment variables**
```shell
cp .env.example .env
```

```env
NODE_ENV=development
REACT_APP_STAGE=development
REACT_APP_SPOTIFY_CLIENT_ID=
```

> To fill `REACT_APP_SPOTIFY_CLIENT_ID` you can follow tutorial from [Spotify Developer doc] to get your `CLIENT ID`


> **Important** you can set `Redirect URIs`, `Base API URL`, and other config in `src/lib/config`

To get the app up and running (and really see if it worked), run:

```shell
npm run start
```

Verify the deployment by navigating to your server address in
your preferred browser.

```shell
localhost:3000
```

You can also open [the deployment of the app on Vercel](https://sapotify.vercel.app).

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [React]: <https://reactjs.org>
   [Chakra UI]: <https://chakra-ui.com>
   [React Table]: <https://react-table.tanstack.com>
   [Axios]: <https://axios-http.com>
   [npm]: <https://www.npmjs.com/>
   [node]: <https://nodejs.org>
   [git]: <https://git-scm.com/>
   [developer.spotify.com]: <https://developer.spotify.com/>
   [win-path]: <https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/>
   [mac-path]: <http://stackoverflow.com/a/24322978/971592>
   [Spotify developer doc]: <https://developer.spotify.com/documentation/general/guides/authorization/app-settings/>
   [issue]: <https://github.com/lucky401/sapotify/issues/new>
