import React from "react";

import { InhabitantType } from '../../types';
import { Card } from '../../components';

type CardsBoardType = {
  inhabitants: InhabitantType[] | undefined;
}

const CardsBoard: React.FC<CardsBoardType> = ({ inhabitants }) => {


  return (
    <div className="flex flex-wrap -mx-1 lg:-mx-4">
      {
        inhabitants?.map(gnome => <Card key={`gnome-${gnome.id}`} gnome={gnome} />)
      }
    </div>
  );
}

export default CardsBoard;