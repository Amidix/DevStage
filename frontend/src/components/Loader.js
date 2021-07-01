import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <>
      <div
        class='loader'
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block',
        }}
      >
        <img
          class='loader__animated'
          src='https://image.flaticon.com/icons/svg/561/561071.svg'
          alt=''
        />

        <img src='https://image.flaticon.com/icons/svg/560/560969.svg' alt='' />
      </div>
    </>
  )
}
/** <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner> */
export default Loader
