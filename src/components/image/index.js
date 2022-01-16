/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { string, bool, func } from 'prop-types'

import cosmicLinkLogo from '@images/cosmic-link-logo.svg'
import { classNames } from '@common/helpers'

const blk = 'cosmic-image'

const Image = ({
  imageUrl, alt, className, lazy, height, width, onClick, asButton, ...rest
}) => {
  const eltClassName = classNames({
    blk,
    className,
  })

  if (asButton) {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <img
        className={eltClassName}
        src={imageUrl}
        alt={alt}
        height={height}
        width={width}
        loading={lazy ? 'lazy' : 'eager'}
        onClick={onClick}
        onKeyDown={onClick}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        tabIndex="0"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    )
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <img
      className={eltClassName}
      src={imageUrl}
      alt={alt}
      height={height}
      width={width}
      loading={lazy ? 'lazy' : 'eager'}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
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
  onClick: func,
  asButton: bool,
}

Image.defaultProps = {
  className: '',
  lazy: true,
  width: '100%',
  height: '100%',
  imageUrl: cosmicLinkLogo,
  onClick() {},
  asButton: false,
}

export default Image
