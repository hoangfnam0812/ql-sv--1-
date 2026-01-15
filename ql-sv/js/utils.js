// ================================================
// Utils.js - Hàm tiện ích chung
// ================================================

const Utils = {
    // Hiển thị thông báo
    showAlert(message, type = 'success') {
        const alertDiv = document.getElementById('alertMessage');
        if (alertDiv) {
            alertDiv.textContent = message;
            alertDiv.className = `alert alert-${type} show`;
            
            setTimeout(() => {
                alertDiv.classList.remove('show');
            }, 3000);
        } else {
            alert(message);
        }
    },

    // Format ngày tháng
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    },

    // Format số thành chuỗi với 2 chữ số thập phân
    formatNumber(num, decimals = 2) {
        return parseFloat(num).toFixed(decimals);
    },

    // Tính điểm trung bình
    calculateAverage(midterm, final, midtermWeight = 0.4, finalWeight = 0.6) {
        const avg = (parseFloat(midterm) * midtermWeight) + (parseFloat(final) * finalWeight);
        return this.formatNumber(avg, 1);
    },

    // Tính GPA
    calculateGPA(grades) {
        if (!grades || grades.length === 0) return '0.0';
        
        const total = grades.reduce((sum, grade) => {
            return sum + parseFloat(grade.average);
        }, 0);
        
        return this.formatNumber(total / grades.length, 2);
    },

    // Xếp loại học lực
    getGradeClassification(average) {
        const avg = parseFloat(average);
        if (avg >= 9.0) return 'Xuất sắc';
        if (avg >= 8.0) return 'Giỏi';
        if (avg >= 7.0) return 'Khá';
        if (avg >= 5.0) return 'Trung bình';
        return 'Yếu';
    },

    // Tìm kiếm trong mảng object
    searchArray(array, searchTerm, fields) {
        if (!searchTerm) return array;
        
        const term = searchTerm.toLowerCase();
        return array.filter(item => {
            return fields.some(field => {
                const value = item[field];
                return value && value.toString().toLowerCase().includes(term);
            });
        });
    },

    // Sắp xếp mảng
    sortArray(array, field, order = 'asc') {
        return array.sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            
            if (order === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    },

    // Confirm dialog
    confirm(message) {
        return window.confirm(message);
    },

    // Mở modal
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    },

    // Đóng modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    },

    // Reset form
    resetForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
        }
    },

    // Lấy ngày hôm nay (YYYY-MM-DD)
    getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // Lấy thứ trong tuần
    getDayOfWeek(dateString) {
        const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const date = new Date(dateString);
        return days[date.getDay()];
    },

    // Export dữ liệu ra CSV
    exportToCSV(data, filename) {
        if (!data || data.length === 0) {
            this.showAlert('Không có dữ liệu để xuất', 'warning');
            return;
        }

        // Lấy headers
        const headers = Object.keys(data[0]);
        let csv = headers.join(',') + '\n';

        // Thêm dữ liệu
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header] || '';
                return `"${value}"`;
            });
            csv += values.join(',') + '\n';
        });

        // Download file
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename || 'export.csv';
        link.click();
    },

    // Debounce function (chờ người dùng nhập xong mới thực hiện)
    debounce(func, delay = 300) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // Truncate text
    truncate(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    // Capitalize first letter
    capitalize(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    },

    // Random color
    randomColor() {
        const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    // Show loading
    showLoading() {
        document.body.style.cursor = 'wait';
    },

    // Hide loading
    hideLoading() {
        document.body.style.cursor = 'default';
    }
};
