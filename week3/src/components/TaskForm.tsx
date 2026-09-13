import { useState } from "react";
type TaskFormProps = {
    onAddTask: (title: string, priority: "Low" | "Medium" | "High") => void;
};
function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
    const handleSubmit = () => {
        if (!title.trim()) {
            return;
        }

        onAddTask(title, priority);
        setTitle("");
        setPriority("Medium");
    };
    return (
        <div className="task-form">
            <h2>Add New Task</h2>

            <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <select
                value={priority}
                onChange={(e) =>
                    setPriority(e.target.value as "Low" | "Medium" | "High")
                }
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <button onClick={handleSubmit}>Add Task</button>
        </div>
    );
}

export default TaskForm;