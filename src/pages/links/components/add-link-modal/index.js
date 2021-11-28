import React, { useState } from 'react'
import {
  func, string, arrayOf, shape,
} from 'prop-types'
import { connect } from 'react-redux'

import { Modal, Input } from '@common'
import { classNames } from '@common/helpers'

import ActionButtons from './action-buttons'
import LinkMeta from './link-meta'
import { actions, mapStateToProps } from './index.connect'

const blk = 'add-link-modal'

const AddLinkModal = ({
  toggleAddLinkModal, getLinkMeta, addLink, setAppBanner, allCategories, setSelectedCategory,
}) => {
  const defaultCategory = allCategories[allCategories.length - 1]

  const [linkUrl, setLinkUrl] = useState('')
  const [isFetchingMeta, setIsFetchingMeta] = useState(false)
  const [isFetchedMeta, setIsFetchedMeta] = useState(false)
  const [linkMeta, setLinkMeta] = useState({
    title: '',
    description: '',
    linkUrl: '',
    category: {
      name: defaultCategory.value,
      id: defaultCategory.key,
    },
    imageUrl: '',
    siteName: '',
  })

  const handleChange = ({ target: { value } }) => {
    setLinkUrl(value)
  }

  const getMetaData = async () => {
    setIsFetchingMeta(true)
    const { data, success } = await getLinkMeta(linkUrl)

    setIsFetchingMeta(false)

    if (success) {
      setIsFetchedMeta(true)
      setLinkMeta({
        ...linkMeta,
        ...data.meta,
      })
    }
  }

  const addLinkToCollection = async (linkMeta) => {
    setIsFetchingMeta(true)

    const { success, data } = await addLink(linkMeta)
    if (success) {
      setAppBanner({
        type: 'info',
        message: 'Link Added succesfully in your cosmos',
      })
      setSelectedCategory(data.categoryId)
      toggleAddLinkModal()
    }

    setIsFetchingMeta(false)
  }

  const handleSubmit = async () => {
    if (!isFetchedMeta) {
      getMetaData()
    } else {
      addLinkToCollection(linkMeta)
    }
  }

  const handleCategoryChange = ({ key, value }) => {
    setLinkMeta({
      ...linkMeta,
      category: {
        id: key,
        name: value,
      },
    })
  }

  const handleMetaChange = ({ target: { name, value } }) => {
    setLinkMeta({
      ...linkMeta,
      [name]: value,
    })
  }

  return (
    <Modal.Wrapper className={classNames({ blk })}>
      <Modal.Header closeAble={false}>
        Link Details
      </Modal.Header>
      <Modal.Content>
        {
          isFetchedMeta
            ? (
              <LinkMeta
                meta={linkMeta}
                handleCategoryChange={handleCategoryChange}
                handleMetaChange={handleMetaChange}
                allCategories={allCategories}
              />
            )
            : (
              <Input
                placeholder="Href"
                category="light"
                label="Link Url"
                as="textarea"
                rows="2"
                onChange={handleChange}
                name="url"
              />
            )
        }
        <ActionButtons
          handleCancel={toggleAddLinkModal}
          handleSubmit={handleSubmit}
          isLoading={isFetchingMeta}
          isFetchedMeta={isFetchedMeta}
        />
      </Modal.Content>
    </Modal.Wrapper>
  )
}

AddLinkModal.propTypes = {
  toggleAddLinkModal: func.isRequired,
  getLinkMeta: func.isRequired,
  addLink: func.isRequired,
  setAppBanner: func.isRequired,
  allCategories: arrayOf(shape({
    value: string,
    key: string,
  })),
  setSelectedCategory: func.isRequired,
}

AddLinkModal.defaultProps = {
  allCategories: [],
}

const AddLinkModalWithConnect = connect(
  mapStateToProps, actions,
)(AddLinkModal)

export default AddLinkModalWithConnect
