import React, { useState } from 'react'

import { classNames } from '@common/helpers'

import LinkTypes from '../components/link-types'
import Title from '../components/title'
import AddLink from '../components/add-link'

import './_style.scss'

const blk = 'links-page'

const Main = () => {
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)

  const toggleAddLinkModal = () => {
    setShowAddLinkModal(!showAddLinkModal)
  }

  return (
    <div className={classNames({ blk })}>
      <div className={classNames({ blk, elt: 'title-wrapper' })}>
        <Title toggleAddLinkModal={toggleAddLinkModal} />
      </div>
      <div className={classNames({ blk, elt: 'types-wrapper' })}>
        <LinkTypes />
      </div>
      {showAddLinkModal && <AddLink toggleAddLinkModal={toggleAddLinkModal} /> }
    </div>
  )
}

export default Main
