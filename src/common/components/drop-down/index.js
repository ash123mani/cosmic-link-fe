/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {
  useState, memo, useRef, useEffect,
} from 'react'
import {
  oneOf, string, shape, arrayOf, func,
} from 'prop-types'

import { classNames } from '@common/helpers'
import { useOutsideClick } from '@hooks'

import './_style.scss'

const blk = 'cosmic-dropdown'

const DropDown = ({
  category,
  className,
  defaultSelected,
  list,
  label,
  handleChange,
  renderItem,
  isOpen,
  onOpenChange,
  emptyText,
  loading,
  selectedLabel,
  closeOnSelect,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [selected, setSelected] = useState(defaultSelected)
  const ref = useRef(null)

  const showDropDown = isOpen !== undefined ? isOpen : internalOpen

  const setOpen = (next) => {
    if (isOpen === undefined) {
      setInternalOpen(next)
    }
    if (onOpenChange) {
      onOpenChange(next)
    }
  }

  const categoryMod = { mods: [category] }
  const eltClassName = classNames({
    blk,
    className,
    ...categoryMod,
  })

  const outSideClickHandler = () => {
    if (showDropDown) {
      setOpen(false)
    }
  }

  useOutsideClick(ref, outSideClickHandler)

  const handleDropDownClick = () => {
    setOpen(!showDropDown)
  }

  const handleSelectedItemChange = (item) => {
    setSelected(item)
    if (closeOnSelect) {
      setOpen(false)
    }
    handleChange(item)
  }

  useEffect(() => {
    setSelected(defaultSelected)
  }, [defaultSelected])

  if (!loading && !list.length && !emptyText) {
    return null
  }

  const resolvedSelectedLabel = selectedLabel !== undefined
    ? selectedLabel
    : ((selected && (selected.value || selected.label)) || 'Select')

  return (
    <div
      className={eltClassName}
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
        tabIndex={0}
      >
        {resolvedSelectedLabel}
      </div>

      <div
        className={classNames({
          blk,
          elt: 'content',
          mods: [category, showDropDown && 'show'],
        })}
      >
        {loading && (
          <div className={classNames({ blk, elt: 'status', ...categoryMod })}>Loading...</div>
        )}
        {!loading && !list.length && emptyText && (
          <div className={classNames({ blk, elt: 'status', ...categoryMod })}>{emptyText}</div>
        )}
        {!loading && list.map((item) => (
          <div
            className={classNames({ blk, elt: 'item', ...categoryMod })}
            key={item.key || item.id}
            onMouseDown={(e) => {
              e.preventDefault()
              handleSelectedItemChange(item)
            }}
            role="button"
            tabIndex={0}
          >
            {renderItem ? renderItem(item) : (
              <>
                <span className={classNames({ blk, elt: 'item-label' })}>
                  {item.value || item.label}
                </span>
                {(item.subLabel || item.email) && (
                  <span className={classNames({ blk, elt: 'item-sub' })}>
                    {item.subLabel || item.email}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

DropDown.propTypes = {
  category: oneOf(['dark', 'light']),
  className: string,
  defaultSelected: shape({
    key: string,
    value: string,
  }),
  list: arrayOf(shape({
    value: string,
    key: string,
    id: string,
    label: string,
  })),
  label: string,
  handleChange: func.isRequired,
  renderItem: func,
  isOpen: oneOf([true, false, undefined]),
  onOpenChange: func,
  emptyText: string,
  loading: oneOf([true, false]),
  selectedLabel: string,
  closeOnSelect: oneOf([true, false]),
}

DropDown.defaultProps = {
  category: 'dark',
  className: '',
  defaultSelected: {},
  label: '',
  list: [],
  renderItem: null,
  isOpen: undefined,
  onOpenChange: null,
  emptyText: '',
  loading: false,
  selectedLabel: undefined,
  closeOnSelect: true,
}

export default memo(DropDown)
