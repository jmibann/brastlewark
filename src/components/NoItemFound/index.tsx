import React from 'react';

const NoItemFound: React.FC<{}> = () => (
  <tbody className="flex w-full justify-center items-center">
    <tr>
      <td className="py-4 text-lg font-semibold text-gray-500 uppercase">
        No items found
      </td>
    </tr>
  </tbody>
)

export default NoItemFound;