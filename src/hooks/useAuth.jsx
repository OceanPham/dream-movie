
const useAuth = () => {

    const userInfo = localStorage.getItem('userData')
    return !!userInfo
}

export default useAuth