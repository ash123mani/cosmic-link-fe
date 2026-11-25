import React from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, bool, func, number, shape, string,
} from 'prop-types'

import CategoryPicker from '../category-picker'
import { mapStateToProps } from './index.connect'

const LinkTypes = ({ categories, handleTabChange, isLoading }) => (
  <CategoryPicker
    categories={categories}
    onSelect={handleTabChange}
    isLoading={isLoading}
  />
)

LinkTypes.propTypes = {
  categories: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired,
    isShared: bool,
    isActive: bool,
    count: number,
  })),
  handleTabChange: func.isRequired,
  isLoading: bool,
}

LinkTypes.defaultProps = {
  categories: [],
  isLoading: false,
}

const LinkTypesWithConnect = connect(mapStateToProps)(LinkTypes)

export default LinkTypesWithConnect
