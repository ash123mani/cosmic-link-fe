import React from 'react'
import { shape, string } from 'prop-types'

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
        name="username"
        label="Your Name"
        value={username || ''}
        readOnly
      />
      <Input
        name="email"
        label="Your Email"
        value={email || ''}
        readOnly
      />
      <Input
        name="password"
        label="Your Password"
        value="Managed securely. Use reset password to change it."
        readOnly
        disabled
      />
    </div>
  )
}

UserInfo.propTypes = {
  user: shape({
    username: string,
    email: string,
  }),
}

UserInfo.defaultProps = {
  user: {},
}

export default UserInfo
