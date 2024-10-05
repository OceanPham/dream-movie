import { Fragment } from 'react'
import '../../../../assets/style/styleSecond.css'
import '../../../../assets/style/_pagination.scss'
import TableEmployee from './TableEmployee'

const Checkout = ({ setSelectedKey }) => {
  setSelectedKey('id_employee')

  return (
    <Fragment>
      <TableEmployee />
    </Fragment>
  )
}
export default Checkout