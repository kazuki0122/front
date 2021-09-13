import React from 'react'
import {
  Paginator,
  Container,
  Previous,
  Next,
  PageGroup,
} from "chakra-paginator";


type Props = {
  pages: number | undefined,
  current: number | undefined,
  setPageData: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.VFC<Props> = (props) => {

  // ページネーション
  const handlePageChange = (nextPage: number) => {
    // -> request new data using the page number
    props.setPageData(nextPage)
    console.log("request new data with ->", nextPage);
  };
  const {pages, current} = props;
  return (
  <Paginator
    pagesQuantity={pages}
    currentPage={current}
    onPageChange={handlePageChange}
  >
    <Container mx={'auto'} align="center" justify="space-between" maxW="xl">
      <Previous>
        前へ
      </Previous>
      <PageGroup isInline align="center" />
      <Next>
        次へ
      </Next>
    </Container>
  </Paginator>
  )
}

export default Pagination