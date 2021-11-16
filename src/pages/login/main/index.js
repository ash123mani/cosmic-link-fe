import React, { useState } from 'react'

import { classNames } from '@common/helpers'

import Title from '../components/title'
import LoginForm from '../components/login-form'

import './_style.scss'

const blk = 'login-page'

const Main = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(!showForgotPassword)
  }

  return (
    <main className={classNames({ blk })}>
      <section className={classNames({ blk, elt: 'content' })}>
        <Title showForgotPassword={showForgotPassword} />
        <LoginForm
          onForgotPasswordClick={handleForgotPasswordClick}
          showForgotPassword={showForgotPassword}
        />
      </section>
    </main>
  )
}

export default Main
