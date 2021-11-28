import React, { memo } from 'react'
import {
  shape, string, arrayOf, func,
} from 'prop-types'

import { Input, DropDown } from '@common'

const LinkMeta = ({
  meta, allCategories, handleCategoryChange, handleMetaChange,
}) => {
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
        onChange={handleMetaChange}
      />
      <Input
        placeholder="Description"
        category="light"
        label="Description"
        as="textarea"
        rows="5"
        name="description"
        value={description}
        onChange={handleMetaChange}
      />
      <DropDown
        category="light"
        list={allCategories}
        label="Category for you link"
        handleChange={handleCategoryChange}
        defaultSelected={allCategories[allCategories.length - 1]}
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
  handleCategoryChange: func.isRequired,
  handleMetaChange: func.isRequired,
}

LinkMeta.defaultProps = {
  meta: {},
  allCategories: [],
}

export default memo(LinkMeta)
