import ReactPaginate from 'react-paginate'


const Pagination = ({ list_data, setPage, isPreviousData }) => {
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
      setPage(nextPage)
    } else {
      nextPage = page.selected + 1
      setPage(nextPage)
    }
  }
  return (
    <ReactPaginate
      pageCount={list_data ? list_data?.meta?.pagination?.pageCount : 1}
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

export default Pagination