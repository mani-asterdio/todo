import "./button.css";

type ButtonProps = {
  backgroundColor: string;
  onClick?: () => void;
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
};

export default function Button({
  backgroundColor,
  onClick,
  children,
  type,
}: ButtonProps) {
  return (
    <button
      type={type}
      className="button"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
