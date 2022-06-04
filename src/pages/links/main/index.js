import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  func, string, bool, arrayOf, shape,
} from 'prop-types'

import { classNames } from '@common/helpers'
import { Button } from '@common'

import AddCategoryModal from '@local/add-category-modal'
import LinkTypes from '../components/link-types'
import Title from '../components/title'
import AddLinkModal from '../components/add-link-modal'
import LinksList from '../components/links-list'
import EmptyMessage from '../components/empty-message'

import { actions, mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'links-page'

const Main = ({
  getLinks, setSelectedCategory, selectedCategory, isCategoryFetchedAlready, categoryLinks,
}) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)
  const [isFetchingLinks, setIsFetchingLinks] = useState(false)

  const toggleAddLinkModal = () => {
    setShowAddLinkModal(!showAddLinkModal)
  }

  const toggleAddCategoryModal = () => {
    setShowAddCategoryModal(!showAddCategoryModal)
  }

  const getCategotyLinks = async (category) => {
    setIsFetchingLinks(true)
    await getLinks(category)
    setIsFetchingLinks(false)
  }

  const handleTabChange = (category) => {
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
        <Title
          toggleAddLinkModal={toggleAddLinkModal}
          toggleAddCategoryModal={toggleAddCategoryModal}
        />
      </div>

      <div className={classNames({ blk, elt: 'types-wrapper' })}>
        <LinkTypes
          handleTabChange={handleTabChange}
        />
        {
          categoryLinks.length ? (
            <LinksList
              isFetchingLinks={isFetchingLinks}
              categoryLinks={categoryLinks}
            />
          ) : (
            <div className={classNames({ blk, elt: 'empty-message-wrapper' })}>
              <EmptyMessage />
              <Button
                category="plain"
                onClick={toggleAddLinkModal}
                className={classNames({ blk, elt: 'add-link-button' })}
              >
                + Add a Link
              </Button>
            </div>
          )
        }

      </div>

      {showAddLinkModal && (
        <AddLinkModal
          toggleAddLinkModal={toggleAddLinkModal}
        />
      )}

      {showAddCategoryModal && (
        <AddCategoryModal
          toggleAddCategoryModal={toggleAddCategoryModal}
          handleCancel={toggleAddCategoryModal}
        />
      )}
    </main>
  )
}

Main.propTypes = {
  getLinks: func.isRequired,
  setSelectedCategory: func.isRequired,
  selectedCategory: string,
  isCategoryFetchedAlready: bool,
  categoryLinks: arrayOf(shape({
    title: string,
    description: string,
    siteName: string,
    imageUrl: string,
    category: shape({
      id: string,
      name: string,
    }),
    linkUrl: string,
  })),
}

Main.defaultProps = {
  selectedCategory: '',
  isCategoryFetchedAlready: false,
  categoryLinks: [],
}

const MainWithConnect = connect(
  mapStateToProps, actions,
)(Main)

export default MainWithConnect
