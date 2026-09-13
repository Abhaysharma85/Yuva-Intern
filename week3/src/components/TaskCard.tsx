type TaskCardProps = {
  title: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

function TaskCard({
  title,
  priority,
  completed,
  onToggle,
  onDelete,
}: TaskCardProps) {
  return (
    <div
      className={`task-card ${completed ? "completed" : ""}`}
      onClick={onToggle}
    >
      <div>
        <h3>{title}</h3>
        <span>{priority} Priority</span>
      </div>

      <div>
        <span>{completed ? "✓ Completed" : "Pending"}</span>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;