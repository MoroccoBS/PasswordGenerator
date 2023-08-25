interface ButtonComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
  ClassName?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

function ButtonComponent({
  children,
  onClick,
  ClassName,
  disabled,
  type,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
}: ButtonComponentProps) {
  return (
    <>
      <button
        disabled={disabled}
        className={ClassName}
        onClick={onClick}
        type={type}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
      >
        {children}
      </button>
    </>
  );
}

export default ButtonComponent;
