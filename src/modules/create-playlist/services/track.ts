import {AxiosResponse} from 'axios';
import resource from 'lib/client';

function search(query: string): Promise<AxiosResponse<any, any>> {
  const params = {
    q: query,
    limit: 10,
    market: 'ID',
    type: 'track',
  };

  return resource.get('/search', {params});
}

export {search};
