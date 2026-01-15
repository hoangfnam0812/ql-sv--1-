// ================================================
// Storage.js - Quản lý LocalStorage
// ================================================

const Storage = {
    // Khởi tạo dữ liệu mẫu nếu chưa có
    init() {
        if (!this.getUsers()) {
            // Tài khoản admin mặc định
            const defaultUsers = [
                {
                    id: 'admin',
                    email: 'admin@qlsv.com',
                    password: 'admin123',
                    fullName: 'Quản trị viên',
                    role: 'admin',
                    status: 'active'
                }
            ];
            this.setUsers(defaultUsers);
        }

        if (!this.getStudents()) {
            // Sinh viên mẫu
            const defaultStudents = [
                {
                    id: 'SV001',
                    fullName: 'Nguyễn Văn A',
                    email: 'nva@student.com',
                    phone: '0123456789',
                    gender: 'Nam',
                    dateOfBirth: '2002-01-15',
                    address: 'Hà Nội',
                    major: 'Công nghệ thông tin',
                    class: 'IT01',
                    year: '2020',
                    status: 'active'
                },
                {
                    id: 'SV002',
                    fullName: 'Trần Thị B',
                    email: 'ttb@student.com',
                    phone: '0987654321',
                    gender: 'Nữ',
                    dateOfBirth: '2002-05-20',
                    address: 'TP.HCM',
                    major: 'Quản trị kinh doanh',
                    class: 'BA01',
                    year: '2020',
                    status: 'active'
                }
            ];
            this.setStudents(defaultStudents);
        }

        if (!this.getAnnouncements()) {
            // Thông báo mẫu
            const defaultAnnouncements = [
                {
                    id: 'TB001',
                    title: 'Thông báo lịch thi giữa kỳ',
                    content: 'Lịch thi giữa kỳ học kỳ I năm học 2024-2025 sẽ diễn ra từ ngày 15/01/2025',
                    date: '2024-12-01',
                    priority: 'high',
                    author: 'Admin'
                },
                {
                    id: 'TB002',
                    title: 'Thông báo nghỉ học',
                    content: 'Nhà trường thông báo nghỉ học vào thứ 7 ngày 14/12/2024',
                    date: '2024-12-05',
                    priority: 'normal',
                    author: 'Admin'
                }
            ];
            this.setAnnouncements(defaultAnnouncements);
        }

        if (!this.getGrades()) {
            // Điểm mẫu
            const defaultGrades = [
                {
                    id: 'D001',
                    studentId: 'SV001',
                    subject: 'Lập trình Web',
                    midterm: 8.5,
                    final: 9.0,
                    average: 8.8,
                    semester: '1',
                    year: '2024'
                },
                {
                    id: 'D002',
                    studentId: 'SV001',
                    subject: 'Cơ sở dữ liệu',
                    midterm: 7.5,
                    final: 8.0,
                    average: 7.8,
                    semester: '1',
                    year: '2024'
                }
            ];
            this.setGrades(defaultGrades);
        }

        if (!this.getSchedules()) {
            // Thời khóa biểu mẫu
            const defaultSchedules = [
                {
                    id: 'TKB001',
                    class: 'IT01',
                    subject: 'Lập trình Web',
                    teacher: 'TS. Nguyễn Văn X',
                    room: 'A101',
                    day: 'Thứ 2',
                    startTime: '07:30',
                    endTime: '09:30'
                },
                {
                    id: 'TKB002',
                    class: 'IT01',
                    subject: 'Cơ sở dữ liệu',
                    teacher: 'PGS. Trần Thị Y',
                    room: 'B202',
                    day: 'Thứ 4',
                    startTime: '13:00',
                    endTime: '15:00'
                }
            ];
            this.setSchedules(defaultSchedules);
        }
    },

    // ===== USER MANAGEMENT =====
    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || null;
    },

    setUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    },

    addUser(user) {
        const users = this.getUsers() || [];
        users.push(user);
        this.setUsers(users);
    },

    updateUser(userId, updatedData) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedData };
            this.setUsers(users);
            return true;
        }
        return false;
    },

    deleteUser(userId) {
        let users = this.getUsers();
        users = users.filter(u => u.id !== userId);
        this.setUsers(users);
    },

    getUserByEmail(email) {
        const users = this.getUsers() || [];
        return users.find(u => u.email === email);
    },

    // ===== STUDENTS MANAGEMENT =====
    getStudents() {
        return JSON.parse(localStorage.getItem('students')) || null;
    },

    setStudents(students) {
        localStorage.setItem('students', JSON.stringify(students));
    },

    addStudent(student) {
        const students = this.getStudents() || [];
        students.push(student);
        this.setStudents(students);
    },

    updateStudent(studentId, updatedData) {
        const students = this.getStudents();
        const index = students.findIndex(s => s.id === studentId);
        if (index !== -1) {
            students[index] = { ...students[index], ...updatedData };
            this.setStudents(students);
            return true;
        }
        return false;
    },

    deleteStudent(studentId) {
        let students = this.getStudents();
        students = students.filter(s => s.id !== studentId);
        this.setStudents(students);
    },

    getStudentById(studentId) {
        const students = this.getStudents() || [];
        return students.find(s => s.id === studentId);
    },

    // ===== ANNOUNCEMENTS MANAGEMENT =====
    getAnnouncements() {
        return JSON.parse(localStorage.getItem('announcements')) || null;
    },

    setAnnouncements(announcements) {
        localStorage.setItem('announcements', JSON.stringify(announcements));
    },

    addAnnouncement(announcement) {
        const announcements = this.getAnnouncements() || [];
        announcements.push(announcement);
        this.setAnnouncements(announcements);
    },

    updateAnnouncement(announcementId, updatedData) {
        const announcements = this.getAnnouncements();
        const index = announcements.findIndex(a => a.id === announcementId);
        if (index !== -1) {
            announcements[index] = { ...announcements[index], ...updatedData };
            this.setAnnouncements(announcements);
            return true;
        }
        return false;
    },

    deleteAnnouncement(announcementId) {
        let announcements = this.getAnnouncements();
        announcements = announcements.filter(a => a.id !== announcementId);
        this.setAnnouncements(announcements);
    },

    // ===== GRADES MANAGEMENT =====
    getGrades() {
        return JSON.parse(localStorage.getItem('grades')) || null;
    },

    setGrades(grades) {
        localStorage.setItem('grades', JSON.stringify(grades));
    },

    addGrade(grade) {
        const grades = this.getGrades() || [];
        grades.push(grade);
        this.setGrades(grades);
    },

    updateGrade(gradeId, updatedData) {
        const grades = this.getGrades();
        const index = grades.findIndex(g => g.id === gradeId);
        if (index !== -1) {
            grades[index] = { ...grades[index], ...updatedData };
            this.setGrades(grades);
            return true;
        }
        return false;
    },

    deleteGrade(gradeId) {
        let grades = this.getGrades();
        grades = grades.filter(g => g.id !== gradeId);
        this.setGrades(grades);
    },

    getGradesByStudentId(studentId) {
        const grades = this.getGrades() || [];
        return grades.filter(g => g.studentId === studentId);
    },

    // ===== SCHEDULES MANAGEMENT =====
    getSchedules() {
        return JSON.parse(localStorage.getItem('schedules')) || null;
    },

    setSchedules(schedules) {
        localStorage.setItem('schedules', JSON.stringify(schedules));
    },

    addSchedule(schedule) {
        const schedules = this.getSchedules() || [];
        schedules.push(schedule);
        this.setSchedules(schedules);
    },

    updateSchedule(scheduleId, updatedData) {
        const schedules = this.getSchedules();
        const index = schedules.findIndex(s => s.id === scheduleId);
        if (index !== -1) {
            schedules[index] = { ...schedules[index], ...updatedData };
            this.setSchedules(schedules);
            return true;
        }
        return false;
    },

    deleteSchedule(scheduleId) {
        let schedules = this.getSchedules();
        schedules = schedules.filter(s => s.id !== scheduleId);
        this.setSchedules(schedules);
    },

    // ===== SESSION MANAGEMENT =====
    setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    },

    clearCurrentUser() {
        localStorage.removeItem('currentUser');
    },

    // ===== UTILITY FUNCTIONS =====
    generateId(prefix) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `${prefix}${timestamp}${random}`;
    },

    clearAll() {
        localStorage.clear();
    }
};

// Khởi tạo dữ liệu khi load
Storage.init();
