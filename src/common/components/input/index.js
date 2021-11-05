import React, { memo } from 'react'
import { string, func } from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-input'

const Input = ({
  className, placeholder, label, errorMessage, type, onChange, name,
}) => {
  const eltClassName = classNames({
    blk,
    className,
    mods: [errorMessage && 'error'],
  })

  return (
    <div className={eltClassName}>
      {label && (
        <label
          htmlFor={name}
          className={classNames({ blk, elt: 'label' })}
        >
          {label}
        </label>
      )}
      <input
        className={classNames({ blk, elt: 'box' })}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        name={name}
      />
      {errorMessage && (
        <div
          className={classNames({ blk, elt: 'error' })}
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}

Input.propTypes = {
  className: string,
  placeholder: string,
  name: string.isRequired,
  label: string,
  errorMessage: string,
  type: string,
  onChange: func,
}

Input.defaultProps = {
  className: '',
  placeholder: '',
  label: '',
  errorMessage: '',
  type: 'text',
  onChange: () => {},
}

export default memo(Input)
