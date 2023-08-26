interface InputProps {
  id: string;
  label: string;
  value: string | undefined;
  disabled?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function Input({
  id,
  label,
  value,
  disabled,
  type,
  onChange,
  required,
}: InputProps) {
  return (
    <div className="flex gap-7 justify-center items-center ">
      <label className="w-1/6 sm:text-base text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type || "text"}
        value={value}
        disabled={disabled}
        onChange={onChange}
        required={required}
        className="w-full p-5 bg-Secondary input"
      />
    </div>
  );
}

export default Input;
