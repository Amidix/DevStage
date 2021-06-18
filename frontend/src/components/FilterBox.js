import React from 'react'
import { Button, Card } from 'react-bootstrap'

const FilterBox = ({
  category,
  filter,
  logoColor,
  logo,
  filterName,
  onClick,
}) => {
  return (
    <Button variant='light' className='filters__filter' onClick={onClick}>
      <Card.Img
        src={category === filter ? logoColor : logo}
        className='filters__filter__icon'
      />{' '}
      <h2
        className='filters__filter__title'
        style={{ fontWeight: category === filter ? 'bold' : '' }}
      >
        {filterName}
      </h2>
    </Button>
  )
}

export default FilterBox
