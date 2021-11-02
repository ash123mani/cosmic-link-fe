import React from 'react'

import { Input, Button } from '@common'
import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'register-form'

const RegisterForm = () => (
  <form className={classNames({ blk })}>
    <Input
      className={classNames({ blk, elt: 'name' })}
      placeholder="Name of owner of cosmos"
      label="Name"
    />
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

export default RegisterForm
