import { Fragment } from 'react'
import '../../../../assets/style/styleSecond.css'
import '../../../../assets/style/_pagination.scss'
import TableRoom from './TableRoom'

const Checkout = ({ setSelectedKey }) => {
  setSelectedKey('id_roomMovie')

  return (
    <Fragment>
      <TableRoom />
    </Fragment>
  )
}
export default Checkout