import {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

import Layout from 'layouts/general';

const CreatePlaylist = lazy(() => import('./views/create-playlist'));

function Modules(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CreatePlaylist />} />
      </Routes>
    </Layout>
  );
}

export default Modules;
