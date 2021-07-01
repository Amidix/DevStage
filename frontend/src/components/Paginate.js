import React from 'react'
import { Container, Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, keyword = '', link1, link2 }) => {
  return (
    pages > 1 && (
      <Container>
        <Pagination>
          <br></br>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                keyword ? `/${link1}/page/${x + 1}` : `/${link2}/page/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      </Container>
    )
  )
}

export default Paginate
/*<Pagination>
{[...Array(pages).keys()].map((x) => (
  <LinkContainer
    key={x + 1}
    to={
      keyword
        ? `/search/${keyword}/page/${x + 1}`
        : `/menu/page/${x + 1}`
    }
  >
    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
  </LinkContainer>
))}
</Pagination>*/
