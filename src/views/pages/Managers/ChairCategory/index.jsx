import { Fragment } from 'react'
import '../../../../assets/style/styleSecond.css'
import '../../../../assets/style/_pagination.scss'
import TableChairCategory from './TableChairCategory'

const Checkout = ({ setSelectedKey }) => {
  setSelectedKey('id_chairCategory')

  return (
    <Fragment>
      <TableChairCategory />
    </Fragment>
  )
}
export default Checkout