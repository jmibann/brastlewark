import React from 'react';
import classNames from 'classnames';

type PageButtonProps = {
  className?: string;
  [x: string]: any;
};

export const PageButton: React.FC<PageButtonProps> = ({ children, className, ...rest }) => {
  const btnClass = classNames(
    "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
    className
  )
  return (
    <button type="button" className={btnClass} {...rest}>
      {children}
    </button>

  )
}


export default PageButton;