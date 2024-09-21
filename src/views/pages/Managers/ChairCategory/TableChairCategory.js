
import React, { useEffect, useState } from 'react'
import { CheckCircle, Clock, Edit, Eye, Link2 } from 'react-feather'
// import { Toaster } from 'react-hot-toast'
// import { Link, useNavigate, useParams } from "react-router-dom"
import { Badge, Card, Offcanvas, OffcanvasBody, OffcanvasHeader, Table, UncontrolledTooltip } from 'reactstrap'
// import { getUserData } from '../../../../../auth/utils'
import CustomMessageRow from '../../../components/Tables/CustomMessageRow'
import CustomTableHeader from '../../../components/Tables/CustomTableHeader'
import LoadingRow from '../../../components/Tables/LoadingRow'
import Pagination from '../../../components/paginations'
import FilterChairCategory from './FilterChairCategory'
import FormChairCategory from './FormChairCategory'
import classNames from 'classnames'
import { useGetALLChairCategory } from './hook'
import { Link } from 'react-router-dom'
// import { useGetListProject } from './hook'

const columnHeaders = ["STT", "Tên Loại Ghế", "Giá Vé", "Số Lượng", "Cập Nhật Lần Cuối", "Hành Động"]

const TableChairCategory = () => {

  const [pages, setPage] = useState(0)
  const [canvasPlacement, setCanvasPlacement] = useState('start')
  const [canvasOpen, setCanvasOpen] = useState(false)
  // const [edit, setEdit] = useState("")

  const callbackCanvasOpen = (childData) => {
    setCanvasOpen(childData)
  }
  const toggleCanvasStart = () => {
    // history.push("/apps/portfolio-project")
    setCanvasPlacement('start')
    setCanvasOpen(!canvasOpen)
  }
  // // const userProfile = getUserData()
  // // const id = userProfile?.id
  const { status, data: dataListChairCategory, isPreviousData } = useGetALLChairCategory()

  console.log('dataListChairCategory: ', dataListChairCategory);

  // const handleEdit = () => {
  //   setCanvasPlacement('end')
  //   setCanvasOpen(!canvasOpen)
  //   setEdit(1)
  // }
  // const ICON_LOGO_DEFAULT = '/images/logo.webp'

  // useEffect(() => idPortfolio && handleEdit(), [idPortfolio])

  return (
    <>
      <Card className='wrap-container border-none'>
        <FilterChairCategory />
        {/* <Toaster placement='bottom-end' /> */}
        <Table responsive>
          {/* {status === 'loading' ? (
            <React.Fragment>
              <CustomTableHeader columnHeaders={columnHeaders} />
              <LoadingRow colSpan={columnHeaders.length + 1} />
            </React.Fragment>
          ) : ( */}
          <React.Fragment>
            <CustomTableHeader columnHeaders={columnHeaders} />
            <tbody>

              {dataListChairCategory?.length > 0 ? dataListChairCategory.map((item, index) => {

                return (
                  <tr>
                    <td>
                      {index + 1}
                    </td>

                    <td className='fw-bold string-name'>
                      {item?.name}
                    </td>

                    <td className='fw-bold string-name'>
                      {item?.price}

                    </td>   <td className='fw-bold string-name'>
                      {item?.seatCount}

                    </td>   <td className='fw-bold string-name'>
                      {item?.updated_at}

                    </td>   <td className='fw-bold string-name'>
                      action

                    </td>
                  </tr>
                )
              }) : <CustomMessageRow colSpan={columnHeaders.length + 1} message={"No data available in table"} />}

              <Offcanvas className='wrap-form' direction={canvasPlacement} isOpen={canvasOpen} toggle={toggleCanvasStart}>
                <OffcanvasHeader toggle={toggleCanvasStart}>Edit Project</OffcanvasHeader>
                <OffcanvasBody className={classNames({
                  'my-auto mx-0 flex-grow-0': canvasPlacement === 'start' || canvasPlacement === 'end'
                })}>
                  {/* <FormChairCategory parentCallback={callbackCanvasOpen} edit={edit} /> */}
                </OffcanvasBody>
              </Offcanvas>
            </tbody>
          </React.Fragment>
          {/* )} */}
        </Table>
        <Pagination
          list_data={null}
          setPage={setPage}
          isPreviousData={'isPreviousData'}
        />
      </Card>
      {/* <SliderTuTorial tag="" /> */}

    </>
  )
}
export default TableChairCategory