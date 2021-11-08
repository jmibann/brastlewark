import React from 'react';

import { Pill, SkeletonPill } from '../../components';

type ProfessionsListProps = {
  professions: string[];
  isLoading?: boolean;
}



const ProfessionsList: React.FC<ProfessionsListProps> = ({ professions, isLoading = false }) => {
  const noProfessionFound = !Boolean(professions?.length);

  if (isLoading) {
    return <SkeletonPill pills={4} />
  }

  if (professions && noProfessionFound) {
    return (
      <span className="text-sm font-medium text-gray-400 text-center sm:text-start">
        No profession found
      </span>)
  }

  return (
    <div className="w-full flex flex-wrap">
      {
        isLoading
          ? <div className="animate-pulse rounded-full py-3 px-12 bg-gray-300 h-4 rounded-md mt-2 sm:mt-0" />
          : professions?.map((prof: string, idx) =>
            <Pill key={`prof-${idx}`} value={prof} />)
      }
    </div>
  )
}

export default ProfessionsList;