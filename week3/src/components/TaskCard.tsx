type TaskCardProps = {
  title: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};

function TaskCard({ title, priority, completed }: TaskCardProps) {
  return (
    <div className="task-card">
      <div>
        <h3>{title}</h3>
        <span>{priority} Priority</span>
      </div>

      <div>
        {completed ? "✓ Completed" : "Pending"}
      </div>
    </div>
  );
}

export default TaskCard;