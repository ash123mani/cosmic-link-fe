import React from 'react'
import { string, oneOf, bool } from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-spinner'

const Spinner = ({
  className, category, size, center, text, inline,
}) => {
  const spinnerClass = classNames({
    blk,
    className,
    mods: [
      category,
      size,
      center && 'center',
      inline && 'inline',
    ],
  })

  return (
    <div
      className={classNames({
        blk,
        elt: 'container',
        mods: [inline && 'inline'],
      })}
    >
      <div className={spinnerClass} />
      {text && (
        <p className={classNames({
          blk,
          elt: 'text',
          mods: [
            inline && 'inline',
            category,
          ],
        })}
        >
          {text}
        </p>
      )}
    </div>
  )
}

Spinner.propTypes = {
  className: string,
  category: oneOf(['primary', 'primary-light', 'primary-medium', 'gray', 'black']),
  size: oneOf(['large', 'medium', 'small']),
  center: bool,
  text: string,
  inline: bool,
}

Spinner.defaultProps = {
  className: '',
  category: 'primary',
  size: 'medium',
  center: true,
  text: '',
  inline: false,
}

export default Spinner
