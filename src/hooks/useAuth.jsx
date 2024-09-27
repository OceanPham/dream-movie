
const useAuth = () => {

    const userInfo = localStorage.getItem('users')
    return !!userInfo
}

export default useAuth