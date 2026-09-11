type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return <button 
     type="button" 
     style={{
        padding: "10px 20px",
        margin: "5px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
      }}>
    {text}</button>;
}