type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
};

function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div className="input-group">
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        className="ui-input"
      />
    </div>
  );
}

export default Input;