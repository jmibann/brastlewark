import React from 'react';

import { InhabitantType } from '../../types';

const Card = ({ gnome }: { gnome: InhabitantType }) => (
  <div className="my-1 px-4 lg:my-4 lg:px-4 w-full md:w-1/2 lg:w-1/3 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">

    <article className="overflow-hidden rounded-lg shadow-lg h-96">

      <div className="">
        <img alt="Placeholder" className="block h-64 w-full" src={gnome.thumbnail} />
      </div>

      <header className="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 className="text-lg">
          <a className="no-underline hover:underline text-black" href="#">
            {gnome.name}
          </a>
        </h1>
        <p className="text-grey-darker text-sm">
          {gnome.age}
        </p>
      </header>

      <footer className="flex items-center justify-between leading-none p-2 md:p-4">
        <a className="flex items-center no-underline hover:underline text-black" href="#">
          <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" />
          <p className="ml-2 text-sm">
            Author Name
          </p>
        </a>
        <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
          <span className="hidden">Like</span>
          <i className="fa fa-heart"></i>
        </a>
      </footer>

    </article>

  </div>
)

export default Card;