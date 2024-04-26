interface CButtonProps {
  children?: React.ReactNode;
  className: string;
  onClick: any;
}

const Button: React.FC<CButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      className={`p-2 text-xl rounded-md w-full h-full bg-orange-600 hover:bg-orange-400 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
