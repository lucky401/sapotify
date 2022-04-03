import resource from '../resource';

export default {
  getCurrentUserProfile() {
    return resource.get('/me');
  },
};
