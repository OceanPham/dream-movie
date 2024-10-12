const handleLogout = () => {
    const userInfo = localStorage.getItem('userData');
    if (userInfo) {
        localStorage.removeItem('userData');
    }
};

export default handleLogout;
