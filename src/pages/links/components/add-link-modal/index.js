import React, { useState } from 'react'
import {
  func, string, arrayOf, shape,
} from 'prop-types'
import { connect } from 'react-redux'

import { Modal, Input } from '@common'
import { classNames } from '@common/helpers'

import ConfirmationButtons from '@local/confirmation-buttons'

import LinkMeta from './link-meta'
import { actions, mapStateToProps } from './index.connect'
import './_style.scss'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
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

  const handleEnterClick = (event) => {
    if (event.which === 13) {
      if (!event.repeat) {
        const newEvent = new Event('submit', { cancelable: true })
        event.target.form.dispatchEvent(newEvent)
      }

      handleSubmit(event)
    }
  }

  return (
    <Modal.Wrapper className={classNames({ blk })}>
      <Modal.Header closeAble={false}>
        Link Details
      </Modal.Header>
      <Modal.Content>
        <form onSubmit={handleSubmit}>
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
                  autoFocus
                  placeholder="https://www.zachgollwitzer.com/posts/react-forms-best-practices"
                  category="light"
                  label="Url to save"
                  as="textarea"
                  rows="4"
                  onChange={handleChange}
                  name="url"
                  className={classNames(
                    { blk, elt: 'link-url' },
                  )}
                  onKeyPress={handleEnterClick}
                />
              )
          }
          <ConfirmationButtons
            handleCancel={toggleAddLinkModal}
            isSubmitting={isFetchingMeta}
            isFetchedMeta={isFetchedMeta}
            confirmText={isFetchedMeta ? 'Add this Link' : 'Get Link Meta'}
            submitButtonType="submit"
          />
        </form>

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
