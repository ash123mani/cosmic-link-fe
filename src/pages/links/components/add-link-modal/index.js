import React, { useState } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'

import { Modal, Input } from '@common'
import { classNames } from '@common/helpers'

import ActionButtons from './action-buttons'
import LinkMeta from './link-meta'
import { actions } from './index.connect'

const blk = 'add-link-modal'

const AddLinkModal = ({ toggleAddLinkModal, getLinkMeta }) => {
  const [url, setUrl] = useState('')
  const [isFetchingMeta, setIsFetchingMeta] = useState(false)
  const [isFetchedMeta, setIsFetchedMeta] = useState(false)
  const [meta, setMeta] = useState({})

  const handleChange = ({ target: { value } }) => {
    setUrl(value)
  }

  const handleSubmit = async () => {
    setIsFetchingMeta(true)
    const { data, success } = await getLinkMeta(url)

    setIsFetchingMeta(false)
    setIsFetchedMeta(true)
    if (success) {
      setMeta(data.meta)
    }
  }

  return (
    <Modal.Wrapper className={classNames({ blk })}>
      <Modal.Header closeAble={false}>
        Link Details
      </Modal.Header>
      <Modal.Content>
        {
          !isFetchedMeta
            ? <LinkMeta meta={meta} />
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
        />
      </Modal.Content>
    </Modal.Wrapper>
  )
}

AddLinkModal.propTypes = {
  toggleAddLinkModal: func.isRequired,
  getLinkMeta: func.isRequired,
}

const AddLinkModalWithConnect = connect(
  null, actions,
)(AddLinkModal)

export default AddLinkModalWithConnect
