import React from 'react'
import {
  func, arrayOf, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import AddLinkModal from '@local/add-link-modal'
import { addLink, setSelectedCategory } from '@state/actions/links'
import { setAppBanner } from '@state/actions/app'
import { userLinkCategories } from '@state/selectors/user'

const LinksAddLinkModal = ({
  toggleAddLinkModal, addLinkAction, setAppBannerAction, allCategories, setSelectedCategoryAction,
}) => {
  const handleSubmit = async (linkMeta) => {
    const { success, data } = await addLinkAction(linkMeta)
    if (success) {
      setAppBannerAction({ type: 'info', message: 'Link Added succesfully in your cosmos' })
      setSelectedCategoryAction(data.categoryId)
      return { success: true }
    }
    return { success: false }
  }

  return (
    <AddLinkModal
      onClose={toggleAddLinkModal}
      onSubmit={handleSubmit}
      categories={allCategories}
    />
  )
}

LinksAddLinkModal.propTypes = {
  toggleAddLinkModal: func.isRequired,
  addLinkAction: func.isRequired,
  setAppBannerAction: func.isRequired,
  setSelectedCategoryAction: func.isRequired,
  allCategories: arrayOf(shape({ key: string, value: string })),
}

LinksAddLinkModal.defaultProps = {
  allCategories: [],
}

const mapStateToProps = (state) => ({
  allCategories: userLinkCategories(state).map(({ name, id }) => ({ value: name, key: id })),
})

export default connect(mapStateToProps, {
  addLinkAction: addLink,
  setAppBannerAction: setAppBanner,
  setSelectedCategoryAction: setSelectedCategory,
})(LinksAddLinkModal)
