interface ButtonComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
  ClassName?: string;
  onMouseDown?: () => void;
}

function ButtonComponent({
  children,
  onClick,
  ClassName,
}: ButtonComponentProps) {
  return (
    <>
      <button className={ClassName} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

export default ButtonComponent;
