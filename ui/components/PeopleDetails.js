import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Meteor } from 'meteor/meteor';

export const PeopleDetails = (props) => {
  const { item } = props;
  const [loadingActions, setLoadingActions] = useState([]);

  const handleCheckInOutOnPress = (id, status) => {
    Meteor.call('updateArticleById', { _id: id, status }, () => {
      setTimeout(() => {
        setLoadingActions([...loadingActions, id]);
      }, 5000);
    });
  };

  return (
    <div
      key={item._id}
      className="justify-content:space-between flex-direction: column flex [&>*]:mb-6"
    >
      <li>
        <span className="font-semibold text-gray-900 dark:text-black">
          MR {`${item.firstName} ${item.lastName}`}
        </span>
        {'  '} with title {'  '}
        <span className="font-semibold text-gray-900 dark:text-black">
          {item.title || 'N/A'}
        </span>
        {'  '} that is working in {'  '}
        <span className="font-semibold text-gray-900 dark:text-black">
          {item.companyName || 'N/A'}
        </span>
        {'  '} with checked In date {'  '}
        <span className="font-semibold text-gray-900 dark:text-black">
          {item.checkInDate
            ? dayjs(item.checkInDate).format('DD-MM-YYYY, HH:mm')
            : 'N/A'}
        </span>
        {'  '} and checked Out date {'  '}
        <span className="font-semibold text-gray-900 dark:text-black">
          {item.checkOutDate
            ? dayjs(item.checkOutDate).format('DD-MM-YYYY, HH:mm')
            : 'N/A'}
        </span>
      </li>

      {!item.checkInDate && (
        <button
          onClick={() => handleCheckInOutOnPress(item._id, 'checkIn')}
          className="ml-4 min-w-32 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Check IN
        </button>
      )}

      {loadingActions.includes(item._id) && (
        <button
          onClick={() => handleCheckInOutOnPress(item._id, 'checkOut')}
          disabled={item.checkInDate && item.checkOutDate}
          className="ml-4 min-w-32 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          {item.checkInDate && item.checkOutDate
            ? 'Already Checked OUT'
            : 'Check Out'}
        </button>
      )}
    </div>
  );
};
