import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, shape, string } from 'prop-types'

import { Tabs } from '@common'

import { mapStateToProps } from './index.connect'

const LinkTypes = ({ allCategories }) => (
  <Tabs
    direction="vertical"
    tabs={allCategories}
    defaultSelected={(allCategories[0] || {}).key}
  />
)

LinkTypes.propTypes = {
  allCategories: arrayOf(shape({
    label: string,
    key: string,
  })),
}

LinkTypes.defaultProps = {
  allCategories: [],
}

const LinkTypesWithConnect = connect(
  mapStateToProps,
)(LinkTypes)

export default LinkTypesWithConnect
