import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './components/home-page'
import { Nav } from './components/nav/nav'
import { NewTransaction } from './components/add-transaction'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <Nav />
        <div className='main-content'>
          <Route component={Home} exact path='/' />
          <Route component={NewTransaction} exact path='/addTransaction' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    background-color: #E5E2D4;
    height: 100vh;
`
