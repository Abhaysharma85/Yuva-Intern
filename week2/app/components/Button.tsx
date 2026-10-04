type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="ui-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;