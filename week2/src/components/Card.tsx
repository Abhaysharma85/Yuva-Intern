
import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  title?: string;
};

function Card({ children, title, className = "", ...props }: CardProps) {
  return (
    <div className={`ui-card ${className}`.trim()} {...props}>
      {title && <h3 className="ui-card-title">{title}</h3>}
      {children}
    </div>
  );
}

export default Card;
