type InputProps = {
  placeholder: string;
  label: string;
};

export default function Input({ placeholder, label }: InputProps) {
  return (
    <div>
      <label>{label}</label>

      <input
        type="text"
        placeholder={placeholder}
        style={{
          padding: "10px",
          margin: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}