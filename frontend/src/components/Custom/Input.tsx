interface InputProps {
  children?: React.ReactNode;
  type: string;
  name: string;
  id: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  children,
  type,
  onChange,
  name,
  id,
  className,
}) => {
  return (
    <input
      type={type}
      onChange={onChange}
      name={name}
      id={id}
      className={`w-full h-full p-2 ${className}`}
    >
      {children}
    </input>
  );
};

export default Input;
