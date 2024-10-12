import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import useAuth from '../../hooks/useAuth'
import handleLogout from '../../hooks/handleLogout'
import logo from "../../assets/images/logo.png";

const UserDropdown = () => {
  // ** Store Vars
  // const dispatch = useDispatch()

  const isUserLoggedIn = useAuth()
  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  //** Vars
  const userAvatar = (userData && userData?.avatar) || logo

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <p className='user-name fw-bold'>{(userData && userData?.full_name) || 'Ocean Pham'} <span className={`fw-normal ${userData?.role?.role_name === 'admin' ? 'text-success' : 'text-danger'}`}>( {(userData && userData?.role?.role_name) || 'user'} )</span> </p>
        </div>
        <img src={logo} alt='logo' width={45} className='rounded-circle me-3' />

      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/briefCase/userinfo'>
          <User size={14} className='me-2' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>

        <DropdownItem divider />
        <DropdownItem tag={Link} to='/setting'>
          <Settings size={14} className='me-2' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>

        <DropdownItem tag={Link} to='/login' onClick={() => handleLogout()}>
          <Power size={14} className='me-2' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
