import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './components/home'
import { PieChart } from './components/piechart/pie-chart'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/piechart'>Pie Chart</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={PieChart} exact path='/piechart' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    background-color: #E1DED0;
    display: grid;
    grid-row-gap: 24px;
    padding: 8px;
`

const navStyle = css`
  grid-row: 1;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-child) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
