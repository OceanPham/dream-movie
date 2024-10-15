import { Fragment } from 'react'
import '../../../../assets/style/styleSecond.css'
import '../../../../assets/style/_pagination.scss'
import TableFilm from './TableFilm'

const Checkout = ({ setSelectedKey }) => {
  setSelectedKey('id_film')

  return (
    <Fragment>
      <TableFilm />
    </Fragment>
  )
}
export default Checkout