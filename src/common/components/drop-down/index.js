/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {
  useState, memo, useRef, useEffect, useCallback, useMemo,
} from 'react'
import {
  oneOf, string, shape, arrayOf, func, bool, node,
} from 'prop-types'
import { createPortal } from 'react-dom'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-dropdown'
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
  searchable,
  searchPlaceholder,
  searchValue,
  onSearchChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [selected, setSelected] = useState(defaultSelected)
  const [menuStyle, setMenuStyle] = useState({})
  const [activeIndex, setActiveIndex] = useState(-1)
  const [internalSearch, setInternalSearch] = useState('')
  const ref = useRef(null)
  const contentRef = useRef(null)
  const triggerRef = useRef(null)
  const searchInputRef = useRef(null)
  const isMobile = useIsMobile()

  const showDropDown = isOpen !== undefined ? isOpen : internalOpen
  const query = onSearchChange ? (searchValue || '') : internalSearch

  const setOpen = useCallback((next) => {
    if (isOpen === undefined) {
      setInternalOpen(next)
    }
    if (onOpenChange) {
      onOpenChange(next)
    }
  }, [isOpen, onOpenChange])

  const visibleList = useMemo(() => {
    if (!searchable || onSearchChange || !query.trim()) {
      return list || []
    }
    const q = query.trim().toLowerCase()
    return (list || []).filter((item) => {
      const text = `${item.value || item.label || ''} ${item.subLabel || item.email || ''}`.toLowerCase()
      return text.includes(q)
    })
  }, [list, searchable, query, onSearchChange])

  const updateMenuPosition = useCallback(() => {
    if (!ref.current || isMobile) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom - 8
    const spaceAbove = rect.top - 8
    const openUp = spaceBelow < 220 && spaceAbove > spaceBelow
    const maxHeight = Math.max(140, Math.min(320, openUp ? spaceAbove : spaceBelow))
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

  const handleSelectedItemChange = useCallback((item) => {
    setSelected(item)
    handleChange(item)
    if (closeOnSelect) {
      setOpen(false)
      triggerRef.current?.focus?.()
    }
  }, [closeOnSelect, handleChange, setOpen])

  useEffect(() => {
    if (!showDropDown) {
      return undefined
    }
    updateMenuPosition()
    setActiveIndex(-1)
    const handle = () => updateMenuPosition()
    window.addEventListener('resize', handle)
    window.addEventListener('scroll', handle, true)
    return () => {
      window.removeEventListener('resize', handle)
      window.removeEventListener('scroll', handle, true)
    }
  }, [showDropDown, updateMenuPosition, visibleList.length, loading])

  useEffect(() => {
    if (!showDropDown) {
      return undefined
    }
    const timer = setTimeout(() => {
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, 0)
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
      if (!visibleList.length) {
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % visibleList.length)
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i <= 0 ? visibleList.length - 1 : i - 1))
      }
      if (e.key === 'Enter' && activeIndex >= 0 && visibleList[activeIndex]) {
        e.preventDefault()
        handleSelectedItemChange(visibleList[activeIndex])
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [showDropDown, setOpen, visibleList, activeIndex, searchable, handleSelectedItemChange])

  useEffect(() => {
    setSelected(defaultSelected)
  }, [defaultSelected])

  if (!loading && !(list || []).length && !emptyText && !searchable) {
    return null
  }

  const categoryMod = { mods: [category] }
  const eltClassName = classNames({ blk, className, ...categoryMod })
  const resolvedSelectedLabel = selectedLabel !== undefined
    ? selectedLabel
    : ((selected && (selected.value || selected.label)) || 'Select')

  const handleDropDownClick = () => setOpen(!showDropDown)
  const onSearchInputChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value)
    } else {
      setInternalSearch(e.target.value)
    }
  }

  const content = showDropDown ? (
    <>
      {isMobile ? <div className={classNames({ blk, elt: 'overlay' })} onMouseDown={() => setOpen(false)} role="presentation" /> : null}
      <div
        ref={contentRef}
        style={isMobile ? undefined : menuStyle}
        className={classNames({
          blk, elt: 'content', mods: [category, showDropDown && 'show', isMobile && 'mobile'],
        })}
        role="listbox"
      >
        {isMobile ? <div className={classNames({ blk, elt: 'sheet-handle' })} /> : null}
        {isMobile && label ? <div className={classNames({ blk, elt: 'sheet-title', ...categoryMod })}>{label}</div> : null}
        {searchable ? (
          <div className={classNames({ blk, elt: 'search-wrap' })}>
            <input
              ref={searchInputRef}
              className={classNames({ blk, elt: 'search', ...categoryMod })}
              value={query}
              onChange={onSearchInputChange}
              placeholder={searchPlaceholder || 'Search...'}
              aria-label={label || 'Search options'}
            />
          </div>
        ) : null}
        {loading && <div className={classNames({ blk, elt: 'status', ...categoryMod })}>Loading...</div>}
        {!loading && !visibleList.length && emptyText ? (
          <div className={classNames({ blk, elt: 'status', ...categoryMod })}>{emptyText}</div>
        ) : null}
        {!loading && visibleList.map((item, index) => {
          const itemKey = item.key || item.id
          const isSelected = String((selected && (selected.key || selected.id)) || '') === String(itemKey || '')
          return (
            <div
              className={classNames({
                blk, elt: 'item', mods: [category, index === activeIndex && 'active', isSelected && 'selected'],
              })}
              key={itemKey}
              onMouseDown={(e) => {
                e.preventDefault(); handleSelectedItemChange(item)
              }}
              onMouseEnter={() => setActiveIndex(index)}
              role="option"
              aria-selected={isSelected}
              tabIndex={-1}
            >
              {renderItem ? renderItem(item) : (
                <>
                  <span className={classNames({ blk, elt: 'item-label' })}>{item.value || item.label}</span>
                  {(item.subLabel || item.email) ? (
                    <span className={classNames({ blk, elt: 'item-sub' })}>{item.subLabel || item.email}</span>
                  ) : null}
                </>
              )}
            </div>
          )
        })}
      </div>
    </>
  ) : null

  return (
    <div className={eltClassName} ref={ref}>
      {label ? <div className={classNames({ blk, elt: 'label', ...categoryMod })}>{label}</div> : null}
      <div
        ref={triggerRef}
        className={classNames({ blk, elt: 'selected', mods: [category, showDropDown && 'open'] })}
        onClick={handleDropDownClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault()
            if (!showDropDown) {
              setOpen(true)
            } else if (e.key !== 'ArrowDown') {
              handleDropDownClick()
            }
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={!!showDropDown}
      >
        {resolvedSelectedLabel}
      </div>
      {showDropDown && typeof document !== 'undefined' ? createPortal(content, document.body) : null}
    </div>
  )
}

DropDown.propTypes = {
  category: oneOf(['dark', 'light']),
  className: string,
  defaultSelected: shape({ key: string, value: string }),
  list: arrayOf(shape({
    value: string, key: string, id: string, label: string, subLabel: string, email: string,
  })),
  label: string,
  handleChange: func.isRequired,
  renderItem: func,
  isOpen: oneOf([true, false, undefined]),
  onOpenChange: func,
  emptyText: string,
  loading: oneOf([true, false]),
  selectedLabel: node,
  closeOnSelect: oneOf([true, false]),
  searchable: bool,
  searchPlaceholder: string,
  searchValue: string,
  onSearchChange: func,
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
  searchable: false,
  searchPlaceholder: 'Search...',
  searchValue: '',
  onSearchChange: null,
}

export default memo(DropDown)
