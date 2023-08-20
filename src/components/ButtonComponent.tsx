interface ButtonComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
  ClassName?: string;
  onMouseDown?: () => void;
  disabled?: boolean;
}

function ButtonComponent({
  children,
  onClick,
  ClassName,
  disabled,
}: ButtonComponentProps) {
  return (
    <>
      <button disabled={disabled} className={ClassName} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

export default ButtonComponent;
