import React from 'react'

import { Input, Button } from '@common'
import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'login-form'

const LoginForm = () => (
  <form className={classNames({ blk })}>
    <Input
      className={classNames({ blk, elt: 'email' })}
      placeholder="Email for your cosmos"
      label="Email"
    />
    <Input
      className={classNames({ blk, elt: 'password' })}
      type="password"
      placeholder="Password for your cosmos"
      label="Password"
    />
    <Button fluid>Submit</Button>
  </form>
)

export default LoginForm
