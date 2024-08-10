import { Meteor } from 'meteor/meteor';

import { People } from '../../people/people';

export const people = () => {
  Meteor.publish('people', (communityId) => {
    const peopleData = People.find({ communityId });

    return [peopleData];
  });

  Meteor.methods({
    async updateArticleById(args) {
      const person = await People.findOneAsync({ _id: args._id });

      if (!person) {
        const error = new Meteor.Error(
          'Not Found',
          "We couldn't find the person you are looking for."
        );
        throw error;
      }

      if (args.status === 'checkIn') {
        return People.updateAsync(
          { _id: person._id },
          { $set: { checkInDate: new Date() } }
        );
      }

      return People.updateAsync(
        { _id: person._id },
        { $set: { checkOutDate: new Date() } }
      );
    },
  });
};
