import React from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, shape, string, func,
} from 'prop-types'

import { Tabs } from '@common'
import { classNames } from '@common/helpers'

import { mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'link-types'

const LinkTypes = ({
  allCategories, handleTabChange, selectedCategory,
}) => (
  <Tabs
    direction="vertical"
    tabs={allCategories}
    defaultSelected={selectedCategory}
    className={classNames({ blk })}
    handleTabChange={handleTabChange}
  />
)

LinkTypes.propTypes = {
  allCategories: arrayOf(shape({
    label: string,
    key: string,
  })),
  handleTabChange: func.isRequired,
  selectedCategory: string,
}

LinkTypes.defaultProps = {
  allCategories: [],
  selectedCategory: '',
}

const LinkTypesWithConnect = connect(
  mapStateToProps,
)(LinkTypes)

export default LinkTypesWithConnect
