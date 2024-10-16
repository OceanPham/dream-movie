import React, { useState } from 'react';
import { HomeOutlined, SettingOutlined, SolutionOutlined, UserOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import logo from "../../assets/images/logo.png";
import { FaRegCircle } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { MdOutlineLightMode } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import vn_flag from '../../assets/images/vn_flag.png'
import AppRouter from '../../routes/AppRoutes';
import { Link, useNavigate } from 'react-router-dom';
import UserDropdown from '../../views/components/UserDropdown';


const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Trang Chủ', 'subDasboard', <HomeOutlined className='custom_icon_sidebar' />, [
        getItem('Tổng Quát', 'id_overView', <FaRegCircle />),
        getItem('Xuất Vé', 'id_sellTicket', <FaRegCircle />),
    ]),
    getItem('Quản Lý', 'subManager', <SolutionOutlined className='custom_icon_sidebar' />, [
        getItem('Nhân Viên', 'id_employee', <FaRegCircle />),
        getItem('Phim ', 'id_movie', <FaRegCircle />),
        getItem('Lịch Chiếu ', 'id_schedule', <FaRegCircle />),
        getItem('Phòng Chiếu ', 'id_roomMovie', <FaRegCircle />),
        getItem('Mã Giảm giá ', 'id_voucher', <FaRegCircle />),
        getItem('Loại Thực Phẩm ', 'id_foodCategory', <FaRegCircle />),
        getItem('Thực Phẩm ', 'id_food', <FaRegCircle />),
        getItem('Loại Phim', 'id_movieCategory', <FaRegCircle />),
        getItem('Loại Ghế', 'id_chairCategory', <FaRegCircle />),
        // getItem('Tin Tức', 'id_news', <FaRegCircle />),
        getItem('Nhà Cung Cấp', 'id_producer', <FaRegCircle />),
        // getItem('Quy Định', 'id_policy', <FaRegCircle />),
    ]),
    getItem('Hồ Sơ', 'subBriefcase', <UserOutlined className='custom_icon_sidebar' />, [
        getItem('Thông tin cá nhân', 'id_userinfo', <FaRegCircle />),
        getItem('Tùy Chỉnh', 'id_custome', <FaRegCircle />)]),

    getItem('Cài Đặt', 'id_setting', <SettingOutlined className='custom_icon_sidebar' />),
    getItem('Hỗ Trợ', 'id_support', <BiSupport className='custom_icon_sidebar' />),
];

const MainLayout = () => {

    const [titleCurrentPage, setTitleCurrentPage] = useState('Tổng Quát')
    const [selectedKey, setSelectedKey] = useState(['id_overView']); // Set initial selected key

    const navigate = useNavigate();
    const handleMenuClick = ({ key }) => {
        switch (key) {
            case 'id_overView':
                setTitleCurrentPage('Trang Chủ > Tổng Quát')
                setSelectedKey('id_overView')
                navigate('/');
                break;
            case 'id_sellTicket':
                setTitleCurrentPage('Trang Chủ > Xuất Vé')
                setSelectedKey('id_sellTicket')
                navigate('/exportTicket');
                break;
            case 'id_employee':
                setTitleCurrentPage('Quản Lý > Nhân Viên')
                setSelectedKey('id_employee')
                navigate('/manager/employee');
                break;
            case 'id_movie':
                setTitleCurrentPage('Quản Lý > Phim')
                setSelectedKey('id_movie')
                navigate('/manager/movie');
                break;
            case 'id_schedule':
                setTitleCurrentPage('Quản Lý > Lịch Chiếu')
                setSelectedKey('id_schedule')
                navigate('/manager/showtime');
                break;
            case 'id_roomMovie':
                setTitleCurrentPage('Quản Lý > Phòng Chiếu')
                setSelectedKey('id_roomMovie')
                navigate('/manager/room');
                break;
            case 'id_voucher':
                setTitleCurrentPage('Quản Lý > Mã Giảm giá')
                setSelectedKey('id_voucher')
                navigate('/manager/voucher');
                break;
            case 'id_foodCategory':
                setTitleCurrentPage('Quản Lý > Loại Thực Phẩm')
                setSelectedKey('id_foodCategory')
                navigate('/manager/foodCategory');
                break;
            case 'id_food':
                setTitleCurrentPage('Quản Lý > Thực Phẩm')
                setSelectedKey('id_food')
                navigate('/manager/food');
                break;
            case 'id_movieCategory':
                setTitleCurrentPage('Quản Lý > Loại Phim')
                setSelectedKey('id_movieCategory')
                navigate('/manager/movieCategory');
                break;
            case 'id_chairCategory':
                setTitleCurrentPage('Quản Lý > Loại Ghế')
                setSelectedKey('id_chairCategory')
                navigate('/manager/chairCategory');
                break;
            case 'id_news':
                setTitleCurrentPage('Quản Lý > Tin Tức')
                setSelectedKey('id_news')
                navigate('/manager/news');
                break;
            case 'id_producer':
                setTitleCurrentPage('Quản Lý > Nhà Cung Cấp')
                setSelectedKey('id_producer')
                navigate('/manager/producer');
                break;
            case 'id_policy':
                setTitleCurrentPage('Quản Lý > Quy Định')
                setSelectedKey('id_policy')
                navigate('/manager/policy');
                break;

            case 'id_userinfo':
                setTitleCurrentPage('Hồ Sơ > Thông Tin Cá Nhân')
                setSelectedKey('id_userinfo')
                navigate('/briefCase/userinfo');
                break;
            case 'id_custome':
                setTitleCurrentPage('Hồ Sơ > Tùy Chỉnh')
                setSelectedKey('id_custome')
                navigate('/briefCase/custome');
                break;

            case 'id_setting':
                setTitleCurrentPage('Cài Đặt')
                setSelectedKey('id_setting')
                navigate('/setting');
                break;

            case 'id_support':
                setTitleCurrentPage('Hỗ Trợ')
                setSelectedKey('id_support')
                navigate('/support');
                break;
            default:
                setTitleCurrentPage('Trang Chủ > Tổng Quát')
                setSelectedKey('id_overView')
                navigate('/');
                break;
        }
    };

    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }} >

            <Sider className='sider_parent' style={{ background: '#fff' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className='position-fixed'>
                    <Link to={'/'} className='text-decoration-none'>
                        <div className='d-flex ps-3 align-items-center main_sideBar '>
                            <img src={logo} alt='logo' width={50} className='main_logo' />
                            <span className={`${collapsed ? 'd-none' : ''} main_name fw-bold ps-2`}> Dream Movie</span>
                        </div>
                    </Link>
                    <Menu style={{ border: 'none' }} theme="light" className={`${collapsed ? 'resizeWidth' : ''} sider_custom`} selectedKeys={selectedKey} mode="inline" items={items} onClick={handleMenuClick} />
                </div>
            </Sider>

            <Layout className='main_layout'>
                <Header
                    style={{
                        padding: 0,
                        background: 'rgba(128, 181, 245, 0.16)'
                    }}
                >
                    <div className='d-flex align-items-center justify-content-between ps-4'>
                        <div className='fw-bold fs-5'>
                            {/* {titleCurrentPage} */}
                        </div>
                        <div className='d-flex align-items-center float-end main_header'>
                            <img src={vn_flag} alt='logo' width={40} />
                            <MdOutlineLightMode size={30} style={{ width: '65px' }} className='border-end border-1 border-black' />
                            <div className='position-relative'>
                                <UserDropdown />
                            </div>
                        </div>
                    </div>
                </Header>

                <Content style={{ margin: '0 16px', }} >
                    <Breadcrumb className='my-2' >
                        <Breadcrumb.Item>{titleCurrentPage}</Breadcrumb.Item>
                    </Breadcrumb>
                    <>
                        <AppRouter setSelectedKey={setSelectedKey} />
                    </>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;