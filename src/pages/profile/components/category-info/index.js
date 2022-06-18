import React from 'react'
import { arrayOf, string, shape } from 'prop-types'

import { Button } from '@common'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'category-info'

const CategoryInfo = ({ categories }) => (
  <div className={classNames({ blk })}>
    <h2 className={classNames({ blk, elt: 'section-heading' })}>
      Category Info
    </h2>
    <div>
      {categories.map((category) => {
        const { name, id } = category
        return (
          <Button
            className={classNames(
              { blk, elt: 'category' },
            )}
            id={id}
            category="plain"
            disabled
          >
            {name}
          </Button>
        )
      })}
    </div>
  </div>
)

CategoryInfo.propTypes = {
  categories: arrayOf(shape({
    name: string.isRequired,
    id: string.isRequired,
  })),
}

CategoryInfo.defaultProps = {
  categories: [],
}

export default CategoryInfo
