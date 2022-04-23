import {render, fireEvent, waitFor, screen} from 'lib/test-utils';
import '@testing-library/jest-dom';

import CreatePlaylist from '../views/create-playlist';

test('loads form and create playlist button', async () => {
  render(<CreatePlaylist />);

  expect(await screen.getByLabelText('Title')).toBeInTheDocument();
  expect(await screen.getByLabelText('Description')).toBeInTheDocument();

  expect(await screen.findByRole('button', {name: 'Create playlist'}));
});

// test search input
test('search input', async () => {
  render(<CreatePlaylist />);

  const searchInput = (await screen.getByLabelText(
    'search-input',
  )) as HTMLInputElement;
  fireEvent.change(searchInput, {target: {value: 'test'}});
  expect(searchInput.value).toBe('test');
});

// test search button
test('search button', async () => {
  render(<CreatePlaylist />);

  const searchButton = await screen.findByRole('button', {name: 'Search'});
  fireEvent.click(searchButton);
  expect(searchButton).toBeInTheDocument();
});
