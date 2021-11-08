import React from 'react';
import { SkeletonLine } from '../../components';

type FriendsListProps = {
  friends: string[];
  isLoading?: boolean;
}

const FriendsList: React.FC<FriendsListProps> = ({ friends, isLoading = false }) => {
  const noFriendFound = !Boolean(friends?.length);

  if (isLoading) {
    return <SkeletonLine lines={4} />;
  }

  if (friends && noFriendFound) {
    return (
      <span className="text-sm font-medium text-gray-400 text-center sm:text-start">
        No friend found
      </span>)
  }

  return (
    <div className="w-full flex flex-col flex-wrap items-center">
      {
        isLoading
          ? <div className="animate-pulse w-28 bg-gray-300 h-4 rounded-md mt-2 sm:mt-0" />
          : friends?.map((friend: string, idx) =>
            <span key={`fd-${idx}-${friend}`} className="text-sm font-medium text-gray-900">
              {friend}
            </span>
          )}
    </div>
  )
}

export default FriendsList;