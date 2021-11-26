/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, memo, useRef } from 'react'
import {
  oneOf, string, shape, arrayOf, func,
} from 'prop-types'

import { classNames } from '@common/helpers'
import { useOutsideClick } from '@hooks'

import './_style.scss'

const blk = 'cosmic-dropdown'

const DropDown = ({
  category, className, defaultSelected, list, label, handleChange,
}) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [selected, setSelected] = useState(defaultSelected)
  const ref = useRef(null)

  const categoryMod = { mods: [category] }
  const eltClassName = classNames({
    blk,
    className,
    ...categoryMod,
  })

  const outSideClickHandler = () => {
    if (showDropDown) {
      setShowDropDown(false)
    }
  }

  useOutsideClick(ref, outSideClickHandler)

  const handleDropDownClick = () => {
    setShowDropDown(!showDropDown)
  }

  const handleSelectedItemChange = (item) => {
    setSelected(item)
    handleDropDownClick()
    handleChange(item)
  }

  if (!list.length) {
    return null
  }

  return (
    <div
      className={eltClassName}
      onBlur={handleDropDownClick}
      ref={ref}
    >
      {label && (
        <div
          className={classNames({ blk, elt: 'label', ...categoryMod })}
        >
          {label}
        </div>
      )}

      <div
        className={classNames({ blk, elt: 'selected', ...categoryMod })}
        onClick={handleDropDownClick}
        onKeyDown={handleDropDownClick}
        role="button"
      >
        {selected.value || 'Select'}
      </div>

      <div
        className={classNames({
          blk,
          elt: 'content',
          mods: [category, showDropDown && 'show'],
        })}
      >
        {list.map((item) => (
          <div
            className={classNames({ blk, elt: 'item', ...categoryMod })}
            key={item.key}
            onClick={(e) => handleSelectedItemChange(item, e)}
            onKeyDown={(e) => handleSelectedItemChange(item, e)}
            role="button"
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  )
}

DropDown.propTypes = {
  category: oneOf(['dark', 'light']),
  className: string,
  defaultSelected: string,
  list: arrayOf(shape({
    value: string,
    key: string,
  })),
  label: string,
  handleChange: func.isRequired,
}

DropDown.defaultProps = {
  category: 'dark',
  className: '',
  defaultSelected: {},
  label: '',
  list: [],
}

export default memo(DropDown)
