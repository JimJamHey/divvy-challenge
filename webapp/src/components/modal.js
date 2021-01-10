import React from 'react'
import { css } from '@emotion/core'
import { bool, node } from 'prop-types'

const Modal = ({ children, isShowing }) => {
  return (
    <>
      {isShowing && (
        <div css={modal}>
          {children}
        </div>
      )}
    </>
  )
}

const modal = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    height: 100%;
    width: 100%;
`

export default Modal

Modal.propTypes = {
  children: node,
  isShowing: bool
}
