import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

import "./App.css";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

type Task = {
  id: number;
  title: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};

function App() {
  const [filter, setFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "taskflow-tasks",
    [
      {
        id: 1,
        title: "Finish React Assignment",
        priority: "High",
        completed: false,
      },
      {
        id: 2,
        title: "Practice React Hooks",
        priority: "Medium",
        completed: false,
      },
      {
        id: 3,
        title: "Review Week 3 Notes",
        priority: "Low",
        completed: true,
      },
    ]
  );

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const toggleTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <h1>Dashboard</h1>

        <p>Welcome to TaskFlow 👋</p>

        <div className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>

        <TaskForm
          onAddTask={(title, priority) => {
            const newTask: Task = {
              id: Date.now(),
              title,
              priority,
              completed: false,
            };

            setTasks((currentTasks) => [
              ...currentTasks,
              newTask,
            ]);
          }}
        />

        <section className="tasks-section">
          <h2>My Tasks</h2>

          <div className="filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>

            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          {filteredTasks.length === 0 ? (
            <p className="empty-message">
              No tasks found.
            </p>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                priority={task.priority}
                completed={task.completed}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;