import React from 'react';

import { InhabitantType } from '../../types';

const Card = ({ gnome }: { gnome: InhabitantType }) => (
  <div className="my-1 px-4 lg:my-4 lg:px-4 w-full md:w-1/2 lg:w-1/3 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">

    <article className="overflow-hidden rounded-lg shadow-lg h-96">

      <header className="flex items-center justify-between leading-tight p-2 md:p-4">
        <img alt="Placeholder" className="block rounded-full w-32 h-32" src={gnome.thumbnail} />
        <h1 className="text-lg">{gnome.name}</h1>
        <p className="text-grey-darker text-sm">{gnome.age}</p>
      </header>

      <footer className="flex items-center justify-start leading-none p-2 md:p-4">
        {
          gnome?.professions?.map((profession, idx) =>
            <p key={`gnome${gnome.id}-${idx}`} className="ml-2 text-sm">{profession}</p>)
        }
        <span className="hidden">Like</span>
        <i className="fa fa-heart"></i>
      </footer>

    </article>

  </div>
)

export default Card;