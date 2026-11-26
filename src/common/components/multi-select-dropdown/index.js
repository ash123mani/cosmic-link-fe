/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {
  memo, useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import {
  arrayOf, bool, func, oneOf, shape, string,
} from 'prop-types'
import { createPortal } from 'react-dom'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-multi-select-dropdown'
const MOBILE_MEDIA = '(max-width: 768px)'

const useIsMobile = () => {
  const [mobile, setMobile] = useState(() => (
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MEDIA).matches : false
  ))
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    const mql = window.matchMedia(MOBILE_MEDIA)
    const onChange = (e) => setMobile(e.matches)
    setMobile(mql.matches)
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange)
    } else {
      mql.addListener(onChange)
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange)
      } else {
        mql.removeListener(onChange)
      }
    }
  }, [])
  return mobile
}

const getOptionKey = (option) => String(option.key || option.id || option.value || option.label || '')
const getOptionLabel = (option) => option.value || option.label || ''
const getOptionSubLabel = (option) => option.subLabel || option.email || ''

const MultiSelectDropDown = ({
  category,
  className,
  label,
  options,
  selected,
  onChange,
  onSearchChange,
  searchValue,
  placeholder,
  emptyText,
  loading,
  disabled,
  isOpen,
  onOpenChange,
  closeOnSelect,
  renderOption,
  maxVisibleChips,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [internalSearch, setInternalSearch] = useState('')
  const [menuStyle, setMenuStyle] = useState({})
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useRef(null)
  const contentRef = useRef(null)
  const triggerRef = useRef(null)
  const searchInputRef = useRef(null)
  const isMobile = useIsMobile()

  const open = isOpen !== undefined ? isOpen : internalOpen
  const query = onSearchChange ? (searchValue || '') : internalSearch
  const categoryMod = { mods: [category] }

  const selectedKeys = useMemo(
    () => new Set((selected || []).map((item) => getOptionKey(item))),
    [selected],
  )

  const visibleChips = (selected || []).slice(0, maxVisibleChips)
  const hiddenCount = Math.max((selected || []).length - visibleChips.length, 0)

  const setOpen = useCallback((next) => {
    if (disabled) {
      return
    }
    if (isOpen === undefined) {
      setInternalOpen(next)
    }
    if (onOpenChange) {
      onOpenChange(next)
    }
  }, [disabled, isOpen, onOpenChange])

  const updateMenuPosition = useCallback(() => {
    if (!ref.current || isMobile) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom - 8
    const spaceAbove = rect.top - 8
    const openUp = spaceBelow < 260 && spaceAbove > spaceBelow
    const maxHeight = Math.max(160, Math.min(360, openUp ? spaceAbove : spaceBelow))
    setMenuStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      top: openUp ? undefined : rect.bottom + 4,
      bottom: openUp ? window.innerHeight - rect.top + 4 : undefined,
      maxHeight,
      zIndex: 1400,
    })
  }, [isMobile])

  const toggleOption = useCallback((option) => {
    if (option.disabled) {
      return
    }
    const key = getOptionKey(option)
    const exists = selectedKeys.has(key)
    const next = exists
      ? (selected || []).filter((item) => getOptionKey(item) !== key)
      : [...(selected || []), option]
    onChange(next)
    if (closeOnSelect) {
      setOpen(false)
    }
  }, [closeOnSelect, onChange, selected, selectedKeys, setOpen])

  useEffect(() => {
    if (!open) {
      return undefined
    }
    updateMenuPosition()
    setActiveIndex(-1)
    const timer = setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, 0)
    const handle = () => updateMenuPosition()
    window.addEventListener('resize', handle)
    window.addEventListener('scroll', handle, true)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handle)
      window.removeEventListener('scroll', handle, true)
    }
  }, [open, updateMenuPosition, (options || []).length, loading])

  useEffect(() => {
    if (!open) {
      return undefined
    }
    const handleClick = (e) => {
      if (ref.current?.contains(e.target) || contentRef.current?.contains(e.target)) {
        return
      }
      setOpen(false)
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus?.()
        return
      }
      const opts = options || []
      if (!opts.length) {
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault(); setActiveIndex((i) => (i + 1) % opts.length)
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault(); setActiveIndex((i) => (i <= 0 ? opts.length - 1 : i - 1))
      }
      if (e.key === 'Enter' && activeIndex >= 0 && opts[activeIndex]) {
        e.preventDefault()
        toggleOption(opts[activeIndex])
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, setOpen, options, activeIndex, toggleOption])

  const handleSearch = (e) => {
    const { value } = e.target
    if (onSearchChange) {
      onSearchChange(value); return
    }
    setInternalSearch(value)
  }

  const removeSelected = (option) => {
    const key = getOptionKey(option)
    onChange((selected || []).filter((item) => getOptionKey(item) !== key))
  }

  const triggerLabel = (selected || []).length ? `${selected.length} selected` : placeholder

  const content = open ? (
    <>
      {isMobile ? <div className={classNames({ blk, elt: 'overlay' })} onMouseDown={() => setOpen(false)} role="presentation" /> : null}
      <div
        ref={contentRef}
        style={isMobile ? undefined : menuStyle}
        className={classNames({ blk, elt: 'content', mods: [category, open && 'show', isMobile && 'mobile'] })}
        role="listbox"
        aria-multiselectable="true"
      >
        {isMobile ? <div className={classNames({ blk, elt: 'sheet-handle' })} /> : null}
        {isMobile && label ? <div className={classNames({ blk, elt: 'sheet-title', ...categoryMod })}>{label}</div> : null}
        <div className={classNames({ blk, elt: 'search-wrap' })}>
          <input
            ref={searchInputRef}
            className={classNames({ blk, elt: 'search', ...categoryMod })}
            value={query}
            onChange={handleSearch}
            placeholder="Search..."
            aria-label={label || 'Search options'}
          />
        </div>
        <div className={classNames({ blk, elt: 'meta' })}>
          <span>
            {(selected || []).length}
            {' '}
            selected
          </span>
          {(selected || []).length ? (
            <button
              type="button"
              className={classNames({ blk, elt: 'clear' })}
              onMouseDown={(e) => {
                e.preventDefault(); onChange([])
              }}
            >
              Clear
            </button>
          ) : null}
        </div>
        <div className={classNames({ blk, elt: 'options' })}>
          {loading ? <div className={classNames({ blk, elt: 'status', ...categoryMod })}>Loading...</div> : null}
          {!loading && !(options || []).length ? (
            <div className={classNames({ blk, elt: 'status', ...categoryMod })}>{emptyText}</div>
          ) : null}
          {!loading && (options || []).map((option, index) => {
            const key = getOptionKey(option)
            const isSelected = selectedKeys.has(key)
            return (
              <button
                type="button"
                key={key}
                className={classNames({
                  blk, elt: 'option', mods: [category, isSelected && 'selected', option.disabled && 'disabled', index === activeIndex && 'active'],
                })}
                onMouseDown={(e) => {
                  e.preventDefault(); toggleOption(option)
                }}
                onMouseEnter={() => setActiveIndex(index)}
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled}
              >
                <span className={classNames({ blk, elt: 'checkbox', mods: [isSelected && 'checked'] })} aria-hidden="true" />
                <span className={classNames({ blk, elt: 'option-text' })}>
                  {renderOption ? renderOption(option, { selected: isSelected }) : (
                    <>
                      <span className={classNames({ blk, elt: 'option-label' })}>{getOptionLabel(option)}</span>
                      {getOptionSubLabel(option) ? <span className={classNames({ blk, elt: 'option-sub' })}>{getOptionSubLabel(option)}</span> : null}
                    </>
                  )}
                </span>
              </button>
            )
          })}
        </div>
        <div className={classNames({ blk, elt: 'footer' })}>
          <button
            type="button"
            className={classNames({ blk, elt: 'done' })}
            onMouseDown={(e) => {
              e.preventDefault(); setOpen(false); triggerRef.current?.focus?.()
            }}
          >
            Done
          </button>
        </div>
      </div>
    </>
  ) : null

  return (
    <div
      ref={ref}
      className={classNames({
        blk, className, ...categoryMod, mods: [category, disabled && 'disabled'],
      })}
    >
      {label ? <div className={classNames({ blk, elt: 'label', ...categoryMod })}>{label}</div> : null}
      <button
        ref={triggerRef}
        type="button"
        className={classNames({ blk, elt: 'trigger', ...categoryMod })}
        onClick={() => setOpen(!open)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={classNames({ blk, elt: 'trigger-label', mods: [!(selected || []).length && 'placeholder'] })}>{triggerLabel}</span>
        <span className={classNames({ blk, elt: 'caret', mods: [open && 'open'] })} />
      </button>
      {(selected || []).length > 0 ? (
        <div className={classNames({ blk, elt: 'chips' })}>
          {visibleChips.map((item) => (
            <span key={getOptionKey(item)} className={classNames({ blk, elt: 'chip', ...categoryMod })}>
              <span className={classNames({ blk, elt: 'chip-label' })}>{getOptionLabel(item)}</span>
              <button
                type="button"
                className={classNames({ blk, elt: 'chip-remove' })}
                onClick={() => removeSelected(item)}
                aria-label={`Remove ${getOptionLabel(item)}`}
              >
                ×
              </button>
            </span>
          ))}
          {hiddenCount > 0 ? (
            <span className={classNames({ blk, elt: 'chip', mods: [category, 'count'] })}>
              +
              {hiddenCount}
            </span>
          ) : null}
        </div>
      ) : null}
      {open && typeof document !== 'undefined' ? createPortal(content, document.body) : null}
    </div>
  )
}

MultiSelectDropDown.propTypes = {
  category: oneOf(['dark', 'light']),
  className: string,
  label: string,
  options: arrayOf(shape({})),
  selected: arrayOf(shape({})),
  onChange: func.isRequired,
  onSearchChange: func,
  searchValue: string,
  placeholder: string,
  emptyText: string,
  loading: bool,
  disabled: bool,
  isOpen: bool,
  onOpenChange: func,
  closeOnSelect: bool,
  renderOption: func,
  maxVisibleChips: Number,
}

MultiSelectDropDown.defaultProps = {
  category: 'dark',
  className: '',
  label: '',
  options: [],
  selected: [],
  onSearchChange: null,
  searchValue: '',
  placeholder: 'Select options',
  emptyText: 'No options found',
  loading: false,
  disabled: false,
  isOpen: undefined,
  onOpenChange: null,
  closeOnSelect: false,
  renderOption: null,
  maxVisibleChips: 4,
}

export default memo(MultiSelectDropDown)
