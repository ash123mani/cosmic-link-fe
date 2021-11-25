import React from 'react'
import { shape, string, arrayOf } from 'prop-types'
import { connect } from 'react-redux'

import { Input, DropDown } from '@common'

import { mapStateToProps } from './index.connect'

const LinkMeta = ({ meta, allCategories }) => {
  const { title, description } = meta

  return (
    <div>
      <Input
        placeholder="Title"
        category="light"
        label="Title"
        as="textarea"
        rows="2"
        name="title"
        value={title}
      />
      <Input
        placeholder="Description"
        category="light"
        label="Description"
        as="textarea"
        rows="3"
        name="description"
        value={description}
      />
      <DropDown
        category="light"
        list={allCategories}
      />
    </div>
  )
}

LinkMeta.propTypes = {
  meta: shape({
    siteName: string,
    title: string,
    description: string,
    url: string,
    imageUrl: string,
  }),
  allCategories: arrayOf(shape({
    value: string,
    key: string,
  })),
}

LinkMeta.defaultProps = {
  meta: {},
  allCategories: [],
}

const LinkMetaWithConnect = connect(mapStateToProps)(LinkMeta)

export default LinkMetaWithConnect
