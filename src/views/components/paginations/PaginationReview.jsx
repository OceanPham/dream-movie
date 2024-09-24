import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'


const PaginationReview = ({ list_data, setPage, isPreviousData, setStartIndex, setEndIndex, pageSize }) => {
  const Previous = () => {
    return <span className='align-middle d-none d-md-inline-block'>Prev</span>
  }

  const Next = () => {
    return <span className='align-middle d-none d-md-inline-block'>Next </span>
  }
  //Next page
  let nextPage = null
  const handlePagination = (page) => {
    if (!isPreviousData && !page.selected) {
      nextPage = page.selected
      console.log('nextPage: ', nextPage);
      setStartIndex(0)
      setEndIndex(pageSize)
    } else {
      nextPage = page.selected + 1
      console.log('nextPage else: ', nextPage);
      setStartIndex((nextPage - 1) * pageSize)
      setEndIndex(nextPage * pageSize)
    }
  }

  useEffect(() => {
    setStartIndex(0)
    setEndIndex(pageSize)
  }, [pageSize])

  console.log('pageSize receive: ', pageSize);
  return (
    <ReactPaginate
      pageCount={list_data ? Math.ceil(list_data?.length / pageSize) : 1}
      breakLabel="..."
      nextLabel={<Next />}
      onPageChange={handlePagination}
      pageRangeDisplayed={5}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      previousLabel={<Previous />}
      renderOnZeroPageCount={null}
      disableInitialCallback={true}
      selectedPageRel
      className="paginate-table"
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      nextClassName='page-item next'
      breakLinkClassName='page-link'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      containerClassName='pagination react-paginate'
    />
  )
}

export default PaginationReview