import React, { Fragment } from 'react'

import Header from '@local/header'

import './_style.scss'

import FontFace from './font-face'
import Layout from './layout'

const Wrapper = () => (
  <Fragment>
    <FontFace />
    <Layout>
      <Header />
    </Layout>
  </Fragment>
)

export default Wrapper
