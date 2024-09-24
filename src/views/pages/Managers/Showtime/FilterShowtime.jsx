import classnames from 'classnames'
import { useEffect, useState } from 'react'
// import { Toaster } from 'react-hot-toast'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap'
import FormShowtime from './FormShowtime'

const Showtime = (listNameUsed) => {
  const [canvasPlacement, setCanvasPlacement] = useState('start')
  const [canvasOpen, setCanvasOpen] = useState(false)

  const navigate = useNavigate()
  const { alias } = useParams()

  console.log('alias: ', alias);

  useEffect(() => alias && toggleCanvasEnd(), [alias])

  const toggleCanvasStart = () => {
    navigate("/manager/showtime")
    setCanvasPlacement('start')
    setCanvasOpen(!canvasOpen)
  }
  const toggleCanvasEnd = () => {
    setCanvasPlacement('end')
    setCanvasOpen(!canvasOpen)
  }

  const callbackCanvasOpen = (childData) => {
    setCanvasOpen(childData)
  }

  return (
    <div className='filter-listing'>
      {/* <Toaster /> */}
      <div className='btn-wrap'>
        <div className='demo-inline-spacing'>
          <Link to={`/manager/showtime/add-producer`}>
            <Button color='primary'>
              Thêm
            </Button>
          </Link>
          <Offcanvas className='wrap-form w-50' direction={canvasPlacement} isOpen={canvasOpen} toggle={toggleCanvasStart}>
            <OffcanvasHeader toggle={toggleCanvasStart}>Thêm lịch chiếu</OffcanvasHeader>
            <OffcanvasBody
              className={classnames({
                'my-auto mx-0 flex-grow-0': canvasPlacement === 'start' || canvasPlacement === 'end'
              })}
            >
              <FormShowtime parentCallback={callbackCanvasOpen} listNameUsed={listNameUsed} />
            </OffcanvasBody>
          </Offcanvas>
        </div>
      </div>
    </div>
  )
}

export default Showtime