let roleUser = 'admin'; // Mặc định là admin

const useRole = () => {
    return roleUser;
};

// Hàm để thay đổi role trong quá trình test hoặc khi cần
export const setRoleUser = (role) => {
    roleUser = role;
};

export default useRole;
