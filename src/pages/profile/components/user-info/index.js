import React from 'react'
import { shape, arrayOf, string } from 'prop-types'

import { Input } from '@common'
import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'user-info'

const UserInfo = ({ user }) => {
  const { username, email } = user
  return (
    <div className={classNames({ blk })}>
      <h2 className={classNames({ blk, elt: 'section-heading' })}>Your Info</h2>
      <Input
        label="Your Name"
        value={username}
        disabled
      />
      <Input
        label="Your Email"
        value={email}
        disabled
      />
      <Input
        label="Your Password"
        value="It'a screte for you to remember 😛. You can reset it."
        disabled
      />
    </div>
  )
}

UserInfo.propTypes = {
  user: shape({
    name: string,
    email: string,
    categories: arrayOf(shape({
      name: string,
      id: string,
    })),
  }),
}

UserInfo.defaultProps = {
  user: {},
}

export default UserInfo
