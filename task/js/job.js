let tasks = [];

// Lấy công việc từ localStorage
function getTasks() {
    const tasksFromStorage = localStorage.getItem('tasks');
    return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
}

// Lưu công việc vào localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Hàm thêm công việc
function addTask() {
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;

    if (taskName && taskDescription) {
        const newTask = {
            id: Date.now(),  // Dùng timestamp làm ID
            name: taskName,
            description: taskDescription
        };

        tasks.push(newTask);
        saveTasks();  // Lưu công việc vào localStorage
        updateTaskList();  // Cập nhật danh sách công việc

        // Đóng modal và reset form
        document.getElementById("addTaskForm").reset();
        $('#addTaskModal').modal('hide');
    } else {
        alert("Vui lòng nhập đầy đủ thông tin công việc!");
    }
}

// Cập nhật danh sách công việc
function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// Hàm xóa công việc
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    updateTaskList();
}

// Lắng nghe sự kiện nút "Lưu"
document.getElementById("saveTaskButton").addEventListener("click", addTask);

// Khi trang được tải lại, lấy dữ liệu công việc từ localStorage
document.addEventListener("DOMContentLoaded", () => {
    tasks = getTasks();
    updateTaskList();
});
