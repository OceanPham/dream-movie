import logo from '../../assets/images/logo.png'
import vn_flag from '../../assets/images/vn_flag.png'
import { MdOutlineLightMode } from "react-icons/md";
import { GoDotFill } from "react-icons/go"; const Header = () => {
    return (
        <div className='d-flex justify-content-between align-items-center px-3 main_header'>
            <div className='d-flex  align-items-center'>
                <img src={logo} alt='logo' width={55} className='main_logo' />
                <span className='main_name fw-bold fs-4 ps-2'> Dream Movie</span>
            </div>

            <div className='d-flex  align-items-center'>
                <img src={vn_flag} alt='logo' width={40} />
                <div className='px-3 border-end border-1 border-black'>
                    <MdOutlineLightMode size={30} className='' />
                </div>
                <span className='px-3'> Pham Ngoc Huy</span>
                <div className='position-relative'>
                    <img src={logo} alt='logo' width={45} className='rounded-circle me-3' />
                    <GoDotFill size={25} className='dot_status' />

                </div>
            </div>
        </div>
    )
}

export default Header