import { Meteor } from 'meteor/meteor';

import { loadInitialData } from '../infra/initial-data';
import { App } from './app';

Meteor.startup(async () => {
  await loadInitialData();

  App();
});
