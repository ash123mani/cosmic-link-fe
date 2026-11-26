import React, { memo } from 'react'
import {
  shape, string, arrayOf, func,
} from 'prop-types'

import { Input, DropDown } from '@common'

const LinkMeta = ({
  meta, categories, handleCategoryChange, handleMetaChange,
}) => {
  const { title, description } = meta
  const selectedCategory = categories.find((c) => c.key === meta.category?.id) || categories[categories.length - 1]

  return (
    <div>
      <Input
        autoFocus
        placeholder="Title"
        category="light"
        label="Title"
        as="textarea"
        rows="2"
        name="title"
        value={title || ''}
        onChange={handleMetaChange}
      />
      <Input
        placeholder="Description"
        category="light"
        label="Description"
        as="textarea"
        rows="5"
        name="description"
        value={description || ''}
        onChange={handleMetaChange}
      />
      {categories.length > 0 && (
        <DropDown
          category="light"
          list={categories}
          label="Category for your link"
          handleChange={handleCategoryChange}
          defaultSelected={selectedCategory}
          searchable={categories.length > 7}
          searchPlaceholder="Search categories"
        />
      )}
    </div>
  )
}

LinkMeta.propTypes = {
  meta: shape({
    title: string,
    description: string,
    category: shape({ id: string, name: string }),
  }),
  categories: arrayOf(shape({ value: string, key: string })),
  handleCategoryChange: func.isRequired,
  handleMetaChange: func.isRequired,
}

LinkMeta.defaultProps = {
  meta: {},
  categories: [],
}

export default memo(LinkMeta)
