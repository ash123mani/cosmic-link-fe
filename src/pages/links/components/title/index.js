import React from 'react'
import { func } from 'prop-types'

import { Button } from '@common'
import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'links-title'

const Title = ({ toggleAddLinkModal, toggleAddCategoryModal }) => (
  <div className={classNames({ blk })}>
    <div className={classNames({ blk, elt: 'title' })}>Link categories</div>
    <div>
      <Button category="vacant" onClick={toggleAddCategoryModal}>
        + Category
      </Button>
      <Button category="plain" onClick={toggleAddLinkModal}>
        + Link
      </Button>

    </div>

  </div>
)

Title.propTypes = {
  toggleAddLinkModal: func.isRequired,
  toggleAddCategoryModal: func.isRequired,
}

export default Title
