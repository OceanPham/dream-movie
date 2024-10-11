
const handleLogout = () => {

    const userInfo = localStorage.getItem('users')
    return !!userInfo
}

export default handleLogout