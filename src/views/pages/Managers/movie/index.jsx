import { Fragment } from 'react'
import '../../../../assets/style/styleSecond.css'
import '../../../../assets/style/_pagination.scss'
import TableMovie from './TableMovie'

const Checkout = ({ setSelectedKey }) => {
  setSelectedKey('id_movie')

  return (
    <Fragment>
      <TableMovie />
    </Fragment>
  )
}
export default Checkout