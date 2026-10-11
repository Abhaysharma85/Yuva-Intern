
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input({ label, id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="ui-input-group">
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} className="ui-input" {...props} />
    </div>
  );
}

export default Input;
