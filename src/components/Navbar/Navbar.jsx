// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Trang chủ</Link>
            <Link to="/login">Login</Link>
            <Link to="/logout">Logout</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/manage">Quản lý</Link>
            <Link to="/profile">Hồ Sơ</Link>
            <Link to="/settings">Cài Đặt</Link>
            <Link to="/support">Hỗ trợ</Link>
        </nav>
    );
};

export default Navbar;
