type CardProps = {
  title: string;
  description: string;
};

export default function Card({ title, description }: CardProps) {
  return (
    <div style={{
        padding: "20px",
        margin: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}