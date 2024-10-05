import { Fragment } from 'react'
import '../../../../assets/style/styleSecond.css'
import '../../../../assets/style/_pagination.scss'
import TableShowtime from './TableShowtime'

const Checkout = ({ setSelectedKey }) => {
  setSelectedKey('id_schedule')
  return (
    <Fragment>
      <TableShowtime />
    </Fragment>
  )
}
export default Checkout