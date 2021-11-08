import React, { Fragment } from 'react';

import { ImageCacheType } from '../../types';

type InvisibleImagesType = {
  imgCache: ImageCacheType;
}

const InvisibleImages: React.FC<InvisibleImagesType> = ({ imgCache }) => (
  <Fragment>
    {
      imgCache?.map(img => <img src={img} key={img} className="hidden" alt="" />)
    }
  </Fragment>
)

export default InvisibleImages;