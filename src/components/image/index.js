import React from 'react'
import { string, bool } from 'prop-types'

import cosmicLinkLogo from '@images/cosmic-link-logo.svg'
import { classNames } from '@common/helpers'

const blk = 'cosmic-image'

const Image = ({
  imageUrl, alt, className, lazy, height, width,
}) => {
  const eltClassName = classNames({
    blk,
    className,
  })

  return (
    <img
      className={eltClassName}
      src={imageUrl}
      alt={alt}
      height={height}
      width={width}
      loading={lazy ? 'lazy' : 'eager'}
    />
  )
}

Image.propTypes = {
  imageUrl: string,
  alt: string.isRequired,
  className: string,
  lazy: bool,
  height: string,
  width: string,
}

Image.defaultProps = {
  className: '',
  lazy: true,
  width: '100%',
  height: '100%',
  imageUrl: cosmicLinkLogo,
}

export default Image
