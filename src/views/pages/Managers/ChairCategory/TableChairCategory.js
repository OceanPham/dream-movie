
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
  // // const { status, data: dataListProject, isPreviousData } = useGetListProject(id, pages)

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

              {/* {dataListProject?.data?.length > 0 ? dataListProject.data.map((val) => { */}

              {/* return ( */}
              <tr>
                <td>
                  {/* <Link
                  // to={{
                  //   pathname: `/apps/portfolio-project/edit/${val?.id}`,
                  //   state: { oldData: val }
                  // }}
                  >
                    <span
                      className='edit-project'
                    >
                      <Edit className='me-50' size={13} />Edit
                    </span>
                  </Link> */}
                  1
                </td>

                <td className='fw-bold string-name'>
                  {/* <a className='views-project' target="_blank" href={`${URL_FONTEND2}/project/${val?.attributes?.alias || ""}`}>
                    <img className='me-75' src={val?.attributes?.logo || ICON_LOGO_DEFAULT} alt='logo-default-cloodo' height='28' width='28' />
                    <span className='align-middle fw-bold' id={`Controlled_${val?.id}`}>
                      {val?.attributes?.name?.toLowerCase() || <StyledSand> Unavailable </StyledSand>}
                    </span>
                    <UncontrolledTooltip placement='top' target={`Controlled_${val?.id}`}>
                      {val?.attributes?.name?.toLowerCase() || <StyledSand> Unavailable </StyledSand>}
                    </UncontrolledTooltip> */}
                  {/* </a> */}
                  Hello
                </td>

                <td className='fw-bold string-name'>
                  {/* {val.attributes.feature_image && val.attributes.feature_image.data ? (
                    <a className='views-project' target="_blank" href={`${val.attributes.document_link}|| ""}`}>
                      <img className='' src={val?.attributes?.feature_image?.data?.attributes?.url} alt='logo-project' height='50' width='90' />
                    </a>
                  ) : (
                    <StyledSand> Unavailable </StyledSand>)} */}
                  Xin chao
                </td>
                <td >
                  {/* {val.attributes.website ?
                    <>
                      <a target="_blank" href={val.attributes.website || ""}>
                        <span className='ms-50 fs-5 fw-bold text-primary'> <Link2 size={20} className='me-50' />Link</span>
                      </a>
                    </>
                    : <StyledSand> Unavailable </StyledSand>
                  } */}
                  Hello
                </td>

                <td >
                  {/* {val.attributes.website ?
                    <>
                      <a target="_blank" href={val.attributes.website || ""}>
                        <span className='ms-50 fs-5 fw-bold text-primary'> <Link2 size={20} className='me-50' />Link</span>
                      </a>
                    </>
                    : <StyledSand> Unavailable </StyledSand>
                  } */}
                  Hello
                </td>

                {/* <td>{projectTypeBadge}</td>
                      <td>
                        <Clock className='me-50' size={13} />{create_Date}
                      </td> */}
                {/* <td>
                      </td> */}
              </tr>
              {/* ) */}
              {/* }) : <CustomMessageRow colSpan={columnHeaders.length + 1} message={"No data available in table"} />} */}

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