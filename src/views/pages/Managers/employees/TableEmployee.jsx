
import React, { useState } from 'react'
import { Clock, Edit, Eye, MoreVertical, Trash } from 'react-feather'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, Offcanvas, OffcanvasBody, OffcanvasHeader, Table, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap'
import CustomMessageRow from '../../../components/Tables/CustomMessageRow'
import CustomTableHeader from '../../../components/Tables/CustomTableHeader'
import LoadingRow from '../../../components/Tables/LoadingRow'
import classNames from 'classnames'
import { useDeleteEmployee, useGetALLEmployee } from './hook'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useRole from '../../../../Auth/useRole'
import { timeReFormat } from '../../../../hooks/useFormattedDate'
import NoData from '../../../components/Tables/NoData'
import FilterEmployee from './FilterEmployee'
import FormEmployee from './FormEmployee'
import { Pagination } from 'antd'

const columnHeaders = ["STT", "Họ Tên", "Tên Tài Khoản", "Cập Nhật Lần Cuối", "Hành Động"]

const TableEmployee = () => {
  const role = useRole()

  const [pages, setPage] = useState(0)
  const [canvasPlacement, setCanvasPlacement] = useState('start')
  const [canvasOpen, setCanvasOpen] = useState(false)
  // const [edit, setEdit] = useState("")
  const navigate = useNavigate()

  const callbackCanvasOpen = (childData) => {
    setCanvasOpen(childData)
  }
  const toggleCanvasStart = () => {
    navigate("/manager/employee")
    setCanvasPlacement('start')
    setCanvasOpen(!canvasOpen)
  }

  const { status, data: dataListEmployee } = useGetALLEmployee()
  const { status: sttDelete, mutate: deleteEmployee } = useDeleteEmployee()


  const listNameUsed = dataListEmployee && dataListEmployee?.length > 0 && dataListEmployee.map(((item) => item?.name?.toLowerCase()?.trim()))
  const MySwal = withReactContent(Swal)

  const handleConfirmDelete = (id) => {
    return MySwal.fire({
      title: 'Bạn có chắc chắn muốn xóa loại ghế này?',
      text: "Bạn sẽ không thể khôi phục nó sau khi xóa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Không',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (role !== 'admin') {
        MySwal.fire({
          icon: 'error',
          title: 'Lỗi phân quyền!',
          text: 'Bạn không được phân quyền xóa loại ghế.',
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        });
      }
      else if (result.isConfirmed) {
        const waitingToast = MySwal.fire({
          title: 'Đang xóa!',
          text: 'Loại ghế đang được xóa, vui lòng đợi!',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        deleteEmployee(id, {
          onSuccess: () => {
            waitingToast.close();
            MySwal.fire({
              icon: 'success',
              title: 'Đã xóa!',
              text: 'Loại ghế đã được xóa thành công.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
          },
          onError: () => {
            MySwal.fire({
              icon: 'error',
              title: 'Lỗi!',
              text: 'Xóa loại ghế không thành công.',
              customClass: {
                confirmButton: 'btn btn-danger'
              }
            });
          },
        });
      }

    })
  }

  const itemsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(itemsPerPage)

  const handlePageChange = (page) => {
    setStartIndex((page - 1) * itemsPerPage)
    setEndIndex(page * itemsPerPage)
  }


  return (
    <>
      <Card className='wrap-container border-none'>
        <FilterEmployee listNameUsed={listNameUsed} />
        <Table responsive>
          {status === 'loading' ? (
            <React.Fragment>
              <CustomTableHeader columnHeaders={columnHeaders} />
              <LoadingRow colSpan={columnHeaders.length + 1} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <CustomTableHeader columnHeaders={columnHeaders} />
              <tbody>

                {dataListEmployee?.length > 0 ? dataListEmployee.sort((a, b) => b.id - a.id).slice(startIndex, endIndex).map((item, index) => {
                  return (
                    <tr>
                      <td className='ps-3'>
                        {index + 1 + startIndex}
                      </td>

                      <td className='string-name'>
                        {item?.fullname ? item?.fullname : <> <NoData /> </>}
                      </td>

                      <td className='string-name'>
                        {item?.username ? item?.username : <> <NoData /> </>}
                      </td>

                      <td className='string-name'>
                        <Clock size={17} /> {timeReFormat(item?.updatedAt) ? timeReFormat(item?.updatedAt) : <> <NoData /> </>}
                      </td>

                      <td className='fw-bold string-name d-flex justify-content-center'>
                        <div className='column-action d-flex align-items-center'>

                          <Link to={`/manager/employee`} id={`pw-tooltip-${item.id}`}>
                            <Eye size={17} className='mx-1' />
                          </Link>
                          <UncontrolledTooltip placement='top' target={`pw-tooltip-${item.id}`}>
                            Xem chi tiết
                          </UncontrolledTooltip>
                          <UncontrolledDropdown>
                            <DropdownToggle tag='span'>
                              <MoreVertical size={17} className='cursor-pointer' />
                            </DropdownToggle>
                            <DropdownMenu container="body" className='custom_drop_menu'>
                              <DropdownItem tag={Link} to={``} className='w-100'>
                                <Edit size={14} className='me-2' />
                                <span className='align-middle'>Sửa</span>
                              </DropdownItem>
                              <DropdownItem tag='a' className='w-100 text-danger'
                                onClick={() => handleConfirmDelete(item.id)}
                              >
                                <Trash size={14} className='me-2' />
                                <span className='align-middle'>Xóa</span>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>

                      </td>
                    </tr>
                  )
                }) : <CustomMessageRow colSpan={columnHeaders.length + 1} message={"No data available in table"} />}

                <Offcanvas className='wrap-form' direction={canvasPlacement} isOpen={canvasOpen} toggle={toggleCanvasStart}>
                  <OffcanvasHeader toggle={toggleCanvasStart}>Edit Project</OffcanvasHeader>
                  <OffcanvasBody className={classNames({
                    'my-auto mx-0 flex-grow-0': canvasPlacement === 'start' || canvasPlacement === 'end'
                  })}>
                    <FormEmployee parentCallback={callbackCanvasOpen} />
                  </OffcanvasBody>
                </Offcanvas>
              </tbody>
            </React.Fragment>
          )}
        </Table>
        {/* <Pagination
          list_data={null}
          setPage={setPage}
          isPreviousData={'isPreviousData'}
        /> */}
        <Pagination
          defaultCurrent={1}
          total={dataListEmployee?.length}
          align="end"
          onChange={handlePageChange}
          pageSize={itemsPerPage}
        />
      </Card>
      {/* <SliderTuTorial tag="" /> */}

    </>
  )
}
export default TableEmployee