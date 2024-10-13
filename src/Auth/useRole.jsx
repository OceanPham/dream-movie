const useRole = () => {
    const userInfo = localStorage.getItem('userData');
    const parsedUser = JSON.parse(userInfo);
    const roleUser = parsedUser?.role?.role_name
    return roleUser;
}

export default useRole