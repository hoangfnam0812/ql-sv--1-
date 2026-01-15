// ================================================
// Validation.js - Kiểm tra dữ liệu đầu vào
// ================================================

const Validation = {
    // Kiểm tra email hợp lệ
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Kiểm tra số điện thoại hợp lệ (Việt Nam)
    isValidPhone(phone) {
        const phoneRegex = /^(0|\+84)[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    // Kiểm tra mật khẩu mạnh (ít nhất 6 ký tự)
    isValidPassword(password) {
        return password && password.length >= 6;
    },

    // Kiểm tra mã sinh viên (format: SV + 3 số)
    isValidStudentId(studentId) {
        const idRegex = /^SV\d{3,}$/;
        return idRegex.test(studentId);
    },

    // Kiểm tra điểm (0-10)
    isValidGrade(grade) {
        const num = parseFloat(grade);
        return !isNaN(num) && num >= 0 && num <= 10;
    },

    // Kiểm tra ngày tháng hợp lệ
    isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    },

    // Kiểm tra field không rỗng
    isNotEmpty(value) {
        return value && value.trim().length > 0;
    },

    // Kiểm tra độ dài tối thiểu
    minLength(value, min) {
        return value && value.length >= min;
    },

    // Kiểm tra độ dài tối đa
    maxLength(value, max) {
        return value && value.length <= max;
    },

    // Validate form đăng nhập
    validateLoginForm(email, password) {
        const errors = [];

        if (!this.isNotEmpty(email)) {
            errors.push('Email không được để trống');
        } else if (!this.isValidEmail(email)) {
            errors.push('Email không hợp lệ');
        }

        if (!this.isNotEmpty(password)) {
            errors.push('Mật khẩu không được để trống');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    // Validate form đăng ký
    validateRegisterForm(formData) {
        const errors = [];

        if (!this.isNotEmpty(formData.studentId)) {
            errors.push('Mã sinh viên không được để trống');
        } else if (!this.isValidStudentId(formData.studentId)) {
            errors.push('Mã sinh viên không hợp lệ (VD: SV001)');
        }

        if (!this.isNotEmpty(formData.fullName)) {
            errors.push('Họ tên không được để trống');
        }

        if (!this.isNotEmpty(formData.email)) {
            errors.push('Email không được để trống');
        } else if (!this.isValidEmail(formData.email)) {
            errors.push('Email không hợp lệ');
        }

        if (!this.isNotEmpty(formData.password)) {
            errors.push('Mật khẩu không được để trống');
        } else if (!this.isValidPassword(formData.password)) {
            errors.push('Mật khẩu phải có ít nhất 6 ký tự');
        }

        if (formData.password !== formData.confirmPassword) {
            errors.push('Mật khẩu xác nhận không khớp');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    // Validate thông tin sinh viên
    validateStudentForm(formData) {
        const errors = [];

        if (!this.isNotEmpty(formData.id)) {
            errors.push('Mã sinh viên không được để trống');
        } else if (!this.isValidStudentId(formData.id)) {
            errors.push('Mã sinh viên không hợp lệ (VD: SV001)');
        }

        if (!this.isNotEmpty(formData.fullName)) {
            errors.push('Họ tên không được để trống');
        }

        if (!this.isNotEmpty(formData.email)) {
            errors.push('Email không được để trống');
        } else if (!this.isValidEmail(formData.email)) {
            errors.push('Email không hợp lệ');
        }

        if (formData.phone && !this.isValidPhone(formData.phone)) {
            errors.push('Số điện thoại không hợp lệ');
        }

        if (formData.dateOfBirth && !this.isValidDate(formData.dateOfBirth)) {
            errors.push('Ngày sinh không hợp lệ');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    // Validate điểm
    validateGradeForm(formData) {
        const errors = [];

        if (!this.isNotEmpty(formData.studentId)) {
            errors.push('Mã sinh viên không được để trống');
        }

        if (!this.isNotEmpty(formData.subject)) {
            errors.push('Môn học không được để trống');
        }

        if (!this.isValidGrade(formData.midterm)) {
            errors.push('Điểm giữa kỳ không hợp lệ (0-10)');
        }

        if (!this.isValidGrade(formData.final)) {
            errors.push('Điểm cuối kỳ không hợp lệ (0-10)');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    // Validate thông báo
    validateAnnouncementForm(formData) {
        const errors = [];

        if (!this.isNotEmpty(formData.title)) {
            errors.push('Tiêu đề không được để trống');
        }

        if (!this.isNotEmpty(formData.content)) {
            errors.push('Nội dung không được để trống');
        }

        if (!this.isValidDate(formData.date)) {
            errors.push('Ngày không hợp lệ');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    // Validate thời khóa biểu
    validateScheduleForm(formData) {
        const errors = [];

        if (!this.isNotEmpty(formData.class)) {
            errors.push('Lớp không được để trống');
        }

        if (!this.isNotEmpty(formData.subject)) {
            errors.push('Môn học không được để trống');
        }

        if (!this.isNotEmpty(formData.teacher)) {
            errors.push('Giảng viên không được để trống');
        }

        if (!this.isNotEmpty(formData.room)) {
            errors.push('Phòng học không được để trống');
        }

        if (!this.isNotEmpty(formData.day)) {
            errors.push('Thứ không được để trống');
        }

        if (!this.isNotEmpty(formData.startTime)) {
            errors.push('Giờ bắt đầu không được để trống');
        }

        if (!this.isNotEmpty(formData.endTime)) {
            errors.push('Giờ kết thúc không được để trống');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
};
