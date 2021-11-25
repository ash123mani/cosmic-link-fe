import React from 'react'
import { func } from 'prop-types'

import { Button } from '@common'
import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'links-title'

const Title = ({ toggleAddLinkModal }) => (
  <div className={classNames({ blk })}>
    <div className={classNames({ blk, elt: 'title' })}>Link categories</div>
    <Button category="plain" onClick={toggleAddLinkModal}>
      + Add a Link
    </Button>
  </div>
)

Title.propTypes = {
  toggleAddLinkModal: func.isRequired,
}

export default Title
