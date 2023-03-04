import React from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, shape, string, func,
} from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import { Tabs } from '@common'
import { classNames } from '@common/helpers'
import mediaQueries from '@common/media-queries'

import { mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'link-types'

const LinkTypes = ({
  allCategories, handleTabChange, selectedCategory,
}) => {
  const isMediumDown = useMediaQuery(mediaQueries.mediumDown)
  return (
    <Tabs
      direction={isMediumDown ? 'horizontal' : 'vertical'}
      tabs={allCategories}
      defaultSelected={selectedCategory}
      className={classNames({ blk })}
      handleTabChange={handleTabChange}
    />
  )
}

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
