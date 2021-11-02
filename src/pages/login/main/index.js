import React from 'react'

import { classNames } from '@common/helpers'

import Title from '../components/title'
import LoginForm from '../components/login-form'

import './_style.scss'

const blk = 'login-page'

const Main = () => (
  <main className={classNames({ blk })}>
    <section className={classNames({ blk, elt: 'content' })}>
      <Title />
      <LoginForm />
    </section>
  </main>
)

export default Main
