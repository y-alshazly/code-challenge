import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Select, PeopleDetails } from '../components';
import { People } from '../../people/people';

export const Home = () => {
  const [event, setEvent] = useState('1');
  const [events, setEvents] = useState(undefined);
  const { people } = useTracker(
    () => ({
      people: People.find().fetch(),
      ready: Meteor.subscribe('people', event).ready(),
    }),
    [event]
  );

  useEffect(() => {
    Meteor.call('readCommunities', (error, response) => {
      setEvents([{ _id: '1', name: 'Select an event' }, ...response]);
    });
  }, []);

  const getCheckInPeople = () => {
    const count = people.filter((person) => !person.checkInDate)?.length;

    return count || 0;
  };

  const getPeopleCompanyNamesCount = () => {
    const companies = {};

    people.forEach((person) => {
      if (person.companyName && !companies[person.companyName]) {
        companies[person.companyName] = 1;
      } else if (person.companyName && companies[person.companyName]) {
        companies[person.companyName]++;
      }
    });

    return companies;
  };

  return (
    <div className="xl:container xl:mx-auto">
      <div className="mx-auto max-w-lg">
        <Select
          id="event"
          value={event}
          onChange={(_event) => setEvent(_event.target.value)}
          options={
            events
              ? events.map((community) => ({
                  value: community._id,
                  label: community.name,
                  id: community._id,
                }))
              : []
          }
        />

        {event !== '1' && (
          <>
            <p className="mt-5 text-blue-600">
              People in the event right now :{'  '}
              <span className="font-semibold text-gray-900 dark:text-black">
                {people.length}
              </span>
            </p>

            <p className="mt-5 text-blue-600">
              People by company in the event right now :{'  '}
              {Object.keys(getPeopleCompanyNamesCount()).map((companyKey) => (
                <span
                  key={companyKey}
                  className="font-semibold text-gray-900 dark:text-black"
                >
                  {` ${companyKey}  (${getPeopleCompanyNamesCount()[companyKey]}), `}
                </span>
              ))}
            </p>

            <p className="mt-5 text-blue-600">
              People not checked in :{'  '}
              <span className="font-semibold text-gray-900 dark:text-black">
                {getCheckInPeople()}
              </span>
            </p>
          </>
        )}

        {people && event !== '1' && (
          <div>
            <h2 className="mb-2 mt-4 text-lg font-semibold text-gray-900 dark:text-black">
              People Registered:
            </h2>
            <ul className="list-inside list-disc space-y-1 text-gray-500 dark:text-gray-500">
              {people.map((item) => (
                <PeopleDetails item={item} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
