import { useCallback, useEffect, useState } from "react"; // State and lifecycle hooks
import axios from "axios"; // HTTP client
import { useAuth } from "../context/AuthContext"; // Auth context
import { toast } from "react-toastify"; // Toast notifications
import "./Dashboard.css"; // Styling for dashboard

export default function Dashboard() {
    // Get token and logout from auth context
    const { token, logout } = useAuth();

    // States for task list, form input, edit mode, filters, pagination
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch tasks from server
    const fetchTasks = useCallback(
        async (page = 1) => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/tasks?page=${page}&limit=5`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTasks(res.data.tasks); // Update tasks state
                setCurrentPage(res.data.currentPage);
                setTotalPages(res.data.totalPages);
            } catch {
                toast.error("Failed to fetch tasks");
            }
        },
        [token]
    );

    // Fetch tasks on mount and when token or page changes
    useEffect(() => {
        if (token) fetchTasks(currentPage);
    }, [token, fetchTasks, currentPage]);

    // Add or update a task
    const handleSubmit = async () => {
        if (!title.trim()) return toast.error("Task title is required");

        try {
            if (editMode) {
                await axios.put(
                    `http://localhost:5000/api/tasks/${editId}`,
                    { title },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Task updated");
            } else {
                await axios.post(
                    "http://localhost:5000/api/tasks",
                    { title },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Task added");
            }
            setTitle(""); setEditMode(false); setEditId(null);
            fetchTasks(currentPage); // Refresh list
        } catch {
            toast.error("Something went wrong");
        }
    };

    // Prepare to edit a task
    const startEdit = (task) => {
        setEditMode(true);
        setEditId(task._id);
        setTitle(task.title);
    };

    // Delete a task
    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Task deleted");
            fetchTasks(currentPage);
        } catch {
            toast.error("Failed to delete task");
        }
    };

    // Update task status
    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Status updated");
            fetchTasks(currentPage);
        } catch {
            toast.error("Failed to update status");
        }
    };

    // Apply filter on tasks
    const filteredTasks = tasks.filter((task) =>
        filter === "all" ? true : task.status === filter
    );

    // Component UI
    return (
        <div className="page-wrapper">
            <div className="container">
                <div className="buttons-group">
                    <div className="filter-buttons">
                        {["all", "pending", "completed"].map((f) => (
                            <button
                                key={f}
                                className={filter === f ? "active" : ""}
                                onClick={() => setFilter(f)}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                    <button
                        className="logout-button"
                        onClick={() => {
                            logout();
                            toast.success("Logged out");
                            setTimeout(() => (window.location.href = "/"), 1000);
                        }}
                    >
                        Logout
                    </button>
                </div>

                <h2>{editMode ? "Edit Task" : "Your Tasks"}</h2>

                <div className="input-group">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                    />
                    <button onClick={handleSubmit}>
                        {editMode ? "Update Task" : "Add Task"}
                    </button>
                </div>

                <ul className="task-list">
                    {filteredTasks.length === 0 && <li>No tasks found.</li>}
                    {filteredTasks.map((task) => (
                        <li key={task._id} className="task-item">
                            <div className="task-info">
                                <strong>{task.title}</strong>{" "}
                                <span
                                    className={`status-badge status-${task.status}`}
                                >
                                    {task.status}
                                </span>
                            </div>
                            <div className="task-actions">
                                <select
                                    value={task.status}
                                    onChange={(e) => updateStatus(task._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button onClick={() => startEdit(task)}>✏️ Edit</button>
                                <button onClick={() => deleteTask(task._id)}>🗑️ Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
