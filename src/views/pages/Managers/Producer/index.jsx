import { Fragment } from 'react'
import '../../../../assets/style/styleSecond.css'
import '../../../../assets/style/_pagination.scss'
import TableProducer from './TableProducer'

const Checkout = ({ setSelectedKey }) => {
  setSelectedKey('id_producer')

  return (
    <Fragment>
      <TableProducer />
    </Fragment>
  )
}
export default Checkout