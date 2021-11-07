import React from 'react';

type FriendsListProps = {
  friends: string[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  const noFriendFound = !Boolean(friends?.length);

  if (noFriendFound) {
    return (
      <span className="text-sm font-medium text-gray-400 text-center sm:text-start">
        No friend found
      </span>)
  }
  return (
    <div className="w-full flex flex-col flex-wrap items-center">
      {friends?.map((friend: string, idx) =>
        <span key={`fd-${idx}-${friend}`} className="text-sm font-medium text-gray-900">
          {friend}
        </span>
      )}
    </div>
  )
}

export default FriendsList;