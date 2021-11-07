import React from 'react';

import { Pill } from '../../components';

type ProfessionsListProps = {
  professions: string[];
}

const ProfessionsList: React.FC<ProfessionsListProps> = ({ professions }) => {
  const noProfessionFound = !Boolean(professions?.length);

  if (noProfessionFound) {
    return (
      <span className="text-sm font-medium text-gray-400 text-center sm:text-start">
        No profession found
      </span>)
  }

  return (
    <div className="w-full flex flex-wrap">
      {professions?.map((prof: string, idx) => <Pill key={`prof-${idx}`} value={prof} />)}
    </div>
  )
}

export default ProfessionsList;