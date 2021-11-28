import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { func, string, bool } from 'prop-types'

import { classNames } from '@common/helpers'

import LinkTypes from '../components/link-types'
import Title from '../components/title'
import AddLinkModal from '../components/add-link-modal'
import LinksList from '../components/links-list'

import { actions, mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'links-page'

const Main = ({
  getLinks, setSelectedCategory, selectedCategory, isCategoryFetchedAlready,
}) => {
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)
  const [isFetchingLinks, setIsFetchingLinks] = useState(false)

  const toggleAddLinkModal = () => {
    setShowAddLinkModal(!showAddLinkModal)
  }

  const getCategotyLinks = async (category) => {
    setIsFetchingLinks(true)
    await getLinks(category)
    setIsFetchingLinks(false)
  }

  const handleTabChange = async (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    if (selectedCategory && !isCategoryFetchedAlready) {
      getCategotyLinks(selectedCategory)
    }
  }, [selectedCategory])

  return (
    <main className={classNames({ blk })}>
      <div className={classNames({ blk, elt: 'title-wrapper' })}>
        <Title toggleAddLinkModal={toggleAddLinkModal} />
      </div>

      <div className={classNames({ blk, elt: 'types-wrapper' })}>
        <LinkTypes handleTabChange={handleTabChange} />
        <LinksList isFetchingLinks={isFetchingLinks} />
      </div>

      {showAddLinkModal && (
        <AddLinkModal
          toggleAddLinkModal={toggleAddLinkModal}
        />
      ) }
    </main>
  )
}

Main.propTypes = {
  getLinks: func.isRequired,
  setSelectedCategory: func.isRequired,
  selectedCategory: string,
  isCategoryFetchedAlready: bool,
}

Main.defaultProps = {
  selectedCategory: '',
  isCategoryFetchedAlready: false,
}

const MainWithConnect = connect(
  mapStateToProps, actions,
)(Main)

export default MainWithConnect
