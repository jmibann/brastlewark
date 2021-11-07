import React from 'react';

import { Pill } from '../../components';

type ProfessionsListProps = {
  professions: string[];
}

const ProfessionsList: React.FC<ProfessionsListProps> = ({ professions }) => {
  return (
    <div className="w-full flex flex-wrap">
      {professions?.map((prof: string) => <Pill value={prof} />)}
    </div>
  )
}

export default ProfessionsList;