import {render, fireEvent, waitFor, screen} from 'lib/test-utils';
import '@testing-library/jest-dom';

import Login from '../views/login';

test('loads and displays greeting', async () => {
  render(<Login />);
  expect(
    await screen.getByText('Spotify playlist creator'),
  ).toBeInTheDocument();
  expect(await screen.findByRole('button', {name: 'Login with Spotify'}));
});

test('Have login button and click it', async () => {
  render(<Login />);
  expect(
    await screen.findByRole('button', {name: 'Login with Spotify'}),
  ).toBeInTheDocument();
});

test('Loads footer', async () => {
  render(<Login />);
  expect(await screen.getByText('Made with love by')).toBeInTheDocument();
});
