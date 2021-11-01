import React, { Fragment } from 'react'

import { Button } from '@common'

import './_style.scss'

import FontFace from './font-face'
import Layout from './layout'

const Wrapper = () => (
  <Fragment>
    <FontFace />
    <Layout>
      <Button>Submit</Button>
    </Layout>
  </Fragment>
)

export default Wrapper
