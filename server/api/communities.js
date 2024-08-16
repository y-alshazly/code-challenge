import { Meteor } from 'meteor/meteor';

import { Communities } from '../../communities/communities';

export const communities = () =>
  Meteor.methods({
    async readCommunities() {
      const communitiesData = await Communities.find().fetchAsync();

      return communitiesData;
    },
  });
