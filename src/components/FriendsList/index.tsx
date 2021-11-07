import React from 'react';

type FriendsListProps = {
  friends: string[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <div className="w-full flex flex-col flex-wrap items-center">
      {friends?.map((friend: string) =>
        <span className="text-sm font-medium text-gray-900">{friend}</span>
      )}
    </div>
  )
}

export default FriendsList;