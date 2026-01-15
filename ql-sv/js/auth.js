// ================================================
// Auth.js - Xác thực và phân quyền
// ================================================

const Auth = {
    // Đăng nhập
    login(email, password) {
        const users = Storage.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            if (user.status === 'blocked') {
                return {
                    success: false,
                    message: 'Tài khoản đã bị khóa!'
                };
            }

            Storage.setCurrentUser(user);
            return {
                success: true,
                message: 'Đăng nhập thành công!',
                user: user
            };
        }

        return {
            success: false,
            message: 'Email hoặc mật khẩu không đúng!'
        };
    },

    // Đăng ký
    register(userData) {
        const users = Storage.getUsers() || [];

        // Kiểm tra email đã tồn tại
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
            return {
                success: false,
                message: 'Email đã được sử dụng!'
            };
        }

        // Kiểm tra mã sinh viên đã tồn tại
        const existingStudent = users.find(u => u.id === userData.studentId);
        if (existingStudent) {
            return {
                success: false,
                message: 'Mã sinh viên đã được sử dụng!'
            };
        }

        // Tạo user mới
        const newUser = {
            id: userData.studentId,
            email: userData.email,
            password: userData.password,
            fullName: userData.fullName,
            role: 'student',
            status: 'active',
            createdAt: new Date().toISOString()
        };

        Storage.addUser(newUser);

        // Tạo thông tin sinh viên
        const newStudent = {
            id: userData.studentId,
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone || '',
            gender: userData.gender || '',
            dateOfBirth: userData.dateOfBirth || '',
            address: userData.address || '',
            major: userData.major || '',
            class: userData.class || '',
            year: new Date().getFullYear().toString(),
            status: 'active'
        };

        Storage.addStudent(newStudent);

        return {
            success: true,
            message: 'Đăng ký thành công! Vui lòng đăng nhập.'
        };
    },

    // Đăng xuất
    logout() {
        Storage.clearCurrentUser();
        window.location.href = '../index.html';
    },

    // Kiểm tra đã đăng nhập
    isAuthenticated() {
        return Storage.getCurrentUser() !== null;
    },

    // Lấy thông tin user hiện tại
    getCurrentUser() {
        return Storage.getCurrentUser();
    },

    // Kiểm tra quyền admin
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },

    // Bảo vệ trang (redirect nếu chưa login)
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '../index.html';
            return false;
        }
        return true;
    },

    // Chỉ cho phép admin
    requireAdmin() {
        if (!this.requireAuth()) return false;
        
        if (!this.isAdmin()) {
            alert('Bạn không có quyền truy cập trang này!');
            window.location.href = './dashboard.html';
            return false;
        }
        return true;
    },

    // Đổi mật khẩu
    changePassword(oldPassword, newPassword) {
        const user = this.getCurrentUser();
        if (!user) {
            return {
                success: false,
                message: 'Vui lòng đăng nhập!'
            };
        }

        if (user.password !== oldPassword) {
            return {
                success: false,
                message: 'Mật khẩu cũ không đúng!'
            };
        }

        // Cập nhật mật khẩu
        Storage.updateUser(user.id, { password: newPassword });
        
        // Cập nhật session
        user.password = newPassword;
        Storage.setCurrentUser(user);

        return {
            success: true,
            message: 'Đổi mật khẩu thành công!'
        };
    },

    // Reset mật khẩu (dành cho admin)
    resetPassword(userId, newPassword = '123456') {
        const result = Storage.updateUser(userId, { password: newPassword });
        
        if (result) {
            return {
                success: true,
                message: `Reset mật khẩu thành công! Mật khẩu mới: ${newPassword}`
            };
        }

        return {
            success: false,
            message: 'Không tìm thấy tài khoản!'
        };
    },

    // Khóa/mở khóa tài khoản
    toggleUserStatus(userId) {
        const users = Storage.getUsers();
        const user = users.find(u => u.id === userId);

        if (!user) {
            return {
                success: false,
                message: 'Không tìm thấy tài khoản!'
            };
        }

        const newStatus = user.status === 'active' ? 'blocked' : 'active';
        Storage.updateUser(userId, { status: newStatus });

        return {
            success: true,
            message: `Đã ${newStatus === 'blocked' ? 'khóa' : 'mở khóa'} tài khoản!`
        };
    }
};
