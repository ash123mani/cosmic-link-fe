import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, bool, func, number, shape, string,
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
  getLinks, setSelectedCategory, selectedCategory, isCategoryFetchedAlready, categoryLinks, categories, selectedCategoryCount,
}) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)
  const [isFetchingLinks, setIsFetchingLinks] = useState(false)

  const toggleAddLinkModal = () => setShowAddLinkModal((v) => !v)
  const toggleAddCategoryModal = () => setShowAddCategoryModal((v) => !v)

  const fetchCategoryLinks = useCallback(async (category) => {
    setIsFetchingLinks(true)
    await getLinks(category)
    setIsFetchingLinks(false)
  }, [getLinks])

  const handleTabChange = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    if (selectedCategory && !isCategoryFetchedAlready) {
      fetchCategoryLinks(selectedCategory)
    }
  }, [selectedCategory, isCategoryFetchedAlready, fetchCategoryLinks])

  const selectedCategoryName = useMemo(() => {
    const match = (categories || []).find((category) => category.id === selectedCategory)
    return match ? match.name : ''
  }, [categories, selectedCategory])

  const hasNoCategories = !categories.length
  const hasCount = typeof selectedCategoryCount === 'number'

  return (
    <main className={classNames({ blk })}>
      <Title
        toggleAddLinkModal={toggleAddLinkModal}
        toggleAddCategoryModal={toggleAddCategoryModal}
        selectedCategoryName={selectedCategoryName}
        selectedCategoryCount={selectedCategoryCount}
        isFetchingLinks={isFetchingLinks}
      />

      <div className={classNames({ blk, elt: 'types-wrapper' })}>
        <LinkTypes handleTabChange={handleTabChange} isLoading={isFetchingLinks} />

        <div className={classNames({ blk, elt: 'content' })}>
          {!hasNoCategories && selectedCategoryName && (
            <div className={classNames({ blk, elt: 'content-head' })}>
              <div>
                <p className={classNames({ blk, elt: 'content-label' })}>Showing</p>
                <h2 className={classNames({ blk, elt: 'content-title' })}>{selectedCategoryName}</h2>
              </div>
              {hasCount && !isFetchingLinks && (
                <span className={classNames({ blk, elt: 'content-count' })}>
                  {selectedCategoryCount}
                  {' '}
                  {selectedCategoryCount === 1 ? 'link' : 'links'}
                </span>
              )}
            </div>
          )}

          {categoryLinks.length ? (
            <LinksList
              isFetchingLinks={isFetchingLinks}
              categoryLinks={categoryLinks}
              categories={categories}
            />
          ) : (
            <div className={classNames({ blk, elt: 'empty-message-wrapper' })}>
              {isFetchingLinks ? (
                <LinksList isFetchingLinks categoryLinks={[]} categories={categories} />
              ) : (
                <>
                  <EmptyMessage hasNoCategories={hasNoCategories} />
                  <div className={classNames({ blk, elt: 'empty-actions' })}>
                    {hasNoCategories ? (
                      <Button category="filled" onClick={toggleAddCategoryModal} className={classNames({ blk, elt: 'add-link-button' })}>
                        Add category
                      </Button>
                    ) : (
                      <Button category="filled" onClick={toggleAddLinkModal} className={classNames({ blk, elt: 'add-link-button' })}>
                        Add link
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {showAddLinkModal && <AddLinkModal toggleAddLinkModal={toggleAddLinkModal} />}
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
    category: shape({ id: string, name: string }),
  })),
  categories: arrayOf(shape({ id: string, name: string })),
  selectedCategoryCount: number,
}

Main.defaultProps = {
  selectedCategory: '',
  isCategoryFetchedAlready: false,
  categoryLinks: [],
  categories: [],
  selectedCategoryCount: null,
}

export default connect(mapStateToProps, actions)(Main)
